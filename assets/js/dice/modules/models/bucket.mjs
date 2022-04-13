import { UIDRandomProvider } from '../uidrandomprovider.mjs';

export { Bucket };

/**
 * a class representing a bucket where dices can be added, removed and rolled
 */
class Bucket {

    /**
     * creates a Bucket object
     * @param {DiceController} controller for notifying the controller about the bucket's changes
     */
    constructor(controller) {
        this.controller = controller;
        // a map holding dices added to the bucket
        this.dices = new Map();
    }

    /**
     * adds a dice to the bucket
     * notifies the controller which dice has been added
     * @param {Dice} dice the Dice to add
     */
    addDice(dice) {
        let UID = UIDRandomProvider.getUID();
        this.dices.set(UID, dice);
        this.controller.onDiceAddedToBucket(UID, dice);
    }

    /**
     * removes a dice from the bucket
     * notifies the controller about the removed dice's UID
     * @param {Dice} UID the UID of the dice to remove
     */
    removeDice(UID) {
        this.dices.delete(UID);
        this.controller.onDiceRemovedFromBucket(UID);
    }

    /**
     * rolls all dices in the bucket
     */
    roll() {
        for (let [UID, dice] of this.dices) {
            dice.roll();
            this.removeDice(UID);
            this.controller.onDiceRolled(dice);
        }
    }
}