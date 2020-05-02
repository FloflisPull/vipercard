
/* auto */ import { ChvITk } from './../codeparse/vpcTokens';
/* auto */ import { VpcSuperRewrite } from './vpcRewritesGlobal';
/* auto */ import { checkThrow, checkThrowEq } from './../vpcutils/vpcEnums';
/* auto */ import { O } from './../../ui512/utils/util512Base';
/* auto */ import { arLast } from './../../ui512/utils/util512';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

/**
 * in the original product you can write a one-line if like this,
 *       'if true then put 1+1 into x'
 * it is convenient, so I suppose I will support it.
 * let's split it into different lines so it's easier to parse.
 * verified by both unit tests and vpcTestScriptExtensive.ts
 */
export class VpcSplitSingleLineIf {
    holdingFromBefore: O<ChvITk[]>
    _classify(line: ChvITk[], rw: VpcSuperRewrite): [IfTypes, number, number] {
        if (line[0].image === 'if') {
            let findThen = rw.searchTokenGivenEnglishTermInParensLevel(0, line, line[0], 'then');
            checkThrow(findThen !== -1, 'TE|if statement, no "then" found');
            if (findThen === line.length - 1) {
                return [IfTypes.ifnormal, -1, -1];
            } else {
                return [IfTypes.ifnormal, findThen, findThen];
            }
        } else if (line.length >= 2 && line[0].image === 'else' && line[1].image === 'if') {
            let findThen = rw.searchTokenGivenEnglishTermInParensLevel(0, line, line[0], 'then');
            checkThrow(findThen !== -1, 'TD|elseif statement, no "then" found');
            if (findThen === line.length - 1) {
                return [IfTypes.elseifnormal, -1, -1];
            } else {
                return [IfTypes.elseif_jammed, findThen, findThen];
            }
        } else if (line[0].image === 'else') {
            if (line.length === 1) {
                return [IfTypes.elsenormal, -1, -1];
            } else {
                checkThrow(line[1].image !== 'then', "TC|use 'else', not 'else then'");
                return [IfTypes.else_jammed, 0, 0];
            }
        } else {
            return [IfTypes.other, -1, -1];
        }
    }

    go(line: ChvITk[], rw: VpcSuperRewrite): ChvITk[][] {
        let ret: ChvITk[][] = [];
        let got = this._classify(line, rw);
        let type = got[0];
        let cutStart = got[1];
        let cutEnd = got[2];
        if (this.holdingFromBefore) {
            if (type === IfTypes.else_jammed || type === IfTypes.elseif_jammed) {
                /* defer the endif until later */
            } else if (type === IfTypes.elsenormal || type === IfTypes.elseifnormal) {
                /* it will have it's own end if */
                this.holdingFromBefore = undefined;
            } else {
                ret.push(this.holdingFromBefore);
                this.holdingFromBefore = undefined;
            }
        }

        if (cutStart !== -1) {
            let firstPart = line.slice(0, cutStart + 1);
            let secondPart = line.slice(cutEnd + 1);
            ret.push(firstPart);
            if (secondPart.length) {
                ret.push(secondPart);
            }

            let endif = rw.gen('end if', line[0])[0];
            if (type === IfTypes.else_jammed) {
                ret.push(endif);
                this.holdingFromBefore = undefined;
            } else {
                this.holdingFromBefore = endif;
            }

            return ret;
        } else {
            /* already on different lines, we are fine */
            ret.push(line);
            return ret;
        }
    }
}

/* "jammed" is a single-line case
where you have both a condition and a statement on the same line. */
enum IfTypes {
    other = 1,
    ifnormal,
    if_jammed,
    elseifnormal,
    elseif_jammed,
    elsenormal,
    else_jammed
}

/**
 * get rid of else-if clauses, mostly because they don't support custom function calls
 * (which we expand onto multiple lines)
 * also, at runtime, an else-if requires the framestack to hold more state
 * (remembering if a clause has been taken) so it's more complex.
 * verified by both unit tests and vpcTestScriptExtensive.ts
 */
