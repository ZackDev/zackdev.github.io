import { DiceSet } from './modelbundle.js';
import { UIDRandomProvider } from './uidrandomprovider.js';
export { DiceSetProvider }

/**
 * 
 */
class DiceSetProvider {
    constructor(controller) {
        this.diceSetMap = new Map();
        this.controller = controller;
    }
    
    /**
     * adds a DiceSet to the DiceSetProvider
     * @param {DiceSet} diceSet - the set of dices to add
     */
    addDiceSet(diceSet) {
        let UID = UIDRandomProvider.getUID();
        this.diceSetMap.set(UID, diceSet);
        // notify controller about the added set
        this.controller.onDiceSetAdded(UID, diceSet);
    }
    
    /**
     * removes a DiceSet from the DiceSetProvider
     * @param {number} UID - the UID of the dice set to remove
     */
    removeDiceSet(UID) {
        this.dicesSetMap.delete(UID);
        // notify controller
    }
    
    /**
     * returns a DiceSet identified by the UID
     * @param {numer} UID - the UID of the dice set
     * @returns { DiceSet }
     */
    getDiceSet(UID) {
        return this.diceSetMap.get(UID);
    }
}