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
        let root = document.createElement("div");
        root.id = "create-dice-type-container";
        document.getElementById("main-content").append(root);
        this.root = root;
        // an array for adding and removing the dice's sides
        this.diceSides = [];
        let label = document.createElement("div");
        label.innerHTML = "create a new type of dice."
        // the input for setting the dice's name
        let nameInput = document.createElement("input");
        nameInput.id = "dice-name-input";
        nameInput.type = "text";
        nameInput.placeholder = "enter a name here."
        nameInput.minLength = 1;
        nameInput.maxLength = 4;
        // the output for displaying the dice's sides
        let sideOutput = document.createElement("div");
        sideOutput.id = "sides-container";
        // the input for adding sides
        let sideInput = document.createElement("input");
        sideInput.id = "dice-sides-input";
        sideInput.type = "text";
        sideInput.placeholder = "enter a side value here."
        sideInput.minLength = 1;
        sideInput.maxLength = 4;
        // the container holding buttons:
        let btnContainer = document.createElement("div");
        btnContainer.id = "btn-container";
        // - the 'addSideBtn'
        // adds the value of this.sideInput to this.sides
        let addSideBtn = document.createElement("button");
        addSideBtn.innerHTML = "add side";
        addSideBtn.addEventListener("click", () => {
            let sideValue = this.sideInput.value;
            // check the input for appropriate length (one to four)
            if (sideValue.length >= 1 && sideValue.length <= 4) {
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
                    }
                });
                this.sideOutput.append(side);
                this.diceSides.push(sideValue);
                this.sideInput.value = "";
                this.sideInput.focus();
            } 
        });
        // - the 'createDiceBtn', calls the controllers onCreateDiceClicked() method
        // - with this.nameInput and this.dicesSides as parameters
        let createDiceBtn = document.createElement("button");
        createDiceBtn.innerHTML = "create dice";
        createDiceBtn.addEventListener("click", () => {
            if (this.diceSides.length >= 2 && this.nameInput.value.length >= 1 && this.nameInput.value.length <= 4 ) {
                this.controller.onCreateDiceClicked(this.nameInput.value, this.diceSides);
                this.clear();
            }
        });
        // - add the buttons to the button container
        btnContainer.append(addSideBtn);
        btnContainer.append(createDiceBtn);
        // add the relevant UI elements to this for future referece
        this.nameInput = nameInput;
        this.sideOutput = sideOutput;
        this.sideInput = sideInput;
        this.addSideBtn = addSideBtn;
        this.createDiceBtn = createDiceBtn;
        // add the created HTML-Elements to the view's container
        this.root.append(label);
        this.root.append(nameInput);
        this.root.append(sideOutput);
        this.root.append(sideInput);
        this.root.append(btnContainer);
        this.hide();
        this.controller = controller;
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