import { Bucket, DiceTypeSet, DiceType } from './modelbundle.mjs';
import { DiceAudio } from './diceaudio.mjs';
import { DiceProvider } from './diceprovider.mjs';
import { DiceTypeSetProvider } from './dicetypesetprovider.mjs';
import { checkHTTPResponse } from '/assets/js/main.mjs';

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
        let diceSetsURL = "https://raw.githubusercontent.com/ZackDev/data/master/json/dices.json";
        let fInit = {
            method: 'GET',
            cache: 'no-cache'
        }

        fetch(diceSetsURL, fInit)
            .then(res => checkHTTPResponse(res))
            .then(res => res.json())
            .then(res => {
                if (res.dicesets !== null && res.dicesets !== undefined) {
                    for (let diceset of res.dicesets) {
                        let diceTypes = [];
                        if (diceset["dicetypes"] !== undefined) {
                            for (let dicetype of diceset.dicetypes) {
                                if (dicetype["name"] !== undefined && dicetype["sides"] !== undefined) {
                                    let typeName = dicetype.name;
                                    let typeSides = dicetype.sides;
                                    diceTypes.push(new DiceType(typeName, typeSides));
                                }
                            }
                            if (diceTypes.length > 0) {
                                this.diceTypeSetProvider.addDiceSet(new DiceTypeSet(diceset.name, diceTypes));
                            }
                        }
                    }
                }
            })
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
        this.settingsView.setNewDiceTypeBtnState("active");
    }

    /**
     * adds the dice set associated with the given UID of he dice set to the DiceTypeSetView
     */
    onDiceSetAdded(UID, diceSet) {
        // called by the DiceSetProvider
        this.diceTypeSetView.displayDiceSet(UID, diceSet.name);
    }
}