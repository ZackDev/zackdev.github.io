import { DiceType } from './dicetype.mjs';

export { DiceTypeSet };

/**
 * a class for aggregating DiceTypes
 */
class DiceTypeSet {
    /**
     * creates a new object containing a multiple of DiceTypes
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
     * adds a dice type to the dice type set
     * @param {DiceType} diceType - the type of dice to add to the DiceSet
     */
    addDiceType(diceType) {
        this.diceTypes.push(diceType);
    }
}