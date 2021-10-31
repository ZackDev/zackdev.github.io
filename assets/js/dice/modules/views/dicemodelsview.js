export { DiceModelsView }

/**
 * 
 */
 class DiceModelsView {
    /**
     * creates a DiceModelsView object
     * @param {DiceController} controller for notifying the controller of relevant user interactions
     */
    constructor(controller) {
        // create the view's container and add it to the DOM
        let root = document.createElement("div");
        root.id = "dice-models-container";
        document.getElementById("main_content").append(root);
        this.root = root;
        this.addNewDiceModelBtn();
        // an array containing the html property id of the dice models
        this.diceModels = [];
        this.controller = controller;
    }
    /**
     * adds the 'new dice model' button to the view 
     */
    addNewDiceModelBtn() {
        let newDiceModelBtn = document.createElement("img");
        newDiceModelBtn.classList.add("icon");
        newDiceModelBtn.classList.add("clickable");
        newDiceModelBtn.src = "/assets/icons/newdice.svg";
        newDiceModelBtn.id = "newdice-icon";
        newDiceModelBtn.addEventListener("click", () => {
            this.controller.onAddNewDiceModelClicked();
        });
        this.root.append(newDiceModelBtn);
    }
    /**
     * adds a clickable dice model to the view
     * @param {Number} UID - the UID of the dice model
     * @param {string} name - the name of the dice model
     */
    displayDiceModel(UID, name) {
        let diceModel = document.createElement("div");
        diceModel.classList.add("dice-model");
        diceModel.classList.add("clickable");
        diceModel.id = UID;
        diceModel.innerText = name;
        diceModel.addEventListener("click", () => {
            this.controller.onDiceModelClicked(UID);
        });
        this.root.append(diceModel);
        this.diceModels.push(UID);
    }
}