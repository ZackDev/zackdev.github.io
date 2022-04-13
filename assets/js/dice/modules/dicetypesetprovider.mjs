import { UIDRandomProvider } from './uidrandomprovider.mjs';
import { DiceTypeSet } from './modelbundle.mjs';

export { DiceTypeSetProvider };

/**
 * 
 */
class DiceTypeSetProvider {
    constructor(controller) {
        this.diceTypeSetMap = new Map();
        this.controller = controller;
    }

    /**
     * adds a DiceSet to the DiceSetProvider
     * @param {DiceSet} diceSet - the set of dices to add
     */
    addDiceSet(diceSet) {
        let UID = UIDRandomProvider.getUID();
        this.diceTypeSetMap.set(UID, diceSet);
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
     * @param {number} UID - the UID of the dice set
     * @returns {DiceTypeSet}
     */
    getDiceSet(UID) {
        return this.diceTypeSetMap.get(UID);
    }
}