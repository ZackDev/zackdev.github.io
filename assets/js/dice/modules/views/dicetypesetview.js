export { DiceTypeSetView };

/**
 * STUB
 */
class DiceTypeSetView {

    /**
     * 
     * @param {*} controller 
     */
    constructor(controller) {
        let root = document.createElement("div");
        root.id = "dice-sets-container";
        root.classList.add("flex-row");
        root.classList.add("shadow");
        document.getElementById("main-content").append(root);
        this.root = root;
        this.sets = [];
        this.selectedDiceSet = undefined;
        this.controller = controller;
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
                diceSetElement.classList.remove("selected-dice-set");
            }
            this.selectedDiceSet = UID;
            this.controller.onChangeDiceSetClicked(UID);
        });
        this.root.append(set);
    }

    getSelectedDiceSetUID() {
        if (this.selectedDiceSet) {
            return this.selectedDiceSet;
        }
        else {
            return undefined;
        }
    }
}