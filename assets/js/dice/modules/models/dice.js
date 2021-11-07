import { DiceType } from './dicetype.js';

export { Dice };

/**
 * a class representing a dice
 */
 class Dice extends DiceType {
    
    /**
     * creates a dice object
     * @param {string} name the name of the dice, e.g. D5
     * @param {Array<string>} sides the sides of the dice
     */
    constructor(name, sides) {
        super(name, sides);
        // a placeholder for the result of roll()
        this.result = undefined;
    }
    
    /**
     * picks one of the given sides as result and sets it to this.result
     */
    roll() {
        this.result = this.sides[Math.ceil(Math.random() * this.sides.length) -1];
    }
}