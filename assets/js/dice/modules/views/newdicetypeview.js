export { NewDiceTypeView };

/**
 * a class representing the NewDiceTypeView for creating new dice types. contains the view's logic.
 */
 class NewDiceTypeView {
    
    /**
     * creates a NewDiceView object
     * @param {DiceController} controller for notifying the controller about user actions
     */
    constructor(controller) {
        // create the root div containing the view and add it to the DOM
        let mainContentElement = document.getElementById("main-content");
        if (mainContentElement !== null) {
            let root = document.createElement("div");
            root.id = "create-dice-type-container";
            root.classList.add("flex-column");
            root.classList.add("not-selectable");
            root.classList.add("shadow");
            mainContentElement.append(root);
            this.root = root;
            // an array for adding and removing the dice's sides
            this.diceSides = [];
            let label = document.createElement("label");
            label.innerHTML = "create a new type of dice.";

            // the name wrap
            let nameWrap = document.createElement("div");
            nameWrap.classList.add("flex-column");
            // - the info element
            let nameInfoWrap = document.createElement("div");
            nameInfoWrap.classList.add("flex-row");
            nameInfoWrap.style.justifyContent = "space-between";
            let nameInfoText = document.createElement("div");
            nameInfoText.innerText = "name: 1 to 4 characters";
            let nameInfoCheckOrX = document.createElement("div");
            nameInfoCheckOrX.id = "create-dice-type-name-check-or-x";
            nameInfoCheckOrX.innerHTML = "&cross;";
            nameInfoWrap.append(nameInfoText, nameInfoCheckOrX);
            // - the input for setting the dice's name
            let nameInput = document.createElement("input");
            nameInput.id = "dice-name-input";
            nameInput.type = "text";
            nameInput.placeholder = "enter a name here.";
            nameInput.minLength = 1;
            nameInput.maxLength = 4;
            nameInput.addEventListener("input", () => {
                this.adaptNameInfo();
            });
            // - add the input's elements to the wrapper
            nameWrap.append(nameInfoWrap);
            nameWrap.append(nameInput);

            // the side wrap
            let sideWrap = document.createElement("div");
            sideWrap.classList.add("flex-column");
            // - the sides input info
            let sidesInfoWrap = document.createElement("div");
            sidesInfoWrap.classList.add("flex-row");
            sidesInfoWrap.style.justifyContent = "space-between";
            let sidesInfoText = document.createElement("div");
            sidesInfoText.innerText = "sides: more than one side.";
            let sidesInfoCheckOrX = document.createElement("div");
            sidesInfoCheckOrX.id = "create-dice-type-sides-check-or-x";
            sidesInfoCheckOrX.innerHTML = "&cross;";
            // - the wrapper for the side input
            let sideInputWrap = document.createElement("div");
            sideInputWrap.classList.add("flex-row");
            sideInputWrap.style.justifyContent = "space-between";
            // - the side input for entering a side
            let sideInput = document.createElement("input");
            sideInput.id = "dice-sides-input";
            sideInput.type = "text";
            sideInput.placeholder = "enter a side value here.";
            sideInput.minLength = 1;
            sideInput.maxLength = 1;
            sideInput.addEventListener("input", () => {
                this.adaptAddSideButton();
            });
            // - the 'addSideBtn'
            // adds the value of this.sideInput to this.sides
            let addSideBtn = document.createElement("button");
            addSideBtn.classList.add("unclickable");
            addSideBtn.innerHTML = "add side";
            addSideBtn.addEventListener("click", () => {
                let sideValue = this.sideInput.value;
                // check the input for appropriate length (one to four)
                if (sideValue.length == 1) {
                    let side = document.createElement("div");
                    side.classList.add("dice");
                    side.classList.add("clickable");
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
            sideInputWrap.append(sideInput);
            sideInputWrap.append(addSideBtn);
            // - the output for displaying the dice's sides
            let sideOutput = document.createElement("div");
            sideOutput.id = "sides-container";
            sideOutput.classList.add("flex-row");
            
            sideWrap.append(sidesInfoWrap);
            sideWrap.append(sideInputWrap);
            sideWrap.append(sideOutput);

            // - the 'createDiceBtn', calls the controllers onCreateDiceClicked() method
            // - with this.nameInput and this.dicesSides as parameters
            let createDiceBtn = document.createElement("button");
            createDiceBtn.classList.add("unclickable");
            createDiceBtn.innerHTML = "create dice";
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
            this.root.append(label);
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
        else {
            throw 'ViewError';
        }
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