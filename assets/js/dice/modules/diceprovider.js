import { UIDRandomProvider } from './uidrandomprovider.js';
import { Dice } from './modelbundle.js';

export { DiceProvider }

/**
 * a class for providing different type of dices, creates concrete Dice objects from a DiceType
 */
 class DiceProvider {
    /**
     * creates a DiceProvider object
     * @param {DiceController} controller for notifying changes made to the DiceProvider
     */
    constructor(controller) {
        this.controller = controller;
        // map for retrieving dice types identified by UID
        this.diceTypes = new Map();
    }
    
    /**
     * adds a dice type to the DiceProvider
     * @param {string} name the name of the dice type
     * @param {array<string>} sides the sides of the dice type
     */
    addDiceType(name, sides) {
        // UID for identifying the dice type
        let UID = UIDRandomProvider.getUID();
        this.diceTypes.set(UID, [name, sides]);
        this.controller.onDiceTypeAdded(UID, name);
    }
    
    /**
     * removes a dice type from the DiceProvider
     * @param {number} UID the UID of the dice type
     */
    removeDiceType(UID) {
        this.diceTypes.delete(UID);
        this.controller.onDiceTypeRemoved(UID);
    }
    
    /**
     * removes all dice types from the DiceProvider
     */
    removeAllDiceTypes() {
        for (let UID of this.diceTypes.keys()) {
            this.removeDiceType(UID);
        }
    }

    /**
     * 
     * @param {number} UID the UID of the dice type
     * @returns {Dice} a specific dice created from the dice type
     */
    createDice(UID) {
        // - get the dice type from the Map of types
        // - create and return a new dice specified by name and sides
        let diceType = this.diceTypes.get(UID);
        let diceName = diceType[0];
        let diceSides = diceType[1];
        return new Dice(diceName, diceSides);
    }  
}