export const VpcRewriteNoElseIfClauses = /* static class */ {
    /**
     * we'll build the code into a tree structure,
     * then walk the tree recursively to flatten it.
     */
    go(tree: NoElseIfClausesTreeBuilder, rw: VpcSuperRewrite) {
        let ret: ChvITk[][] = [];
        this._flattenTreeRecurse(tree.root, rw, ret);
        return ret;
    },

    _isLineEndIf(l: ChvITk[]) {
        return l.length === 2 && l[0].image === 'end' && l[1].image === 'if';
    },

    _isLineIf(l: ChvITk[]) {
        if (l.length >= 1 && l[0].image === 'if') {
            checkThrow(l.length >= 3, "TB|expect line starting with if to be 'if condition then'");
            checkThrowEq('then', arLast(l).image, "TA|expect line starting with else to be 'if condition *then*'");
            return l.slice(1, -1);
        }

        return undefined;
    },

    _isLineElsePlain(l: ChvITk[]) {
        return l.length === 1 && l[0].image === 'else';
    },

    _isLineElseCondition(l: ChvITk[]) {
        if (l.length > 1 && l[0].image === 'else') {
            checkThrow(l.length >= 4, "T9|expect line starting with else to be 'else if condition then'");
            checkThrowEq('if', l[1].image, "T8|expect line starting with else to be 'else *if* condition then'");
            checkThrowEq('then', arLast(l).image, "T7|expect line starting with else to be 'else if condition *then*'");
            return l.slice(2, -1);
        }
        return undefined;
    },

    /**
     * flatten the tree, and while doing so,
     * write out the clauses as separate if statements.
     */
    _flattenTreeRecurse(node: IfConstruct, rw: VpcSuperRewrite, output: ChvITk[][]) {
        let numberOfEndIfsNeeded = 0;
        if (!node.isRoot) {
            let firstLine = rw.gen('if %ARG0% then', node.clauses[0].condition[0], [node.clauses[0].condition]);
            output.push(firstLine[0]);
            numberOfEndIfsNeeded = 1;
        }
        for (let clause of node.clauses) {
            if (!clause.isFirst) {
                if (clause.condition.length) {
                    output.push([rw.tokenFromEnglishTerm('else', node.clauses[0].condition[0])]);
                    let line = rw.gen('if %ARG0% then', clause.condition[0], [clause.condition]);
                    output.push(line[0]);
                    numberOfEndIfsNeeded += 1;
                } else {
                    output.push([rw.tokenFromEnglishTerm('else', node.clauses[0].condition[0])]);
                }
            }
            for (let item of clause.children) {
                if (item instanceof IfConstruct) {
                    this._flattenTreeRecurse(item, rw, output);
                } else {
                    output.push(item);
                }
            }
        }

        for (let i = 0; i < numberOfEndIfsNeeded; i++) {
            output.push([
                rw.tokenFromEnglishTerm('end', node.clauses[0].condition[0]),
                rw.tokenFromEnglishTerm('if', node.clauses[0].condition[0])
            ]);
        }
    }
}

class IfConstructClause  {
    children: (ChvITk[] | IfConstruct)[] = [];
    constructor(public condition: ChvITk[], public isFirst: boolean) {}
}

class IfConstruct {
    clauses: IfConstructClause[];
    hasSeenPlainElse = false;
    isRoot = false;
    constructor(public parent: O<IfConstruct>) {}
}

/**
 * make a tree, where each if statement has clauses,
 * and each clause has either lines of code or if statements.
 * no transformations applied yet - the IfConstruct
 * will match 1-1 with the input code
 */
export class NoElseIfClausesTreeBuilder {
    root = new IfConstruct(undefined);
    current = this.root;
    constructor() {
        this.root.isRoot = true;
        this.root.clauses = [new IfConstructClause([], true)];
    }

    addLine(line: ChvITk[]) {
        let arisLineIf = VpcRewriteNoElseIfClauses._isLineIf(line);
        let arisLineElseCondition = VpcRewriteNoElseIfClauses._isLineElseCondition(line);
        if (arisLineIf) {
            let clause = new IfConstructClause(arisLineIf, true);
            let construct = new IfConstruct(this.current);
            construct.clauses = [clause];
            arLast(this.current.clauses).children.push(construct);
            this.current = construct;
        } else if (arisLineElseCondition) {
            checkThrow(!this.current.isRoot, 'T6|else outside of if?');
            checkThrow(!this.current.hasSeenPlainElse, "T5|can't have conditional else after plain else");
            let clause = new IfConstructClause(arisLineElseCondition, false);
            this.current.clauses.push(clause);
        } else if (VpcRewriteNoElseIfClauses._isLineElsePlain(line)) {
            checkThrow(!this.current.isRoot, 'T4|else outside of if?');
            checkThrow(!this.current.hasSeenPlainElse, "T3|can't have two plain elses");
            this.current.hasSeenPlainElse = true;
            let clause = new IfConstructClause([], false);
            this.current.clauses.push(clause);
        } else if (VpcRewriteNoElseIfClauses._isLineEndIf(line)) {
            checkThrow(!this.current.isRoot && this.current.parent, "T2|can't have an end if outside of if");
            this.current = this.current.parent;
        } else {
            arLast(this.current.clauses).children.push(line);
        }
    }
}

