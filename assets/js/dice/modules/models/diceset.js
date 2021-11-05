import { DiceType } from './dicetype.js';

export { DiceSet };

/**
 * STUB
 */
class DiceSet {
    /**
     * creates a new DiceSet object
     * @param {string} name - the name of the DiceSet to create
     * @param {Array<DiceType>} diceTypes - an array of DiceTypes to add to the DiceSet
     */
    constructor(name, diceTypes) {
        this.name = name;
        this.diceTypes = [];
        for (let dt of diceTypes) {
            this.addDiceType(dt);
        }
    }

    /**
     * 
     * @param {DiceType} diceType - the type of dice to add to the DiceSet
     */
    addDiceType(diceType) {
        this.diceTypes.push(diceType);
    }
}