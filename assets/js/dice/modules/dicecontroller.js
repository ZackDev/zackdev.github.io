import { Bucket , DiceSet } from './modelbundle.js';
import { BucketView, DiceTypesView, NewDiceTypeView, TableView, DiceSetView } from './viewbundle.js';
import { DiceProvider } from './diceprovider.js';
import { DiceSetProvider } from './dicesetprovider.js';


export {DiceController};

/**
 * acts as layer between the views and the dice logic
 */
 class DiceController {
    constructor() {
        this.diceSetView = new DiceSetView(this);
        this.diceTypesView = new DiceTypesView(this);
        this.bucketView = new BucketView(this);
        this.tableView = new TableView(this);
        this.newDiceTypeView = new NewDiceTypeView(this);
        this.diceSetProvider = new DiceSetProvider(this);
        this.diceProvider = new DiceProvider(this);
        this.bucket = new Bucket(this);
        this.addDiceSets();
    }

    /**
     * 
     */
    addDiceSets() {
        // D3 dice set
        let aDsName = "D2-3";
        let aD2Type = ["D2", [1, 2]];
        let aD3Type = ["D3", [1, 2, 3]];
        let aDiceSet = new DiceSet(aDsName, [aD2Type, aD3Type]);
        this.diceSetProvider.addDiceSet(aDiceSet);

        let bDsName = "D2-6";
        let bD2Type = ["D2", [1, 2]];
        let bD3Type = ["D3", [1, 2, 3]];
        let bD4Type = ["D4", [1, 2, 3, 4]];
        let bD5Type = ["D5", [1, 2, 3, 4, 5]];
        let bD6Type = ["D6", [1, 2, 3, 4, 5, 6]];
        let bDiceSet = new DiceSet(bDsName, [bD2Type, bD3Type, bD4Type, bD5Type, bD6Type]);
        this.diceSetProvider.addDiceSet(bDiceSet);

        /**
         * tested hieroglyphs are not available to the font 
         */
        /*
        let hieroglyphsDsName = "hieroglyphs";
        let hType = ["all", ['&#x13001;']];
        let hDiceSet = new DiceSet(hieroglyphsDsName, [hType]);
        this.diceSetProvider.addDiceSet(hDiceSet);
        */

        let katakanaSymbols = [];
        for (let i = 13008; i <= 13054; i++) {
            katakanaSymbols.push(`&#${i};`);
        }
        let kType = ["cKk", katakanaSymbols];
        this.diceSetProvider.addDiceSet(new DiceSet("katakana", [kType]));
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
    
    onDiceTypeRemoved(UID) {
        // called by the DiceProvider
        this.diceTypesView.removeDiceType(UID);
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

    /**
     * changes the DiceSet
     * @param {UID} DiceSet the UID of the dice set to change to
     */
    onChangeDiceSetClicked(UID) {
        // called by the DiceSetView
        // - remove the current set of dice types from the DiceProvider
        this.diceProvider.removeAllDiceTypes();
        // - get dice set from dice set provider
        let diceSet = this.diceSetProvider.getDiceSet(UID);
        for (let diceType of diceSet.diceTypes) {
            this.diceProvider.addDiceType(diceType[0], diceType[1]);
        }
    }
    
    /**
     * adds the dice set associated with the given UID of he dice set to the DiceSetView
     */
    onDiceSetAdded(UID, diceSet) {
        // called by the DiceSetProvider
        this.diceSetView.displayDiceSet(UID, diceSet.name);
    }
}