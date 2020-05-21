
/* auto */ import { RectUtils } from './../utils/utilsCanvasDraw';
/* auto */ import { O, tostring, bool } from './../utils/util512Base';
/* auto */ import { ensureDefined } from './../utils/util512Assert';
/* auto */ import { AnyParameterCtor, OrderedHash } from './../utils/util512';
/* auto */ import { ChangeContext } from './../draw/ui512Interfaces';
/* auto */ import { UI512ApplicationInterface, UI512ElGroup } from './ui512ElementGroup';
/* auto */ import { ElementObserver, elementObserverDefault } from './ui512ElementGettable';
/* auto */ import { UI512Element } from './ui512Element';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

/**
 * a class that contains all groups shown on the current form
 * this class has model state only: rendering logic should go in view, not here.
 */
export class UI512Application implements UI512ApplicationInterface {
    protected groups = new OrderedHash<UI512ElGroup>();
    observer: ElementObserver;
    bounds: number[] = [];

    constructor(bounds: number[], observer: ElementObserver = elementObserverDefault) {
        this.bounds = bounds;
        this.observer = observer;
    }

    /**
     * look for group by id. throw exception if not found.
     */
    getGroup(id: string) {
        return this.groups.get(id);
    }

    /**
     * look for group by id. return undefined if not found.
     */
    findGroup(id: string) {
        return this.groups.find(id);
    }

    /**
     * return index where condition is true
     */
    findIndex(fn:(a:UI512ElGroup)=>boolean):number {
        let i = 0
        for (let grp of this.groups.iter()) {
            if (fn(grp)) {
                return i
            }

            i++
        }
        return -1
    }

    /**
     * loop over groups. in z-order from background to foreground.
     */
    iterGrps() {
        return this.groups.iter();
    }

    /**
     * loop over groups. in z-order from foreground to background.
     */
    iterGrpsReversed() {
        return this.groups.iterReversed();
    }

    /**
     * add a group to the application.
     * for convenience, attaches our Observer to the new group
     */
    addGroup(grp: UI512ElGroup, index = -1, context = ChangeContext.Default) {
        grp.observer = this.observer;
        if (index === -1) {
            this.groups.insertNew(grp.id, grp);
        } else {
            this.groups.insertAt(grp.id, grp, index)
        }

        this.observer.changeSeen(context, grp.id, '(addgrp)', 0, 0);
    }

    /**
     * remove a group
     */
    removeGroup(id: string, context = ChangeContext.Default) {
        this.groups.delete(id);
        this.observer.changeSeen(context, id, '(removegrp)', 0, 0);
    }

    /**
     * find which element contains the coordinates
     */
    coordsToElement(x: number, y: number) {
        for (let grp of this.groups.iterReversed()) {
            if (
                !grp.getVisible() ||
                !grp.enableMouseInteraction ||
                !RectUtils.hasPoint(
                    x,
                    y,
                    grp.mouseInteractionBounds[0],
                    grp.mouseInteractionBounds[1],
                    grp.mouseInteractionBounds[2],
                    grp.mouseInteractionBounds[3]
                )
            ) {
                continue;
            }

            for (let el of grp.iterElsReversed()) {
                if (el.visible && !el.transparentToClicks) {
                    if (RectUtils.hasPoint(x, y, el.x, el.y, el.w, el.h)) {
                        return el;
                    }
                }
            }
        }

        return undefined;
    }

    /**
     * look for an element, return the parent group
     */
    findElAndGroupById(elId: O<string>): O<[UI512ElGroup, UI512Element]> {
        if (!elId) {
            return undefined;
        }

        for (let grp of this.groups.iterReversed()) {
            let el = grp.findEl(elId);
            if (el) {
                return [grp, el];
            }
        }

        return undefined;
    }

    /**
     * look for an element by id, search all groups, return undefined if not found
     */
    findEl(elId: O<string>) {
        if (!elId) {
            return undefined;
        }

        for (let grp of this.groups.iterReversed()) {
            let el = grp.findEl(elId);
            if (el) {
                return el;
            }
        }

        return undefined;
    }

    /**
     * look for an element by id, search all groups, throw exception if not found
     */
    getEl(elId: string) {
        return ensureDefined(this.findEl(elId), '2w|not found ' + elId);
    }
}

/**
 * add elements and arrange them in a grid
 */
export class GridLayout<RowType, ColType> {
    constructor(
        public baseX: number,
        public baseY: number,
        public itemW: number,
        public itemH: number,
        public cols: ColType[],
        public rows: RowType[],
        public marginX: number,
        public marginY: number
    ) {}

    /**
     * width of one column
     */
    getColWidth() {
        return this.itemW + this.marginX;
    }

    /**
     * heigh of one row
     */
    getRowHeight() {
        return this.itemH + this.marginY;
    }

    /**
     * total width
     */
    getTotalWidth() {
        return this.getColWidth() * this.cols.length;
    }

    /**
     * total height
     */
    getTotalHeight() {
        return this.getRowHeight() * this.rows.length;
    }

    /**
     * get bounds rect for one of the elements
     */
    boundsForNumber(numX: number, numY: number) {
        return [
            this.baseX + numX * (this.itemW + this.marginX),
            this.baseY + numY * (this.itemH + this.marginY),
            this.itemW,
            this.itemH
        ];
    }

    /**
     * don't actually add the elements, but compute the grid layout
     * and run the callback for each item that would be in the grid
     */
    combinations(fn: (n: number, a: ColType, b: RowType, bnds: number[]) => void) {
        let count = 0;
        for (let rowNum = 0; rowNum < this.rows.length; rowNum++) {
            for (let colNum = 0; colNum < this.cols.length; colNum++) {
                let bnds = this.boundsForNumber(colNum, rowNum);
                fn(count, this.cols[colNum], this.rows[rowNum], bnds);
                count += 1;
            }
        }
    }

    /**
     * create and add elements in a grid layout
     * we'll run the callback for each element created.
     * you can provide your own ids by setting idBasedOnCol to false
     * you can provide your own labels by setting labelBasedOnCol to false
     */
    createElems<T extends UI512Element>(
        app: UI512Application,
        grp: UI512ElGroup,
        idPrefix: string,
        ctor: AnyParameterCtor<T>,
        fn: (a: ColType, b: RowType, el: T) => void,
        idBasedOnCol = false,
        labelBasedOnCol = false
    ) {
        this.combinations((n, a, b, bnds) => {
            /* use either row data or col data, whichever is a string
            we can use as part of the id. */
            let cellIdSuffix = typeof a === 'string' ? a : b;
            let id = idBasedOnCol ? `${idPrefix}${cellIdSuffix}` : `${idPrefix}_${n}`;
            let el = new ctor(id);
            grp.addElement(app, el);
            el.setDimensions(bnds[0], bnds[1], bnds[2], bnds[3]);
            fn(a, b, el);

            if (labelBasedOnCol) {
                el.set('labeltext', tostring(cellIdSuffix).toLowerCase());
            }
        });
    }
}
