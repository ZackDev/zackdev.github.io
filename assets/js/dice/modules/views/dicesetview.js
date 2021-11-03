export { DiceSetView };

/**
 * STUB
 */
class DiceSetView {

    /**
     * 
     * @param {*} controller 
     */
    constructor(controller) {
        let root = document.createElement("div");
        root.id = "dice-sets-container";
        document.getElementById("main-content").append(root);
        this.root = root;
        this.sets = [];
        // TODO build UI controls
        // possible layouts
        // - arrow-left | setInfo | arrow right
        // - dropdown
        // - similar to the 'DiceTypesView'
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
            this.controller.onChangeDiceSetClicked(UID);
        });
        this.root.append(set);
    }
}