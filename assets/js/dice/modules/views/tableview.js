export { TableView };

/**
 * a class representing the table, where rolled dices get displayed
 */
 class TableView {
    
    /**
     * creates a TableView object
     * @param {DiceController} controller for notifying the controller about user interactions with the table
     */
    constructor(controller) {
        let root = document.createElement("div");
        root.id = "table-container";
        root.classList.add("flex-row");
        document.getElementById("main-content").append(root);
        this.root = root;
        this.dices = [];
        this.controller = controller;
        this.addTableBtn();
    }
    
    /**
     * adds the table button to the table
     */
    addTableBtn() {
        let tableBtn = document.createElement("img");
        tableBtn.classList.add("icon");
        tableBtn.src = "/assets/icons/table.svg";
        tableBtn.id = "table-icon";
        this.tableBtn = tableBtn;
        this.tableBtnActive = false;
        this.adaptTableBtnState();
        this.root.append(tableBtn);
    }
    
    /**
    * checks the table button's state in relation to the dices on the table
    */
    adaptTableBtnState() {
        if (this.dices.length > 0 && this.tableBtnActive === false) {
            this.setTableButtonState("active");
        }
        else if (this.dices.length === 0 && this.tableBtnActive === true) {
            this.setTableButtonState("inactive");
        }
    }
    
    /**
     * changes the table button state ("active"|"inactive")
     * @param {string} state the new state
     */
    setTableButtonState(state) {
        switch (state) {
            case "active":
                // activate the button if
                // - the number of dices is greater than zero
                // - and the button is inactive
                this.tableBtn.addEventListener("click", this.clearTable);
                this.tableBtn.classList.add("clickable");
                this.tableBtnActive = true;
                break;
            case "inactive":
                // inactivate the button if
                // - the number of dices is zero
                // - and the button is active
                this.tableBtn.removeEventListener("click", this.clearTable);
                this.tableBtn.classList.remove("clickable");
                this.tableBtnActive = false;
                break;
        }
    }
    
    /**
     * adds a dice to the view
     * @param {number} UID the UID of the dice
     * @param {string} name the name of the dice
     * @param {*} result the result of the dice
     */
    displayDice(UID, name, result) {
        let dice = document.createElement("div");
        dice.classList.add("dice");
        dice.classList.add("rolled");
        dice.id = UID;
        dice.title = `dice: ${name}`;
        dice.innerHTML = `<div style="font-size:50px;">${result}</div>`;
        this.dices.push(UID);
        this.root.append(dice);
        this.adaptTableBtnState();
    }
    
    /**
     * removes a dice from the view
     * @param {number} UID the dice's UID
     */
    removeDice(UID) {
        let dice = document.getElementById(UID);
        let i = this.dices.indexOf(UID);
        if (i > -1) {
            this.dices.splice(i, 1);
            dice.remove();
            this.adaptTableBtnState();
        }
    }
    
    /**
     * removes all dices from the view
     */
    clearTable = () => {
        // backward loop, prevent array items from becoming unreachable
        for (let i = this.dices.length -1; i > -1; i--) {
            this.removeDice(this.dices[i]);
        }
    }
}