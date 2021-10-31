export { DiceTypesView }

/**
 * 
 */
 class DiceTypesView {
    
    /**
     * creates a DiceTypesView object
     * @param {DiceController} controller for notifying the controller of relevant user interactions
     */
    constructor(controller) {
        // create the view's container and add it to the DOM
        let root = document.createElement("div");
        root.id = "dice-types-container";
        document.getElementById("main-content").append(root);
        this.root = root;
        this.addNewDiceTypeBtn();
        // an array containing the html property id of the dice types
        this.diceTypes = [];
        this.controller = controller;
    }
    
    /**
     * adds the 'new dice type' button to the view 
     */
    addNewDiceTypeBtn() {
        let newDiceTypeBtn = document.createElement("img");
        newDiceTypeBtn.classList.add("icon");
        newDiceTypeBtn.classList.add("clickable");
        newDiceTypeBtn.src = "/assets/icons/newdice.svg";
        newDiceTypeBtn.id = "new-dice-type-icon";
        newDiceTypeBtn.addEventListener("click", () => {
            this.controller.onAddNewDiceTypeClicked();
        });
        this.root.append(newDiceTypeBtn);
    }
    
    /**
     * adds a clickable dice type to the view
     * @param {Number} UID - the UID of the dice type
     * @param {string} name - the name of the dice type
     */
    displayDiceType(UID, name) {
        let diceType = document.createElement("div");
        diceType.classList.add("dice-type");
        diceType.classList.add("clickable");
        diceType.id = UID;
        diceType.innerText = name;
        diceType.addEventListener("click", () => {
            this.controller.onDiceTypeClicked(UID);
        });
        this.root.append(diceType);
        this.diceTypes.push(UID);
    }
}