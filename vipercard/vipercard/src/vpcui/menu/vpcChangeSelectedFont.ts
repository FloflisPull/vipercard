
/* auto */ import { VpcValS } from './../../vpc/vpcutils/vpcVal';
/* auto */ import { RequestedVelRef } from './../../vpc/vpcutils/vpcRequestedReference';
/* auto */ import { VpcStateInterface } from './../state/vpcInterface';
/* auto */ import { PropAdjective, VpcElType, VpcGranularity, VpcTool, checkThrow, checkThrowNotifyMsg } from './../../vpc/vpcutils/vpcEnums';
/* auto */ import { RequestedChunk } from './../../vpc/vpcutils/vpcChunkResolution';
/* auto */ import { VpcElBase } from './../../vpc/vel/velBase';
/* auto */ import { O } from './../../ui512/utils/util512Base';
/* auto */ import { assertWarn } from './../../ui512/utils/util512Assert';
/* auto */ import { Util512, fitIntoInclusive, longstr } from './../../ui512/utils/util512';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

/**
 * apply changes when the user chooses something from the Font or Style menu
 */
export class VpcChangeSelectedFont {
    cbGetEditToolSelectedFldOrBtn: () => O<VpcElBase>;
    constructor(protected vci: VpcStateInterface) {}

    /**
     * user is setting font from the Font or Style menu
     * returns false if not handled
     */
    runFontMenuActionsIfApplicable(s: string) {
        if (s.startsWith('mnuItemTool')) {
            let toolNumber = Util512.parseInt(s.substr('mnuItemTool'.length));
            toolNumber = toolNumber ?? VpcTool.Browse;
            this.vci.setTool(toolNumber);
            return true;
        } else if (s.startsWith('mnuItemSetFontFace')) {
            let v = s.substr('mnuItemSetFontFace'.length);
            this.setFont(v, 'textfont');
            return true;
        } else if (s.startsWith('mnuItemSetFontSize')) {
            let v = s.substr('mnuItemSetFontSize'.length);
            this.setFont(v, 'textsize');
            return true;
        } else if (s.startsWith('mnuSetFontStyle')) {
            let v = s.substr('mnuSetFontStyle'.length);
            this.setFont(v, 'textstyle');
            return true;
        } else if (s.startsWith('mnuSetAlign')) {
            let v = s.substr('mnuSetAlign'.length);
            this.setAlign(v);
            return true;
        } else {
            return false;
        }
    }

    /**
     * set alignment, throw if nothing to align
     */
    protected setAlign(v: string) {
        let worked = this.setAlignImpl(v);
        if (!worked) {
            checkThrowNotifyMsg(false, 'U4|No selection found. Select a button or field.');
        }
    }

    /**
     * set alignment, return undefined if nothing to align
     */
    protected setAlignImpl(v: string) {
        v = v.toLowerCase();
        let vel = this.cbGetEditToolSelectedFldOrBtn();
        let currentCardId = this.vci.getOptionS('currentCardId');

        if (vel) {
            vel.setProp('textalign', VpcValS(v), currentCardId);
            return true;
        } else {
            let chunksel = this.getActiveChunkSel();
            if (chunksel) {
                /* we don't yet support setting alignment on a per-paragraph basis */
                chunksel[0].setProp('textalign', VpcValS(v), currentCardId);
                return true;
            }
        }

        return undefined;
    }

    /**
     * set font, throw if nothing is selected
     */
    protected setFont(v: string, type: string) {
        let worked = this.setFontImpl(v, type);
        if (!worked) {
            checkThrowNotifyMsg(
                false,
                longstr(`U3|No selection found. Either select a
            button or {{NEWLINE}}field, or use the browse tool to select a
            few{{NEWLINE}} letters.`)
            );
        }
    }

    /**
     * set font, return undefined if nothing is selected
     */
    protected setFontImpl(v: string, typeOfChange: string) {
        v = v.toLowerCase();
        let vel = this.cbGetEditToolSelectedFldOrBtn();
        if (vel) {
            return this.setFontBtnFld(vel, v, typeOfChange);
        } else {
            let chunksel = this.getActiveChunkSel();
            if (chunksel) {
                return this.setFontSelText(chunksel, v, typeOfChange);
            }
        }

        return undefined;
    }

