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
    onAddNewDiceTypeClicked() {
        this.newDiceTypeView.toggleVisibility();
    }
    onDiceTypeClicked(UID) {
        let dice = this.diceProvider.createDice(UID);
        this.bucket.addDice(dice);
    }
    onCreateDiceClicked(name, sides) {
        this.diceProvider.addDiceType(name, sides);
    }
    onDiceTypeAdded(UID, name) {
        this.diceTypesView.displayDiceType(UID, name);
    }
    removeDiceFromBucket(UID) {
        this.bucket.removeDice(UID);
    }
    onDiceAddedToBucket(dice) {
        this.bucketView.displayDice(dice.UID, dice.name);
    }
    onDiceRemovedFromBucket(UID) {
        this.bucketView.removeDice(UID);
    }
    onRollClicked() {
        this.bucket.roll();
    }
    onDiceRolled(dice) {
        this.tableView.displayDice(dice.UID, dice.name, dice.result);
    }
}