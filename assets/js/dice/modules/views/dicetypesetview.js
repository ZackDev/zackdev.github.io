export { DiceTypeSetView };

/**
 * STUB
 */
class DiceTypeSetView {

    /**
     * 
     * @param {DiceController} controller to delegate specific user interaction with the UI to
     * @param {HTMLElement} appentTo the element where the view appends itself to
     */
    constructor(controller, appendTo) {
        let root = document.createElement("div");
        root.id = "dice-sets-container";
        root.classList.add("flex-row", "not-selectable", "shadow");
        appendTo.append(root);
        this.root = root;
        this.sets = [];
        this.selectedDiceSet = undefined;
        this.controller = controller;
        this.controller.diceTypeSetView = this;
    }

    /**
     * 
     * @param {*} UID 
     * @param {*} name 
     */
    displayDiceSet(UID, name) {
        this.sets.push(UID);
        let set = document.createElement("div");
        set.id = UID;
        set.classList.add("dice-set");
        set.classList.add("clickable");
        set.innerHTML = name;
        set.addEventListener("click", () => {
            set.classList.add("selected-dice-set");
            let otherDiceSets = this.sets.filter(id => id !== UID);
            for (let id of otherDiceSets) {
                let diceSetElement = document.getElementById(id);
                if (diceSetElement !== null) {
                    diceSetElement.classList.remove("selected-dice-set");
                }
            }
            this.selectedDiceSet = UID;
            this.controller.onChangeDiceSetClicked(UID);
        });
        this.root.append(set);
    }

    getSelectedDiceSetUID() {
        if (this.selectedDiceSet !== undefined) {
            return this.selectedDiceSet;
        }
        else {
            return undefined;
        }
    }
}