    /**
     * toggle style
     * e.g. chose Bold, so go through and
     * make everything that was bold to now be plain and vice versa.
     */
    protected toggleStyle(allStyle: string, v: string) {
        if (v === 'plain') {
            /* user is setting font to plain, so lose the other formatting */
            return 'plain';
        }

        checkThrow(allStyle !== 'mixed', 'KP|did not expected to see "mixed".');
        let styles = allStyle.split(',');
        styles = styles.filter(s => s !== 'plain');
        let foundIndex = styles.findIndex(s => s === v);
        if (foundIndex === -1) {
            /* desired style not there, add it */
            styles.push(v);
        } else {
            /* desired style is there, remove it */
            styles.splice(foundIndex, 1);
        }

        return styles.length ? styles.join(',') : 'plain';
    }

    /**
     * get a selected chunk in a field
     */
    protected getActiveChunkSel(): O<[VpcElBase, number, number]> {
        let vel = this.vci.getCurrentFocusVelField();
        if (vel) {
            /* note: get from focused, not vel, since it's more up to date? */
            /* no, since we're acting on the vel, get everything from one for consistency */
            let currentCardId = this.vci.getOptionS('currentCardId');
            let selcaret = fitIntoInclusive(vel.getN('selcaret'), 0, vel.getCardFmTxt(currentCardId).len());
            let selend = fitIntoInclusive(vel.getN('selend'), 0, vel.getCardFmTxt(currentCardId).len());
            if (selcaret !== selend) {
                return [vel, Math.min(selcaret, selend), Math.max(selcaret, selend)];
            }
        }

        return undefined;
    }

    /**
     * set the font of a chunk of text
     */
    protected setFontSelText(chunksel: [VpcElBase, number, number], v: string, typeOfChange: string) {
        let [vel, b1, b2] = chunksel;
        let chunk = new RequestedChunk(b1);
        chunk.last = b2;

        /* adjust the range because vpc is both 1-based and inclusive */
        chunk.first += 1;
        chunk.type = VpcGranularity.Chars;
        let velRef = new RequestedVelRef(VpcElType.Fld);
        let idn = Util512.parseInt(vel.id);
        checkThrow(idn, 'KO|non numeric id?', vel.id);
        velRef.lookById = idn;

        if (typeOfChange !== 'textstyle') {
            /* setting a typeface or pt size, just set it everywhere */
            this.vci.getOutside().SetProp(velRef, typeOfChange, VpcValS(v), chunk);
            return true;
        } else {
            /* setting a style
            do this character by character, because styles can differ
            1) if one of the letters was bold, setting the selection
                to italic shouldn't lose the bold of that one
            2) besides, if we looked up current style of all the selection,
                it might return 'mixed' and we wouldn't know how to flip */
            assertWarn(chunk.first <= chunk.last, 'KN|', chunk.first, chunk.last);
            for (let i = chunk.first; i <= chunk.last; i++) {
                let subChunk = new RequestedChunk(i);
                subChunk.first = i;
                subChunk.last = i;
                subChunk.type = VpcGranularity.Chars;
                let curStyle = this.vci.getOutside().GetProp(velRef, typeOfChange, PropAdjective.Empty, subChunk).readAsString();

                curStyle = this.toggleStyle(curStyle, v);
                this.vci.getOutside().SetProp(velRef, typeOfChange, VpcValS(curStyle), subChunk);
            }

            return true;
        }
    }

    /**
     * set font of a vel
     */
    protected setFontBtnFld(vel: VpcElBase, v: string, typeOfChange: string) {
        let currentCardId = this.vci.getOptionS('currentCardId');
        if (typeOfChange !== 'textstyle') {
            vel.setProp(typeOfChange, VpcValS(v), currentCardId);
            return true;
        } else {
            let curStyle = vel.getProp('textstyle', currentCardId).readAsString().toLowerCase();
            curStyle = this.toggleStyle(curStyle, v);
            vel.setProp('textstyle', VpcValS(curStyle), currentCardId);
            return true;
        }
    }
}
