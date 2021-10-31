import { Bucket } from './bucket.js';
import { BucketView } from './bucketview.js';
import { DiceModelsView } from './dicemodelsview.js';
import { TableView } from './tableview.js';
import { NewDiceModelView } from './newdicemodelview.js';
import { DiceProvider } from './diceprovider.js';

export {DiceController};

/**
 * acts as layer between the views and the dice logic
 */
 class DiceController {
    constructor() {
        this.diceModelsView = new DiceModelsView(this);
        this.bucketView = new BucketView(this);
        this.tableView = new TableView(this);
        this.newDiceModelView = new NewDiceModelView(this);
        this.diceProvider = new DiceProvider(this);
        this.bucket = new Bucket(this);
    }
    onAddNewDiceModelClicked() {
        this.newDiceView.show();
    }
    onDiceModelClicked(UID) {
        let dice = this.diceProvider.createDice(UID);
        this.bucket.addDice(dice);
    }
    onCreateDiceClicked(name, sides) {
        this.diceProvider.addDiceModel(name, sides);
    }
    onDiceModelAdded(UID, name) {
        this.diceModelsView.displayDiceModel(UID, name);
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