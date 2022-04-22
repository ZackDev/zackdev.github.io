import { changeClickableState, ViewPort } from '/assets/js/ui-tools.mjs';
import { UIDRandomProvider } from '../uidrandomprovider.mjs';

export { TableView };

/**
 * a class representing the table, where rolled dices get displayed
 */
class TableView {

    /**
     * creates a TableView object
     * @param {DiceController} controller for notifying the controller about user interactions with the table
     * @param {String} appendToID the HTML-Element's ID where the view appends itself to
     */
    constructor(controller, appendToID) {
        this.viewPort = new ViewPort(appendToID);
        let root = document.createElement("div");
        root.id = "table-container";
        root.classList.add("flex-row", "not-selectable");
        this.viewPort.append(root);
        this.root = root;
        this.dices = [];
        this.controller = controller;
        this.addTableBtn();

        this.controller.tableView = this;
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
                changeClickableState(this.tableBtn, state);
                this.tableBtnActive = true;
                break;
            case "inactive":
                // inactivate the button if
                // - the number of dices is zero
                // - and the button is active
                this.tableBtn.removeEventListener("click", this.clearTable);
                changeClickableState(this.tableBtn, state);
                this.tableBtnActive = false;
                break;
        }
    }

    /**
     * adds a dice to the view
     * @param {number} UID the UID of the dice
     * @param {String} name the name of the dice
     * @param {String} result the result of the dice
     */
    displayDice(name, result) {
        let UID = UIDRandomProvider.getUID();
        let dice = document.createElement("div");
        dice.classList.add("dice", "rolled");
        dice.id = UID;
        dice.title = `dice: ${name}`;
        let side = document.createElement("div");
        side.classList.add("side");
        if (result.length >= 4 && result.startsWith('&#', 0) && result.endsWith(';') && parseInt(result.substring(3, result.length - 1)) !== NaN) {
            side.innerHTML = result;
            side.style.fontSize = "2rem";
        }
        else {
            side.innerText = result;
            let rem = (3 / result.length).toFixed(2);
            side.style.fontSize = [rem, "rem"].join('');
        }
        dice.append(side);
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
        if (i > -1 && dice !== undefined) {
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
        for (let i = this.dices.length - 1; i > -1; i--) {
            this.removeDice(this.dices[i]);
        }
    }
}
