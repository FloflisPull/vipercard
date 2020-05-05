
/* auto */ import { getVpcSessionTools } from './../../vpc/request/vpcRequest';
/* auto */ import { VpcDocumentLocation, VpcIntroProvider } from './vpcIntroProvider';
/* auto */ import { IntroPageBase } from './vpcIntroPageBase';
/* auto */ import { VpcIntroInterface } from './vpcIntroInterface';
/* auto */ import { RectUtils } from './../../ui512/utils/utilsCanvasDraw';
/* auto */ import { RespondToErr, Util512Higher } from './../../ui512/utils/util512Higher';
/* auto */ import { O } from './../../ui512/utils/util512Base';
/* auto */ import { assertTrue } from './../../ui512/utils/util512Assert';
/* auto */ import { slength } from './../../ui512/utils/util512';
/* auto */ import { TextSelModify } from './../../ui512/textedit/ui512TextSelModify';
/* auto */ import { UI512CompStdDialogResult } from './../../ui512/composites/ui512ModalDialog';
/* auto */ import { UI512ElTextFieldAsGeneric } from './../../ui512/textedit/ui512GenericField';
/* auto */ import { UI512ElTextField } from './../../ui512/elements/ui512ElementTextField';
/* auto */ import { UI512ElLabel } from './../../ui512/elements/ui512ElementLabel';
/* auto */ import { UI512ElGroup } from './../../ui512/elements/ui512ElementGroup';
/* auto */ import { UI512BtnStyle } from './../../ui512/elements/ui512ElementButton';
/* auto */ import { UI512Application } from './../../ui512/elements/ui512ElementApp';
/* auto */ import { UI512Element } from './../../ui512/elements/ui512Element';
/* auto */ import { lng } from './../../ui512/lang/langBase';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

/**
 * open a saved project
 * if the openType is FromStaticDemo, shows a list of demos,
 * otherwise, shows the user's saved online stacks
 */
export class IntroPageOpen extends IntroPageBase {
    compositeType = 'IntroPageOpen';
    listBox: O<UI512ElTextField>;
    loadedFromOnline: [string, string][] = [];
    hardCodedFeatured: [string, string][] = [
        ['demo_graphics.json', 'Interactive art'],
        ['demo_game.json', 'Make a game'],
        ['demo_anim.json', 'Simple animation'],
        ['demo_glider.json', 'GLIDER 4.0'],
        ['demo_spacegame.json', 'Spaceman Gamma']
    ];

    constructor(compId: string, bounds: number[], x: number, y: number, protected openType: VpcDocumentLocation) {
        super(compId, bounds, x, y);
    }

    /**
     * initialize layout
     */
    createSpecific(app: UI512Application) {
        let grp = app.getGroup(this.grpId);
        let headerHeight = this.drawCommonFirst(app, grp);

        /* draw the OK and cancel buttons */
        grp.getEl(this.getElId('windowBg'));
        let cancel = this.drawBtn(app, grp, 1, this.x + 180, this.y + 287, 68, 21);
        let ok = this.drawBtn(app, grp, 0, this.x + 180 - (252 - 174), this.y + 287 - 4, 69, 29);
        this.acceptBtnId = ok.id;
        this.cancelBtnId = cancel.id;

        /* get logo dimensions (centered within the area) */
        const footerHeight = 70;
        const logoMargin = 20;
        let half = Math.floor(this.logicalWidth / 2);
        let spaceY = this.logicalHeight - (footerHeight + headerHeight);
        let aroundLogo = [this.x + half, this.y + headerHeight, half, spaceY];
        let logoBounds = RectUtils.getSubRectRaw(
            aroundLogo[0],
            aroundLogo[1],
            aroundLogo[2],
            aroundLogo[3],
            logoMargin,
            logoMargin
        );

        /* draw the logo */
        logoBounds = logoBounds ? logoBounds : [0, 0, 0, 0];
        let logo = this.genBtn(app, grp, 'logo');
        logo.set('style', UI512BtnStyle.Opaque);
        logo.set('autohighlight', false);
        logo.set('icongroupid', 'logo');
        logo.set('iconnumber', 0);
        logo.setDimensions(logoBounds[0], logoBounds[1], logoBounds[2], logoBounds[3]);

        /* draw the prompt */
        let prompt = this.genChild(app, grp, 'prompt', UI512ElLabel);
        let caption = lng('lngFeatured stacks...');
        prompt.set('labeltext', caption);
        prompt.setDimensions(this.x + 20, this.y + 50, 200, 50);

        /* draw the list of choices */
        this.listBox = this.genChild(app, grp, 'chooser', UI512ElTextField);
        this.listBox.set('scrollbar', true);
        this.listBox.set('selectbylines', true);
        this.listBox.set('multiline', true);
        this.listBox.set('canselecttext', true);
        this.listBox.set('canedit', false);
        this.listBox.set('labelwrap', false);
        this.listBox.setDimensions(this.x + 26, this.y + 84, 190, 140);
        grp.getEl(this.getElId('footerText')).set('visible', false);

        if (this.openType === VpcDocumentLocation.FromStaticDemo) {
            let sDocs: string[] = [];
            sDocs = this.hardCodedFeatured.map(item => item[1]);
            UI512ElTextField.setListChoices(this.listBox, sDocs);

            if (sDocs.length) {
                TextSelModify.selectLineInField(new UI512ElTextFieldAsGeneric(this.listBox), 0);
            }
        } else {
            prompt.set('labeltext', 'Loading...');
            Util512Higher.syncToAsyncTransition(this.getListChoicesAsync(prompt), 'respondIdle', RespondToErr.Alert);
        }

        this.drawCommonLast(app, grp);
    }

