import { Bucket , DiceSet, DiceType } from './modelbundle.js';
import { BucketView, DiceTypesView, NewDiceTypeView, TableView, DiceSetView } from './viewbundle.js';
import { DiceAudio } from './diceaudio.js';
import { DiceProvider } from './diceprovider.js';
import { DiceSetProvider } from './dicesetprovider.js';


export {DiceController};

/**
 * acts as layer between the views and the dice logic
 */
 class DiceController {
    constructor() {
        this.diceAudio = new DiceAudio();
        this.loadSounds();
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
    loadSounds() {
        this.diceAudio.registerAudio("bucket-00", "/assets/audio/bucket-00.flac");
        this.diceAudio.registerAudio("bucket-01", "/assets/audio/bucket-01.flac");
        this.diceAudio.registerAudio("table-00", "/assets/audio/table-00.flac");
        this.diceAudio.registerAudio("table-01", "/assets/audio/table-01.flac");
    }


    /**
     * 
     */
    addDiceSets() {
        // D3 dice set
        let sDsName = "special";
        let sD4fType = new DiceType("4Df", ['+', '+', '-', '-', '&nbsp;' , '&nbsp;']);
        let sD3Type = new DiceType("D3", ['&#9856;', '&#9857;', '&#9858;']);
        let sD12Type = new DiceType("D12", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]);
        let d20Sides = [];
        for (let i=0; i<=20; i++) {
            d20Sides.push(i.toString());
        }
        let sD20Type = new DiceType("D20", d20Sides);
        let d100Sides = [];
        for (let i=0; i<=100; i++) {
            d100Sides.push(i.toString());
        }
        let sD100Type = new DiceType("D100", d100Sides);
        let sDiceSet = new DiceSet(sDsName, [sD4fType, sD3Type, sD12Type, sD20Type, sD100Type]);
        this.diceSetProvider.addDiceSet(sDiceSet);

        let bDsName = "D2-6";
        let bD2Type = new DiceType("D2", ['&#9856;', '&#9857;']);
        let bD3Type = new DiceType("D3", ['&#9856;', '&#9857;', '&#9858;']);
        let bD4Type = new DiceType("D4", ['&#9856;', '&#9857;', '&#9858;', '&#9859;']);
        let bD5Type = new DiceType("D5", ['&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;']);
        let bD6Type = new DiceType("D6", ['&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;', '&#9861;']);
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
        let kType = new DiceType("cKk", katakanaSymbols);
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
     * @param {string} name the name of the dice type
     * @param {Array<string>} sides the sides of the dice type
     */
    onCreateDiceTypeClicked(name, sides) {
        // called by the NewDiceTypeView
        // - get selected DiceSet
        let diceSetUID = this.diceSetView.getSelectedDiceSetUID();
        let diceSet = this.diceSetProvider.getDiceSet(diceSetUID);
        if (diceSet) {
            // add the DiceType to
            // - the selected DiceSet
            // - the DiceProvider
            let diceType = new DiceType(name, sides);
            diceSet.addDiceType(diceType);
            this.diceProvider.addDiceType(diceType);
        }
        else {
            // code should not reach this
            console.log("no DiceSet selected, can't add DiceType");
        }
    }
    
    /**
     * adds a dice type to the DiceTypesView
     * @param {number} UID the UID of the dice type
     * @param {string} name the name of the dice type
     */
    onDiceTypeAdded(UID, diceType) {
        // called by the DiceProvider
        this.diceTypesView.displayDiceType(UID, diceType.name);
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
    onDiceAddedToBucket(UID, dice) {
        // called by the Bucket
        this.bucketView.displayDice(UID, dice.name);
        let bucketAudioId = Math.round(Math.random() * 2);
        this.diceAudio.playAudio(`bucket-0${bucketAudioId}`);
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
        let tableAudioId = Math.round(Math.random());
        this.diceAudio.playAudio(`table-0${tableAudioId}`);
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
        // - get dice set from dice set provider and add it's types to the DiceProvider
        let diceSet = this.diceSetProvider.getDiceSet(UID);
        for (let diceType of diceSet.diceTypes) {
            this.diceProvider.addDiceType(diceType);
        }
        // - activate the NewDiceTypeBtn of the DiceTypesView
        this.diceTypesView.setNewDiceTypeBtnState("active");
    }
    
    /**
     * adds the dice set associated with the given UID of he dice set to the DiceSetView
     */
    onDiceSetAdded(UID, diceSet) {
        // called by the DiceSetProvider
        this.diceSetView.displayDiceSet(UID, diceSet.name);
    }
}