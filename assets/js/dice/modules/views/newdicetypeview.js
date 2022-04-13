import { registerCustomHTMLElements } from '/assets/js/main.js';
import { ViewPort } from '/assets/js/viewport.js';
export { NewDiceTypeView };

/**
 * a class representing the NewDiceTypeView for creating new dice types. contains the view's logic.
 */
 class NewDiceTypeView extends ViewPort {
    
    /**
     * creates a NewDiceView object
     * @param {DiceController} controller for notifying the controller about user actions
     * @param {String} appendToID the HTML-Element's ID where the view appends itself to
     */
    constructor(controller, appendToID) {
        super(appendToID);
        // create the root div containing the view and add it to the DOM
        let root = document.createElement("div");
        root.id = "create-dice-type-container";
        root.classList.add("flex-column", "not-selectable", "shadow");
        this.viewPort.append(root);
        this.root = root;
        // an array for adding and removing the dice's sides
        this.diceSides = [];
        let labelWrap = document.createElement("div");
        labelWrap.classList.add("flex-row");
        labelWrap.style.justifyContent = "center";
        labelWrap.style.alignItems = "baseline";
        let diceDecorationL0 = document.createElement("div");
        diceDecorationL0.classList.add("dice-type", "small");
        diceDecorationL0.innerHTML = "&AElig;";
        diceDecorationL0.style.rotate = "23deg";
        let diceDecorationL1 = document.createElement("div");
        diceDecorationL1.classList.add("dice-type", "small");
        diceDecorationL1.innerHTML = "&#556;";
        diceDecorationL1.style.rotate = "-172deg";
        let label = document.createElement("label");
        label.style.textAlign = "center";
        label.innerText = "Create A Dice";
        let diceDecorationR0 = document.createElement("div");
        diceDecorationR0.classList.add("dice-type", "small");
        diceDecorationR0.innerHTML = "&#1002;";
        diceDecorationR0.style.rotate = "-5deg";
        let diceDecorationR1 = document.createElement("div");
        diceDecorationR1.classList.add("dice-type", "small");
        diceDecorationR1.innerHTML = "&#1758;";

        labelWrap.append(diceDecorationL0, diceDecorationL1, label, diceDecorationR0, diceDecorationR1);

        // the name wrap
        let nameWrap = document.createElement("div");
        nameWrap.classList.add("flex-column");
        // - the info element
        let nameInfoWrap = document.createElement("div");
        nameInfoWrap.classList.add("flex-row");
        nameInfoWrap.style.justifyContent = "space-between";
        let nameInfoText = document.createElement("div");
        nameInfoText.innerText = "Name: 1 to 4 characters";
        nameInfoText.style.fontSize = "16px";
        nameInfoText.style.color = "#605c59";
        let nameInfoCheckOrX = document.createElement("div");
        nameInfoCheckOrX.id = "create-dice-type-name-check-or-x";
        nameInfoCheckOrX.innerHTML = "&cross;";
        nameInfoWrap.append(nameInfoText, nameInfoCheckOrX);
        // - the input for setting the dice's name
        let nameInput = document.createElement("input");
        nameInput.classList.add("dice-type");
        nameInput.id = "dice-name-input";
        nameInput.type = "text";
        nameInput.placeholder = "....";
        nameInput.minLength = 1;
        nameInput.maxLength = 4;
        nameInput.addEventListener("input", () => {
            this.adaptNameInfo();
        });
        // - add the input's elements to the wrapper
        nameWrap.append(nameInfoWrap, nameInput);

        // the side wrap
        let sideWrap = document.createElement("div");
        sideWrap.classList.add("flex-column");
        // - the sides input info
        let sidesInfoWrap = document.createElement("div");
        sidesInfoWrap.classList.add("flex-row");
        sidesInfoWrap.style.justifyContent = "space-between";
        let sidesInfoText = document.createElement("div");
        sidesInfoText.innerText = "Sides: more than one side";
        sidesInfoText.style.fontSize = "16px";
        sidesInfoText.style.color = "#605c59";
        let sidesInfoCheckOrX = document.createElement("div");
        sidesInfoCheckOrX.id = "create-dice-type-sides-check-or-x";
        sidesInfoCheckOrX.innerHTML = "&cross;";
        // - the wrapper for the side input
        let sideInputWrap = document.createElement("div");
        sideInputWrap.classList.add("flex-row");
        sideInputWrap.style.justifyContent = "space-between";
        // - the side input for entering a side
        let sideInput = document.createElement("input");
        sideInput.classList.add("dice");
        sideInput.id = "dice-sides-input";
        sideInput.type = "text";
        sideInput.placeholder = ".";
        sideInput.minLength = 1;
        sideInput.maxLength = 1;
        sideInput.addEventListener("input", () => {
            this.adaptAddSideButton();
        });
        // - the 'addSideBtn'
        // adds the value of this.sideInput to this.sides
        let addSideBtn = document.createElement("button");
        addSideBtn.classList.add("unclickable");
        addSideBtn.innerText = "Add Side";
        addSideBtn.addEventListener("click", () => {
            let sideValue = this.sideInput.value;
            // check the input for appropriate length
            if (sideValue.length == 1) {
                let side = document.createElement("div");
                side.classList.add("dice", "clickable");
                side.innerText = sideValue;
                // event handler for a specific dice's side
                // - removes the side from the DOM
                // - removes the side from this.diceSides
                side.addEventListener("click", () => {
                    let i = this.diceSides.indexOf(sideValue);
                    if (i > -1) {
                        this.diceSides.splice(i, 1);
                        side.remove();
                        this.adaptSidesInfo();
                    }
                });
                this.sideOutput.append(side);
                this.diceSides.push(sideValue);
                this.sideInput.value = "";
                this.sideInput.focus();
                this.adaptSidesInfo();
                this.adaptAddSideButton();
            }
        });
        sidesInfoWrap.append(sidesInfoText, sidesInfoCheckOrX);
        sideInputWrap.append(sideInput, addSideBtn);
        // - the output for displaying the dice's sides
        let sideOutput = document.createElement("div");
        sideOutput.id = "sides-container";
        sideOutput.classList.add("flex-row");
        sideOutput.style.flexWrap = "wrap";
        
        sideWrap.append(sidesInfoWrap, sideInputWrap, sideOutput);

        // - the 'createDiceBtn', calls the controllers onCreateDiceClicked() method
        // - with this.nameInput and this.dicesSides as parameters
        let createDiceBtn = document.createElement("button");
        createDiceBtn.classList.add("unclickable");
        createDiceBtn.innerText = "Create Dice";
        createDiceBtn.addEventListener("click", () => {
            // only create 'valid' dices
            // - with minimum two sides
            // - and the length of the name bewtween one and four
            if (this.diceSides.length >= 2 && this.nameInput.value.length >= 1 && this.nameInput.value.length <= 4 && this.nameInput.value.length >= 1 ) {
                this.controller.onCreateDiceTypeClicked(this.nameInput.value, this.diceSides);
                this.clear();
                this.adaptNameInfo();
                this.adaptSidesInfo();
                this.hide();
            }
        });
        // add the relevant UI elements to this for future referece
        this.nameInput = nameInput;
        this.sideInput = sideInput;
        this.sideOutput = sideOutput;
        this.addSideBtn = addSideBtn;
        this.createDiceBtn = createDiceBtn;

        // add the created HTML-Elements to the view's container
        this.root.append(labelWrap);
        this.root.append(document.createElement("hr"));
        this.root.append(nameWrap);
        this.root.append(document.createElement("hr"));
        this.root.append(sideWrap);
        this.root.append(document.createElement("hr"));
        this.root.append(createDiceBtn);
        this.hide();
        this.controller = controller;

        this.controller.newDiceTypeView = this;
    }
    
    /**
     * clears | resets the view
     */
    clear() {
        this.nameInput.value = "";
        this.sideOutput.innerHTML = "";
        this.sideInput.value = "";
        this.diceSides = [];
    }

    /**
     * adds either a checkmark or cross depending on the dice's name's length to the nameInfo HTML-Element
     */
    adaptNameInfo() {
        let lenName = this.nameInput.value.length;
        if (lenName >= 1 && lenName <= 4) {
            document.getElementById("create-dice-type-name-check-or-x").innerHTML = "&check;";
        }
        else {
            document.getElementById("create-dice-type-name-check-or-x").innerHTML = "&cross;";
        }
        this.adaptCreateButton();
    }

    /**
     * gets the number of sides and either sets a cross or checkmark to the sidesInfo HTML-Element
     */
    adaptSidesInfo() {
        let numSides = this.diceSides.length;
        if (numSides >= 2) {
            document.getElementById("create-dice-type-sides-check-or-x").innerHTML = "&check;";
        }
        else {
            document.getElementById("create-dice-type-sides-check-or-x").innerHTML = "&cross;";
        }
        this.adaptCreateButton();
    }

    /**
     * enables or disables the createDiceButton wheather the dice to create is valid or not
     */
    adaptCreateButton() {
        let lenName = this.nameInput.value.length;
        let numSides = this.diceSides.length;
        if (lenName >= 1 && lenName <=4 && numSides >=2) {
            this.createDiceBtn.classList.remove("unclickable");
            this.createDiceBtn.classList.add("clickable");
        }
        else {
            this.createDiceBtn.classList.remove("clickable");
            this.createDiceBtn.classList.add("unclickable");
        }
    }

    /**
     * examines the sides input and either activates or deactivates the addSideButton
     */
    adaptAddSideButton() {
        let lenSideInput = this.sideInput.value.length;
        if (lenSideInput >= 1 && lenSideInput <= 4) {
            this.addSideBtn.classList.remove("unclickable");
            this.addSideBtn.classList.add("clickable");
        }
        else {
            this.addSideBtn.classList.remove("clickable");
            this.addSideBtn.classList.add("unclickable");
        }
    }

    /**
     * toggle's the view's visibility
     */
    toggleVisibility() {
        if (this.visible === false) {
            this.show();
        }
        else if (this.visible === true) {
            this.hide();
        }
    }
    
    /**
     * hides the view by setting the containers opacity to zero
     */
    hide() {
        this.root.style.opacity = 0;
        this.visible = false;
    }
    
    /**
     * shows the view by setting the containers opacity to one
     */
    show() {
        this.root.style.opacity = 1;
        this.visible = true;
    }
}

registerCustomHTMLElements('new-dice-type-view', NewDiceTypeView);