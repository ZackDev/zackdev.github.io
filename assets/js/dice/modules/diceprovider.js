import { UIDRandomProvider } from './uidrandomprovider.js';
import { Dice } from './dice.js';

export { DiceProvider }

/**
 * a class for providing different type of dices, creates concrete Dice objects from a DiceModel
 */
 class DiceProvider {
    /**
     * creates a DiceProvider object
     * @param {DiceController} controller for notifying changes made to the DiceProvider
     */
    constructor(controller) {
        this.controller = controller;
        // map for retrieving dice models identified by UID
        this.diceModels = new Map();
        this.addDiceModel("D2", [1, 2]);
        this.addDiceModel("D3", [1, 2, 3]);
        this.addDiceModel("D6", [1, 2, 3, 4, 5, 6]);
        let D10 = [];
        for (let i=1; i<= 10; i++) {
            D10.push(i);
        }
        this.addDiceModel("D10", D10);
        let D100 = [];
        for (let i=1; i<=100; i++) {
            D100.push(i);
        }
        this.addDiceModel("D100", D100);
    }
    /**
     * adds a dice model to the DiceProvider
     * @param {string} name the name of the dice model
     * @param {array<string>} sides the sides of the dice model
     */
    addDiceModel(name, sides) {
        // UID for identifying the dice model
        let UID = UIDRandomProvider.getUID();
        this.diceModels.set(UID, [name, sides]);
        this.controller.onDiceModelAdded(UID, name);
    }
    /**
     * removes a dice model from the DiceProvider
     * @param {} UID the UID of the dice model
     */
    removeDiceModel(UID) {
        this.diceModels.delete(UID);
        this.controller.onDiceModelRemoved(UID);
    }
    /**
     * 
     * @param {} UID the UID of the dice model
     * @returns {Dice} a specific dice created from the dice model
     */
    createDice(UID) {
        // - get the dice model from the Map of models
        // - create and return a new dice specified by name and sides
        let diceModel = this.diceModels.get(UID);
        return new Dice(diceModel[0], diceModel[1]);
    }
    changeDiceTypes(type) {
        // placeholder
        switch (type) {
            case "":
                break;
        }
        this.controller.onDiceSetChanged();
    }
}