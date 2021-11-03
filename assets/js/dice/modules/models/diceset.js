export { DiceSet };

/**
 * STUB
 */
class DiceSet {
    /**
     * creates a new DiceSet object
     * @param {string} name 
     * @param {DiceType} diceTypes 
     */
    constructor(name, diceTypes) {
        this.name = name;
        this.diceTypes = diceTypes;
    }

    /**
     * 
     * @param {*} diceType 
     */
    addDiceType(diceType) {
        this.diceTypes.push(diceType);
    }
}