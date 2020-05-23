
/* auto */ import { CountNumericId } from './../vpcutils/vpcUtils';
/* auto */ import { VpcCodeLine, VpcCodeLineReference, VpcLineCategory } from './vpcPreparseCommon';
/* auto */ import { checkThrow, checkThrowEq, checkThrowInternal } from './../vpcutils/vpcEnums';
/* auto */ import { MapKeyToObject, arLast, longstr } from './../../ui512/utils/util512';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

/**
 * in BranchProcessing we collect and validate the hierarchical structure of code,
 * e.g. collecting all of the if/else lines so that goto points can be set,
 * and making sure that every opening 'if' has a matching 'end if' at the same hierarchical level.
 *
 * we'll create a BranchBlockInfo for each block to track related lines in the block
 * and we'll fill out a handlers object marking where all the handlers are
 */
export class BranchProcessing {
    constructor(protected idGen: CountNumericId) {}

    /* marking where all the handlers are */
    handlers = new MapKeyToObject<VpcCodeLineReference>();

    /* current hierarchical level stored in a stack; push onto and pop off from */
    stack: BranchBlockInfo[] = [];

    /**
     * you typed 'exit repeat', walk up the stack to find which loop this is exiting from
     */
    protected findCurrentLoop() {
        for (let i = this.stack.length - 1; i >= 0; i--) {
            if (this.stack[i].cat === VpcLineCategory.RepeatForever) {
                return this.stack[i];
            }
        }

        checkThrow(false, `5r|cannot call 'exit repeat' or 'next repeat' outside of a loop`);
    }

    /**
     * you typed 'exit mouseUp', the handler must always be at the bottom of the stack
     */
    protected findCurrentHandler(): BranchBlockInfo {
        checkThrowEq(VpcLineCategory.HandlerStart, this.stack[0].cat, `7>|could not find current handler`);
        return this.stack[0];
    }

    /**
     * call this when finished with a block, like after an 'end if'
     */
    protected finalizeBlock() {
        let topOfStack = arLast(this.stack);
        let references = topOfStack.relevantLines.map(ln => new VpcCodeLineReference(ln));
        for (let i = 0, len = topOfStack.relevantLines.length; i < len; i++) {
            let line = topOfStack.relevantLines[i];
            line.blockInfo = references;
        }

        this.stack.pop();
    }

    /**
     * hierarchical level should be down to 0 at the end.
     */
    ensureComplete() {
        checkThrowEq(0, this.stack.length, `7=|missing 'end myHandler' at end of script.`);
    }

    /**
     * process one line.
     */
    go(line: VpcCodeLine) {
        if (this.stack.length === 0 && line.ctg !== VpcLineCategory.HandlerStart) {
            checkThrow(false, `5q|code outside function? only 'on mouseup' and 'function myfunction' can exist at this scope`);
        } else if (this.stack.length > 0 && line.ctg === VpcLineCategory.HandlerStart) {
            checkThrow(false, `5p|cannot begin a handler inside an existing handler`);
        }

        switch (line.ctg) {
            case VpcLineCategory.RepeatForever /* fall-through */:
                this.stack.push(new BranchBlockInfo(VpcLineCategory.RepeatForever, line));
                break;
            case VpcLineCategory.RepeatNext: /* fall-through */
            case VpcLineCategory.RepeatExit: {
                let tracking = this.findCurrentLoop();
                tracking.add(line);
                break;
            }
            case VpcLineCategory.RepeatEnd: {
                checkThrow(
                    this.stack.length && VpcLineCategory.RepeatForever === arLast(this.stack).cat,
                    `7<|cannot "end repeat" interleaved within some other block.`
                );
                arLast(this.stack).add(line);
                this.finalizeBlock();
                break;
            }
            case VpcLineCategory.IfStart:
                this.stack.push(new BranchBlockInfo(VpcLineCategory.IfStart, line));
                break;
            case VpcLineCategory.IfElsePlain:
                checkThrow(
                    this.stack.length && VpcLineCategory.IfStart === arLast(this.stack).cat,
                    `S*|cannot have an "else" interleaved within some other block.`
                );
                arLast(this.stack).add(line);
                break;
            case VpcLineCategory.IfEnd:
                checkThrow(
                    this.stack.length && VpcLineCategory.IfStart === arLast(this.stack).cat,
                    `7;|cannot have an "endif" interleaved within some other block.`
                );
                arLast(this.stack).add(line);
                this.finalizeBlock();
                break;
            case VpcLineCategory.HandlerStart:
                this.stack.push(new BranchBlockInfo(VpcLineCategory.HandlerStart, line));
                break;
            case VpcLineCategory.HandlerEnd: {
                let topOfStack = arLast(this.stack);
                checkThrowEq(
                    VpcLineCategory.HandlerStart,
                    topOfStack.cat,
                    `7/|cannot have an "end myHandler" interleaved within some other block.`
                );
                topOfStack.add(line);
                this.checkStartAndEndMatch(topOfStack.relevantLines);
                let firstName = topOfStack.relevantLines[0].excerptToParse[1].image;

                /* call add() so that we'll throw if there is a duplicate */
                this.handlers.add(firstName, new VpcCodeLineReference(topOfStack.relevantLines[0]));
                this.finalizeBlock();
                break;
            }
            case VpcLineCategory.HandlerExit: /* fall-through */
            case VpcLineCategory.HandlerPass: {
                /* if we're in "on mouseup", it's illegal to say "exit otherHandler" */
                let currentHandlerStart = this.findCurrentHandler().relevantLines[0];
                checkThrow(currentHandlerStart.excerptToParse.length > 1, '7.|expected on myHandler, not found');
                let currentHandlerName = currentHandlerStart.excerptToParse[1].image;
                let gotName = line.excerptToParse[1].image;
                checkThrowEq(
                    gotName,
                    currentHandlerName,
                    '7-|we are in handler but got exit otherHandler',
                    currentHandlerName,
                    gotName
                );
                break;
            }
            case VpcLineCategory.Invalid:
                checkThrowInternal(false, '5o|should not have this line category');
                break;
            default:
                break;
        }
    }

    /**
     * on mouseUp must end with end mouseUp, and so on.
     */
    checkStartAndEndMatch(lines: VpcCodeLine[]) {
        checkThrow(lines[0].excerptToParse.length > 1, '7,|on myHandler, missing name of handler');
        let firstname = lines[0].excerptToParse[1].image;
        let lastline = arLast(lines);
        checkThrow(lastline.excerptToParse.length > 1, '7+|end myHandler, missing name of handler');
        let lastname = lastline.excerptToParse[1].image;
        checkThrowEq(
            lastname,
            firstname,
            longstr(
                `7*|handler names mismatch. start with with
                "on ${firstname}" ended with "end ${lastname}"`
            )
        );
    }
}

/**
 * remember the entrance/exit points of a block
 * we'll use this to set the blockInformation for these lines,
 * so that e.g. a loop knows which offset to go back up to.
 */
class BranchBlockInfo {
    constructor(public readonly cat: VpcLineCategory, firstline?: VpcCodeLine) {
        if (firstline) {
            this.add(firstline);
        }
    }

    add(line: VpcCodeLine) {
        this.relevantLines.push(line);
    }

    relevantLines: VpcCodeLine[] = [];
}
