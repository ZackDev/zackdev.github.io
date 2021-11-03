import { DiceSet } from "./diceset.js";
import { UIDRandomProvider } from "./uidrandomprovider.js";
export { DiceSetProvider }

/**
 * STUB
 */
class DiceSetProvider {
    constructor(controller) {
        this.diceSetMap = new Map();
        this.controller = controller;
    }
    
    /**
     * 
     * @param {*} diceSet 
     */
    addDiceSet(diceSet) {
        let UID = UIDRandomProvider.getUID();
        this.diceSetMap.set(UID, diceSet);
        // notify controller about the added set
        this.controller.onDiceSetAdded(UID, diceSet);
    }
    
    /**
     * 
     * @param {*} UID 
     */
    removeDiceSet(UID) {
        this.dicesSetMap.delete(UID);
        // notify controller
    }
    
    /**
     * 
     * @param {*} UID 
     * @returns 
     */
    getDiceSet(UID) {
        return this.diceSetMap.get(UID);
    }
}