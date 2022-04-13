export { DiceType };

/**
 * a class representing a type of dice
 */
class DiceType {
    /**
     * creates a new DiceType object
     * @param {string} name - the name of the dice type
     * @param {Array<T>} sides - the sides of the dice type
     */
    constructor(name, sides) {
        this.name = name;
        this.sides = sides;
    }
}