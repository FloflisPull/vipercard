
/* auto */ import { VpcPaintRender } from './../modelrender/vpcPaintRender';
/* auto */ import { VpcModelRender } from './../modelrender/vpcModelRender';
/* auto */ import { VpcStateInterface } from './../state/vpcInterface';
/* auto */ import { VpcTool } from './../../vpc/vpcutils/vpcEnums';
/* auto */ import { UI512Cursors } from './../../ui512/utils/utilsCursors';
/* auto */ import { O } from './../../ui512/utils/util512Base';
/* auto */ import { fitIntoInclusive } from './../../ui512/utils/util512';
/* auto */ import { EventDetails, MouseDownEventDetails, MouseMoveEventDetails, MouseUpEventDetails } from './../../ui512/menu/ui512Events';
/* auto */ import { UI512Element } from './../../ui512/elements/ui512Element';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

/**
 * base class for VPC tools
 */
export abstract class VpcAppUIToolBase {
    vci: VpcStateInterface;
    cbModelRender: () => VpcModelRender;
    cbPaintRender: () => VpcPaintRender;
    cbScheduleScriptEventSend: (d: EventDetails) => void;

    constructor(protected bounds: number[], protected userBounds: number[]) {}
    abstract respondMouseDown(tl: VpcTool, d: MouseDownEventDetails, isVelOrBaseLayer: boolean): void;
    abstract cancelCurrentToolAction(): void;
    abstract whichCursor(tl: VpcTool, el: O<UI512Element>): UI512Cursors;
    respondMouseMove(tl: VpcTool, d: MouseMoveEventDetails, isVelOrBaseLayer: boolean): void {}
    respondMouseUp(tl: VpcTool, d: MouseUpEventDetails, isVelOrBaseLayer: boolean): void {}
    onOpenTool() {}
    onLeaveTool() {}
    onDeleteSelection() {}

    protected getTranslatedCoords(mouseX: number, mouseY: number) {
        /* get coordinates relative to user area */
        let tmouseX =
            fitIntoInclusive(mouseX, this.vci.userBounds()[0], this.vci.userBounds()[0] + this.vci.userBounds()[2] - 1) -
            this.vci.userBounds()[0];

        let tmouseY =
            fitIntoInclusive(mouseY, this.vci.userBounds()[1], this.vci.userBounds()[1] + this.vci.userBounds()[3] - 1) -
            this.vci.userBounds()[1];

        return [tmouseX, tmouseY];
    }
}