    /**
     * draw a delete button, the functionality isn't yet implemented
     */
    protected drawDeleteBtn(app: UI512Application, grp: UI512ElGroup) {
        let btnDelete = this.drawBtn(app, grp, 3, this.x + 311, this.y + 240, 149, 31);
        btnDelete.set('labeltext', lng('lngDelete...'));
    }

    /**
     * get a list of stacks from the server
     */
    async getListChoicesAsync(prompt: UI512Element) {
        let ses = getVpcSessionTools().fromRoot();
        if (!this.listBox) {
            return;
        }

        if (ses) {
            try {
                let stacks = await ses.vpcListMyStacks();
                this.loadedFromOnline = stacks.map(item => [item.fullstackid, item.stackname] as [string, string]);
                UI512ElTextField.setListChoices(
                    this.listBox,
                    this.loadedFromOnline.map(item => item[1])
                );
                if (this.loadedFromOnline.length) {
                    TextSelModify.selectLineInField(new UI512ElTextFieldAsGeneric(this.listBox), 0);
                }

                prompt.set('labeltext', 'Open from online stacks:');
            } catch (e) {
                prompt.set('labeltext', e.toString());
            }
        }
    }

    /**
     * which line was chosen in the listbox?
     */
    static getChosen(self: IntroPageOpen): O<string> {
        if (self.listBox) {
            let whichLine = TextSelModify.selectByLinesWhichLine(new UI512ElTextFieldAsGeneric(self.listBox));
            if (whichLine !== undefined) {
                if (self.openType === VpcDocumentLocation.FromStaticDemo) {
                    let entry = self.hardCodedFeatured[whichLine];
                    if (entry !== undefined) {
                        return entry[0];
                    }
                } else {
                    let entry = self.loadedFromOnline[whichLine];
                    if (entry !== undefined) {
                        return entry[0];
                    }
                }
            }
        }

        return undefined;
    }

    /**
     * user clicked OK or cancel
     */
    respondToBtnClick(pr: VpcIntroInterface, self: IntroPageOpen, el: UI512Element) {
        if (el.id.endsWith('choicebtn0')) {
            let chosenId = IntroPageOpen.getChosen(self);
            if (chosenId && slength(chosenId)) {
                /* open the document */
                let loader = new VpcIntroProvider(chosenId, lng('lngstack'), self.openType);
                pr.beginLoadDocument(loader);
            }
        } else if (el.id.endsWith('choicebtn1')) {
            pr.goBackToFirstScreen();
        }
    }

    /**
     * delete a project
     */
    deleteSelected(pr: VpcIntroInterface) {
        assertTrue(false, 'KE|not yet implemented.');
        let whichData = IntroPageOpen.getChosen(this);
        if (whichData) {
            pr.getModal().standardAnswer(
                pr,
                pr.app,
                'Confirm deletion?',
                n => {
                    if (whichData && n === UI512CompStdDialogResult.Btn1) {
                        this.deleteSelectedImpl(pr, whichData);
                    }
                },
                lng('lngOK'),
                lng('lngCancel')
            );
        }
    }

    /**
     * delete a project, not yet implemented
     */
    protected deleteSelectedImpl(pr: VpcIntroInterface, whichData: string) {
        assertTrue(false, 'KD|not yet implemented.');
        pr.getModal().standardAnswer(
            pr,
            pr.app,
            'Item removed',
            n => {
                pr.goBackToFirstScreen();
            },
            lng('lngOK')
        );
    }
}
