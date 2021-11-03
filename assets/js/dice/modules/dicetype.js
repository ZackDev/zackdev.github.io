export { DiceType };

/**
 * represents a type of dice.
 * - for example, a 'D3' is a type of dice with three sides dice having the values one to three
 */
class DiceType {
    constructor(name, sides) {
        this.name = name;
        this.sides = sides;
    }
}