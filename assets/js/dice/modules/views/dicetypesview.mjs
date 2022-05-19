import { changeClickableState, ViewPort } from '/assets/js/ui-tools.mjs';

export { DiceTypesView };

/**
 * 
 */
class DiceTypesView {

    /**
     * creates a DiceTypesView object
     * @param {DiceController} controller for notifying the controller of relevant user interactions
     * @param {String} appendToID the ID of the HTML-Element where the view appends itself to
     */
    constructor(controller, appendToID) {
        this.viewPort = new ViewPort(appendToID);
        // create the view's container and add it to the DOM
        let root = document.createElement("div");
        root.id = "dice-types-container";
        root.classList.add("flex-row", "not-selectable", "shadow");
        this.viewPort.append(root);
        this.root = root;
        // an array containing the html property id of the dice types
        this.diceTypes = [];
        this.controller = controller;
        this.controller.diceTypesView = this;
    }

    /**
     * adds a clickable dice type to the view
     * @param {Number} UID - the UID of the dice type
     * @param {string} name - the name of the dice type
     */
    displayDiceType(UID, name) {
        let diceType = document.createElement("div");
        diceType.classList.add("dice-type", "clickable");
        diceType.id = UID;
        diceType.innerText = name;
        diceType.addEventListener("click", () => {
            this.controller.onDiceTypeClicked(UID);
        });
        
        this.root.append(diceType);
        this.diceTypes.push(UID);
    }

    /**
     * removes the dice type identified by UID from the DOM
     * @param {number} UID - the UID of the dice type to remove
     */
    removeDiceType(UID) {
        let i = this.diceTypes.indexOf(UID);
        if (i > -1) {
            this.diceTypes.splice(i, 1);
            let diceTypeElement = document.getElementById(UID);
            if (diceTypeElement !== null) {
                diceTypeElement.remove();
            }
        }
    }
}
