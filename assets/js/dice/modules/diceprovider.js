import { UIDRandomProvider } from './uidrandomprovider.js';
import { Dice } from './modelbundle.js';

export { DiceProvider };

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
     * 
     * @param {String} UID the UID of the dice type
     * returns undefined if no diceType is found
     */
    getDiceType(UID) {
        let diceType = this.diceTypes.get(UID);
        return diceType;
    }

    /**
     * adds a dice type to the DiceProvider
     * @param {DiceType} diceType the dice type to add
     */
    addDiceType(diceType) {
        // UID for identifying the dice type
        let UID = UIDRandomProvider.getUID();
        this.diceTypes.set(UID, diceType);
        this.controller.onDiceTypeAdded(UID, diceType);
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
        let diceType = this.getDiceType(UID);
        return new Dice(diceType.name, diceType.sides);
    }  
}