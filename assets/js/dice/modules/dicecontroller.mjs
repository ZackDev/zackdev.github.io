import { Bucket, DiceTypeSet, DiceType } from './modelbundle.mjs';
import { DiceAudio } from './diceaudio.mjs';
import { DiceProvider } from './diceprovider.mjs';
import { DiceTypeSetProvider } from './dicetypesetprovider.mjs';

export { DiceController };

/**
 * acts as layer between the views and the dice logic
 */
class DiceController {
    constructor() {

    }

    /**
     *
     */
    onViewInitSuccess() {
        this.diceAudio = new DiceAudio();
        this.loadSounds();
        this.diceTypeSetProvider = new DiceTypeSetProvider(this);
        this.diceProvider = new DiceProvider(this);
        this.bucket = new Bucket(this);
        this.addDiceSets();
    }

    /**
     * something went wrong when creating the Views
     */
    onViewInitError(exception) {
        console.log(exception);
        return;
    }

    /**
     * 
     */
    loadSounds() {
        this.diceAudio.registerAudio("bucket", "/assets/audio/bucket-00.flac");
        this.diceAudio.registerAudio("bucket", "/assets/audio/bucket-01.flac");
        this.diceAudio.registerAudio("table", "/assets/audio/table-00.flac");
        this.diceAudio.registerAudio("table", "/assets/audio/table-01.flac");
    }

    /**
     * 
     */
    addDiceSets() {
        // 'special' dice set
        let sDsName = "special";

        // - 4Df dice type
        let sD4fType = new DiceType("4Df", ['+', '+', '-', '-', '&nbsp;', '&nbsp;']);

        // - D12 dice type
        let sD12Type = new DiceType("D12", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]);

        // - D20 dice type
        let d20Sides = [];
        for (let i = 1; i <= 20; i++) {
            d20Sides.push(i.toString());
        }
        let sD20Type = new DiceType("D20", d20Sides);

        // - D100 dice type
        let d100Sides = [];
        for (let i = 1; i <= 100; i++) {
            d100Sides.push(i.toString());
        }
        let sD100Type = new DiceType("D100", d100Sides);

        let sDiceSet = new DiceTypeSet(sDsName, [sD4fType, sD12Type, sD20Type, sD100Type]);
        this.diceTypeSetProvider.addDiceSet(sDiceSet);

        // D2 to D6 dice set
        let bDsName = "D2-6";
        let bD2Type = new DiceType("D2", ['&#9856;', '&#9857;']);
        let bD3Type = new DiceType("D3", ['&#9856;', '&#9857;', '&#9858;']);
        let bD4Type = new DiceType("D4", ['&#9856;', '&#9857;', '&#9858;', '&#9859;']);
        let bD5Type = new DiceType("D5", ['&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;']);
        let bD6Type = new DiceType("D6", ['&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;', '&#9861;']);
        let bDiceSet = new DiceTypeSet(bDsName, [bD2Type, bD3Type, bD4Type, bD5Type, bD6Type]);
        this.diceTypeSetProvider.addDiceSet(bDiceSet);

        // symbols dice type set
        // - Arrow dice type
        let sASides = [];
        for (let i = 8592; i <= 8601; i++) {
            if (i != 8596 && i != 8597) {
                sASides.push(`&#${i};`);
            }
        }
        let sAType = new DiceType("Arrows", sASides);

        // - Katakana dice type
        let katakanaSymbols = [];
        for (let i = 12449; i <= 12538; i++) {
            // use uppercase katakanas only
            if (i != 12449 &&
                i != 12451 &&
                i != 12453 &&
                i != 12455 &&
                i != 12457 &&
                i != 12483 &&
                i != 12515 &&
                i != 12517 &&
                i != 12519 &&
                i != 12526 &&
                i != 12537 &&
                i != 12534) {
                katakanaSymbols.push(`&#${i};`);
            }
        }
        let kDiceType = new DiceType("katakana symbols", katakanaSymbols);
        this.diceTypeSetProvider.addDiceSet(new DiceTypeSet("symbols", [kDiceType, sAType]));
        /**
         * tested hieroglyphs are not available to the font 
         */
        /*
        let hieroglyphsDsName = "hieroglyphs";
        let hType = ["all", ['&#x13001;']];
        let hDiceSet = new DiceSet(hieroglyphsDsName, [hType]);
        this.diceTypeSetProvider.addDiceSet(hDiceSet);
        */

        // Katakana circled symbols dice set
        /**
         * replaced by uncircled uppercase katakana symbols
         */
        /*
        let katakanaSymbols = [];
        for (let i = 13008; i <= 13054; i++) {
            katakanaSymbols.push(`&#${i};`);
        }
        let kType = new DiceType("cKk", katakanaSymbols);
        this.diceTypeSetProvider.addDiceSet(new DiceTypeSet("katakana", [kType]));
        */
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
        let diceSetUID = this.diceTypeSetView.getSelectedDiceSetUID();
        let diceSet = this.diceTypeSetProvider.getDiceSet(diceSetUID);
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
        if (this.settingsView.getAudioMutedState() === false) {
            this.diceAudio.playAudio("bucket");
        }
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
        if (this.settingsView.getAudioMutedState() === false) {
            this.diceAudio.playAudio("table");
        }
    }

    /**
     * adds a dice to the TableView
     * @param {Dice} dice the dice to add
     */
    onDiceRolled(dice) {
        // called by the Bucket
        this.tableView.displayDice(dice.name, dice.result);
    }

    /**
     * changes the DiceSet
     * @param {UID} DiceSet the UID of the dice set to change to
     */
    onChangeDiceSetClicked(UID) {
        // called by the DiceTypeSetView
        // - remove the current set of dice types from the DiceProvider
        this.diceProvider.removeAllDiceTypes();
        // - get dice set from dice set provider and add it's types to the DiceProvider
        let diceSet = this.diceTypeSetProvider.getDiceSet(UID);
        for (let diceType of diceSet.diceTypes) {
            this.diceProvider.addDiceType(diceType);
        }
        // - activate the NewDiceTypeBtn of the DiceTypesView
        this.diceTypesView.setNewDiceTypeBtnState("active");
    }

    /**
     * adds the dice set associated with the given UID of he dice set to the DiceTypeSetView
     */
    onDiceSetAdded(UID, diceSet) {
        // called by the DiceSetProvider
        this.diceTypeSetView.displayDiceSet(UID, diceSet.name);
    }
}