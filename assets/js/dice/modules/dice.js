import { UIDRandomProvider } from './uidrandomprovider.js';

export { Dice }

/**
 * a class representing a dice
 */
 class Dice {
    
    /**
     * creates a dice object
     * @param {string} name the name of the dice, e.g. D5
     * @param {Array<string>} sides the sides of the dice
     */
    constructor(name, sides) {
        this.name = name;
        this.sides = sides;
        // a placeholder for the result of roll()
        this.result = undefined;
        // a UID for distinguishing a dice
        this.UID = UIDRandomProvider.getUID();
    }
    
    /**
     * picks one of the given sides as result and sets it to this.result
     */
    roll() {
        this.result = this.sides[Math.ceil(Math.random() * this.sides.length) -1];
    }
}