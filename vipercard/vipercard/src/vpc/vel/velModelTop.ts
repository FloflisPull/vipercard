
/* auto */ import { VpcElType, checkThrow } from './../vpcutils/vpcEnums';
/* auto */ import { VpcElStack } from './velStack';
/* auto */ import { VpcElProductOpts } from './velProductOpts';
/* auto */ import { VpcElField } from './velField';
/* auto */ import { VpcElCard } from './velCard';
/* auto */ import { VpcElButton } from './velButton';
/* auto */ import { VpcElBg } from './velBg';
/* auto */ import { VpcElBase } from './velBase';
/* auto */ import { SetToInvalidObjectAtEndOfExecution } from './../../ui512/utils/util512Higher';
/* auto */ import { O } from './../../ui512/utils/util512Base';
/* auto */ import { AnyParameterCtor, MapKeyToObject, cast } from './../../ui512/utils/util512';
/* auto */ import { ElementObserverDefault } from './../../ui512/elements/ui512ElementGettable';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

/**
 * owner of the stack model and productopts model
 */
export class VpcModelTop {
    /* initialized by _VpcDocLoader_ which calls ensureModelNotEmpty() */
    stack: VpcElStack;

    /* initialized by _VpcDocLoader_ which calls ensureModelNotEmpty() */
    productOpts: VpcElProductOpts;

    /* a unique id for the entire project, as distinct from the stack's stackLineage */
    uuid: string;

    /* for performance, a fast map from velId to vel */
    protected elements = new MapKeyToObject<VpcElBase>();

    /**
     * look for a vel by id, returns undefined if not found
     */
    findByIdUntyped(id: O<string>) {
        return this.elements.find(id);
    }

    /**
     * look for a vel by id, throw if not found
     */
    getByIdUntyped(id: string) {
        return this.elements.get(id);
    }

    /**
     * look for a vel of specified type by id, returns undefined if not found
     */
    findById<T extends VpcElBase>(ctor: AnyParameterCtor<T>, id: O<string>) {
        let vel = this.elements.find(id);
        return vel ? cast(ctor, vel, id) : undefined;
    }

    /**
     * look for a vel of specified type by id, throws if not found
     */
    getById<T extends VpcElBase>(ctor: AnyParameterCtor<T>, id: string): T {
        let vel = this.elements.get(id);
        return cast(ctor, vel, id);
    }

    /**
     * look for a vel of specified type by id, throws if not found
     */
    getCardById(id: string) {
        return this.getById(VpcElCard, id);
    }

    /**
     * add a vel to our map
     */
    addIdToMapOfElements(vel: VpcElBase) {
        this.elements.add(vel.id, vel);
    }

    /**
     * remove a vel from our map
     */
    removeIdFromMapOfElements(id: string) {
        return this.elements.remove(id);
    }

    /**
     * a convenient way to go from a vel to its owner
     */
    getOwnerUntyped(vel: VpcElBase): VpcElBase {
        if (vel instanceof VpcElStack) {
            return this.productOpts;
        } else if (vel instanceof VpcElProductOpts) {
            checkThrow(false, `4t|cannot get the owner of product`);
        } else {
            let found = this.findByIdUntyped(vel.parentId);
            if (found !== undefined) {
                return found;
            } else {
                checkThrow(false, `4s|cannot get the owner of el ${vel.id}`);
            }
        }
    }

    /**
     * a convenient way to go from a vel to its owner, confirm type is as expected
     */
    getOwner<T>(ctor: AnyParameterCtor<T>, vel: VpcElBase) {
        let found = this.getOwnerUntyped(vel);
        return cast(ctor, found);
    }

    /**
     * get the parent card of an element
     */
    getParentCardOfElement(vel: VpcElBase): VpcElBase {
        let cur = this.getCurrentCard();
        if (vel instanceof VpcElCard) {
            return vel;
        } else if (vel instanceof VpcElBg) {
            if (vel.id === cur.parentId) {
                return cur;
            } else {
                return vel.cards[0];
            }
        } else if (vel instanceof VpcElButton || vel instanceof VpcElField) {
            let parent = this.getByIdUntyped(vel.parentId);
            return this.getParentCardOfElement(parent);
        } else {
            return cur;
        }
    }

    /**
     * get the current card
     */
    getCurrentCard() {
        let cardId = this.productOpts.getS('currentCardId');
        let found = this.getCardById(cardId);
        checkThrow(found instanceof VpcElCard && found.getType() === VpcElType.Card, '79|getCurrentCard failed');
        return found;
    }

    /**
     * get child arrays
     */
    static getChildArrays(vel: VpcElBase): VpcElBase[][] {
        let velAsCard = vel as VpcElCard;
        let velAsBg = vel as VpcElBg;
        let velAsStack = vel as VpcElStack;
        if (velAsCard instanceof VpcElCard) {
            return [velAsCard.parts];
        } else if (velAsBg instanceof VpcElBg) {
            return [velAsBg.cards, velAsBg.parts];
        } else if (velAsStack instanceof VpcElStack) {
            return [velAsStack.bgs];
        } else {
            return [];
        }
    }

    /**
     * when modeltop is no longer valid, null out the fields
     * so that code mistakenly referring to it will
     * cause an exception
     */
    destroy() {
        for (let vel of this.stack.iterEntireStack()) {
            vel.destroy();
        }

        this.productOpts.observer = new ElementObserverDefault();
        this.elements = SetToInvalidObjectAtEndOfExecution(this.elements);
        this.productOpts = SetToInvalidObjectAtEndOfExecution(this.productOpts);
        this.stack = SetToInvalidObjectAtEndOfExecution(this.stack);
    }
}
