
/* auto */ import { IntermedMapOfIntermedVals, VpcVal } from './../vpcutils/vpcVal';
/* auto */ import { ChvITk } from './vpcTokens';
/* auto */ import { RequestedContainerRef, RequestedVelRef } from './../vpcutils/vpcRequestedReference';
/* auto */ import { OrdinalOrPosition } from './../vpcutils/vpcEnums';
/* auto */ import { RequestedChunk } from './../vpcutils/vpcChunkResolution';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

/**
 * the VpcCompleteVisitor interface will ensure that
 * all visitor methods are defined as expected, or we'll get a
 * type check warning.
 *
 * the VisitingContext interface just basically
 * helps with auto-complete when writing code.
 */

/* generated code, any changes past this point will be lost: --------------- */

/* ensures we have all the expected Rule methods */
export interface VpcCompleteVisitor {
    RuleHAllPropertiesThatCouldBeUnary(ctx: VisitingContext): ChvITk;
    RuleHAnyFnNameOrAllPropertiesThatCouldBeNullary(ctx: VisitingContext): ChvITk;
    RuleHAnyFnName(ctx: VisitingContext): ChvITk;
    RuleHCouldBeAPropertyToSet(ctx: VisitingContext): ChvITk;
    RuleHAnyAllowedVariableName(ctx: VisitingContext): ChvITk;
    RuleObject(ctx: VisitingContext): RequestedVelRef;
    RuleObjectBtn(ctx: VisitingContext): RequestedVelRef;
    RuleObjectFld(ctx: VisitingContext): RequestedVelRef;
    RuleObjectCard(ctx: VisitingContext): RequestedVelRef;
    RuleObjectBg(ctx: VisitingContext): RequestedVelRef;
    RuleObjectStack(ctx: VisitingContext): RequestedVelRef;
    RuleObjectPart(ctx: VisitingContext): RequestedVelRef;
    RuleObjectSpecial(ctx: VisitingContext): RequestedVelRef;
    RuleObjectInterpretedFromString(ctx: VisitingContext): RequestedVelRef;
    RuleOf(ctx: VisitingContext): ChvITk;
    RuleOrdinal(ctx: VisitingContext): OrdinalOrPosition;
    RulePosition(ctx: VisitingContext): OrdinalOrPosition;
    RuleMenuItem(ctx: VisitingContext): string;
    RuleMenu(ctx: VisitingContext): string;
    RuleWindow_1(ctx: VisitingContext): string;
    RuleWindow(ctx: VisitingContext): string;
    RuleMessageBox(ctx: VisitingContext): string;
    RuleHSimpleContainer(ctx: VisitingContext): RequestedContainerRef;
    RuleHContainer(ctx: VisitingContext): RequestedContainerRef;
    RuleHChunk(ctx: VisitingContext): RequestedChunk;
    RuleHChunkOne(ctx: VisitingContext): RequestedChunk;
    RuleHChunkBound(ctx: VisitingContext): VpcVal;
    RuleHSource(ctx: VisitingContext): VpcVal;
    RuleHSource_1(ctx: VisitingContext): VpcVal;
    RuleHFnCallWParens(ctx: VisitingContext): VpcVal;
    RuleHUnaryPropertyGet(ctx: VisitingContext): VpcVal;
    RuleHOldStyleFnNonNullary(ctx: VisitingContext): VpcVal;
    RuleHOldStyleFnNullaryOrNullaryPropGet(ctx: VisitingContext): VpcVal;
    RuleHGenericFunctionCall(ctx: VisitingContext): VpcVal;
    RuleFnCallNumberOf(ctx: VisitingContext): VpcVal;
    RuleFnCallNumberOf_1(ctx: VisitingContext): VpcVal;
    RuleFnCallNumberOf_5(ctx: VisitingContext): VpcVal;
    RuleFnCallNumberOf_6(ctx: VisitingContext): VpcVal;
    RuleFnCallNumberOf_7(ctx: VisitingContext): VpcVal;
    RuleFnCallNumberOf_8(ctx: VisitingContext): VpcVal;
    RuleFnCallNumberOf_9(ctx: VisitingContext): VpcVal;
    RuleFnCallThereIs(ctx: VisitingContext): VpcVal;
    RuleAnyPropertyVal(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleExpr(ctx: VisitingContext): VpcVal;
    RuleLvl1Expression(ctx: VisitingContext): VpcVal;
    RuleLvl2Expression(ctx: VisitingContext): VpcVal;
    RuleLvl3Expression(ctx: VisitingContext): VpcVal;
    RuleLvl4Expression(ctx: VisitingContext): VpcVal;
    RuleLvl5Expression(ctx: VisitingContext): VpcVal;
    RuleLvl6Expression(ctx: VisitingContext): VpcVal;
    RuleAndOrOr(ctx: VisitingContext): string;
    RuleContainsOrGreaterLessEqual(ctx: VisitingContext): string;
    RuleIsExpression(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdAdd(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdAnswer(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdAsk(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdBeep(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdVpccalluntrappablechoose(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdClick(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdDelete(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdDial(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdDisable(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdDivide(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdVpccalluntrappabledomenu(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdDrag(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleHBuiltinCmdDrag_1(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdEnable(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdVpccalluntrappableerrordialog(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdHide(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdLock(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdMark(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdMultiply(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdPlay(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdPut(ctx: VisitingContext): any;
    RuleBuiltinCmdReset(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdReplace(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdSelect(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdSet(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdShow(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdSort(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdStart(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdStop(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdSubtract(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdUnlock(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdVisual(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleBuiltinCmdWait(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleCmdSend(ctx: VisitingContext): IntermedMapOfIntermedVals;
    RuleInternalCmdRequestEval(ctx: VisitingContext): any;
    RuleInternalCmdUserHandler(ctx: VisitingContext): any;
}

/* for nicer auto-complete in a visitor implementation */
export interface VisitingContext {
    /* you can add something like [index: string]: any if you want to */
    /* silence type errors during development */
    RuleHAllPropertiesThatCouldBeUnary: any[];
    RuleHAnyFnNameOrAllPropertiesThatCouldBeNullary: any[];
    RuleHAnyFnName: any[];
    RuleHCouldBeAPropertyToSet: any[];
    RuleHAnyAllowedVariableName: any[];
    RuleObject: any[];
    RuleObjectBtn: any[];
    RuleObjectFld: any[];
    RuleObjectCard: any[];
    RuleObjectBg: any[];
    RuleObjectStack: any[];
    RuleObjectPart: any[];
    RuleObjectSpecial: any[];
    RuleObjectInterpretedFromString: any[];
    RuleOf: any[];
    RuleOrdinal: any[];
    RulePosition: any[];
    RuleMenuItem: any[];
    RuleMenu: any[];
    RuleWindow_1: any[];
    RuleWindow: any[];
    RuleMessageBox: any[];
    RuleHSimpleContainer: any[];
    RuleHContainer: any[];
    RuleHChunk: any[];
    RuleHChunkOne: any[];
    RuleHChunkBound: any[];
    RuleHSource: any[];
    RuleHSource_1: any[];
    RuleHFnCallWParens: any[];
    RuleHUnaryPropertyGet: any[];
    RuleHOldStyleFnNonNullary: any[];
    RuleHOldStyleFnNullaryOrNullaryPropGet: any[];
    RuleHGenericFunctionCall: any[];
    RuleFnCallNumberOf: any[];
    RuleFnCallNumberOf_1: any[];
    RuleFnCallNumberOf_5: any[];
    RuleFnCallNumberOf_6: any[];
    RuleFnCallNumberOf_7: any[];
    RuleFnCallNumberOf_8: any[];
    RuleFnCallNumberOf_9: any[];
    RuleFnCallThereIs: any[];
    RuleAnyPropertyVal: any[];
    RuleExpr: any[];
    RuleLvl1Expression: any[];
    RuleLvl2Expression: any[];
    RuleLvl3Expression: any[];
    RuleLvl4Expression: any[];
    RuleLvl5Expression: any[];
    RuleLvl6Expression: any[];
    RuleAndOrOr: any[];
    RuleContainsOrGreaterLessEqual: any[];
    RuleIsExpression: any[];
    RuleBuiltinCmdAdd: any[];
    RuleBuiltinCmdAnswer: any[];
    RuleBuiltinCmdAsk: any[];
    RuleBuiltinCmdBeep: any[];
    RuleBuiltinCmdVpccalluntrappablechoose: any[];
    RuleBuiltinCmdClick: any[];
    RuleBuiltinCmdDelete: any[];
    RuleBuiltinCmdDial: any[];
    RuleBuiltinCmdDisable: any[];
    RuleBuiltinCmdDivide: any[];
    RuleBuiltinCmdVpccalluntrappabledomenu: any[];
    RuleBuiltinCmdDrag: any[];
    RuleHBuiltinCmdDrag_1: any[];
    RuleBuiltinCmdEnable: any[];
    RuleBuiltinCmdVpccalluntrappableerrordialog: any[];
    RuleBuiltinCmdHide: any[];
    RuleBuiltinCmdLock: any[];
    RuleBuiltinCmdMark: any[];
    RuleBuiltinCmdMultiply: any[];
    RuleBuiltinCmdPlay: any[];
    RuleBuiltinCmdPut: any[];
    RuleBuiltinCmdReset: any[];
    RuleBuiltinCmdReplace: any[];
    RuleBuiltinCmdSelect: any[];
    RuleBuiltinCmdSet: any[];
    RuleBuiltinCmdShow: any[];
    RuleBuiltinCmdSort: any[];
    RuleBuiltinCmdStart: any[];
    RuleBuiltinCmdStop: any[];
    RuleBuiltinCmdSubtract: any[];
    RuleBuiltinCmdUnlock: any[];
    RuleBuiltinCmdVisual: any[];
    RuleBuiltinCmdWait: any[];
    RuleCmdSend: any[];
    RuleInternalCmdRequestEval: any[];
    RuleInternalCmdUserHandler: any[];
    tkStringLiteral: ChvITk[];
    tkBlockComment: ChvITk[];
    tkLineComment: ChvITk[];
    tkContinuedLineOrWhiteSpace: ChvITk[];
    tkCardAtEndOfLine: ChvITk[];
    tkBgAtEndOfLine: ChvITk[];
    tkStackAtEndOfLine: ChvITk[];
    tkNewLine: ChvITk[];
    tkSyntaxMark: ChvITk[];
    tkNumLiteral: ChvITk[];
    tkStack: ChvITk[];
    tkBg: ChvITk[];
    tkBgPlural: ChvITk[];
    tkCard: ChvITk[];
    tkCardPlural: ChvITk[];
    tkBtn: ChvITk[];
    tkBtnPlural: ChvITk[];
    tkFld: ChvITk[];
    tkFldPlural: ChvITk[];
    tkPart: ChvITk[];
    tkPartPlural: ChvITk[];
    tkProductName: ChvITk[];
    tkAdjective: ChvITk[];
    tkOrdinal: ChvITk[];
    tkPosition: ChvITk[];
    tkChunkGranularity: ChvITk[];
    tkInOnly: ChvITk[];
    tkOfOnly: ChvITk[];
    tkA: ChvITk[];
    _not: ChvITk[];
    _there: ChvITk[];
    _is: ChvITk[];
    _no: ChvITk[];
    _and: ChvITk[];
    _or: ChvITk[];
    _contains: ChvITk[];
    _within: ChvITk[];
    _the: ChvITk[];
    _message: ChvITk[];
    _window: ChvITk[];
    _windows: ChvITk[];
    _box: ChvITk[];
    _me: ChvITk[];
    _recent: ChvITk[];
    _back: ChvITk[];
    _forth: ChvITk[];
    _marked: ChvITk[];
    _to: ChvITk[];
    _menuItem: ChvITk[];
    _menu: ChvITk[];
    _id: ChvITk[];
    _number: ChvITk[];
    _selection: ChvITk[];
    _target: ChvITk[];
    tkComma: ChvITk[];
    tkLParen: ChvITk[];
    tkRParen: ChvITk[];
    tkPlusOrMinus: ChvITk[];
    tkMultDivideExpDivMod: ChvITk[];
    tkStringConcat: ChvITk[];
    tkGreaterOrLessEqualOrEqual: ChvITk[];
    tkUnaryVipercardProperties: ChvITk[];
    tkAllUnaryPropertiesIfNotAlready: ChvITk[];
    tkAllNullaryOrUnaryPropertiesIfNotAlready: ChvITk[];
    tkIdentifier: ChvITk[];
}

/* generated code, any changes above this point will be lost: --------------- */
