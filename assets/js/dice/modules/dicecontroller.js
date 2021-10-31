import { Bucket } from './bucket.js';
import { DiceProvider } from './diceprovider.js';
import { BucketView, DiceTypesView, NewDiceTypeView, TableView } from './views.js';

export {DiceController};

/**
 * acts as layer between the views and the dice logic
 */
 class DiceController {
    constructor() {
        this.diceTypesView = new DiceTypesView(this);
        this.bucketView = new BucketView(this);
        this.tableView = new TableView(this);
        this.newDiceTypeView = new NewDiceTypeView(this);
        this.diceProvider = new DiceProvider(this);
        this.bucket = new Bucket(this);
    }
    /**
     * toggles the NewDiceTypeView's visibility
     */
    onAddNewDiceTypeClicked() {
        // called by the DiceTypesView
        this.newDiceTypeView.toggleVisibility();
    }
    /**
     * creates a new dice from the provided dice type UID and adds it to the Bucket
     * @param {number} UID the UID of the dice type used to create the dice 
     */
    onDiceTypeClicked(UID) {
        // called by the DiceTypesView
        let dice = this.diceProvider.createDice(UID);
        this.bucket.addDice(dice);
    }
    /**
     * adds a new dice type to the DiceProvider
     * @param {string} name 
     * @param {Array<string>} sides 
     */
    onCreateDiceClicked(name, sides) {
        // called by the NewDiceTypeView
        this.diceProvider.addDiceType(name, sides);
    }
    /**
     * adds a dice type to the DiceTypesView
     * @param {number} UID the UID of the dice type
     * @param {string} name the name of the dice type
     */
    onDiceTypeAdded(UID, name) {
        // called by the NewDiceTypesView
        this.diceTypesView.displayDiceType(UID, name);
    }
    /**
     * removes a Dice from the Bucket
     * @param {number} UID the UID of the dice to remove
     */
    removeDiceFromBucket(UID) {
        // called by the BucketView
        this.bucket.removeDice(UID);
    }
    /**
     * adds a dice to the BucketView
     * @param {Dice} dice the dice added to the bucket
     */
    onDiceAddedToBucket(dice) {
        // called by the DiceTypesView
        this.bucketView.displayDice(dice.UID, dice.name);
    }
    /**
     * removes a dice from the BucketView
     * @param {number} UID the UID of the to remove
     */
    onDiceRemovedFromBucket(UID) {
        // called by the Bucket
        this.bucketView.removeDice(UID);
    }
    /**
     * rolls all the Dices in the Bucket
     */
    onRollClicked() {
        // called by the BucketView
        this.bucket.roll();
    }
    /**
     * adds a dice to the TableView
     * @param {Dice} dice the dice to add
     */
    onDiceRolled(dice) {
        // called by the BucketView
        this.tableView.displayDice(dice.UID, dice.name, dice.result);
    }
}