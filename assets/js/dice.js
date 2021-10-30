const init_dice = () => {
    new DiceController();
}

/**
 * creates random UIDs
 */
const UIDRandomProvider = {
    // stores generated UIDs
    used: [],
    /**
     * 
     * @returns a random Integer
     */
    getUID() {
        // - creates a random Integer by multiplying Date.now() with Math.random()
        // and rounding the result
        let uid = Math.round(Date.now() * Math.random());
        // - adds the result to the UIDs already taken and returns it
        if (this.used.indexOf(uid) < 0) {
            
            this.used.push(uid);
            return uid;
        }
        // - calls itself again if the result is already in the array of used UIDs
        else {
            return this.getUID();
        }
    }
}

/**
 * a class representing a dice
 */
class Dice {
    /**
     * creates a dice object
     * @param {string} name the name of the dice, e.g. D5
     * @param {Array<string>} sides the sides of the dice
     */
    constructor(name, sides) {
        this.name = name;
        this.sides = sides;
        // a placeholder for the result of roll()
        this.result = undefined;
        // a UID for distinguishing a dice
        this.UID = UIDRandomProvider.getUID();
    }
    /**
     * picks one of the given sides as result and sets it to this.result
     */
    roll() {
        this.result = this.sides[Math.ceil(Math.random() * this.sides.length) -1];
    }
}

/**
 * a class for providing different type of dices, creates concrete Dice objects from a DiceModel
 */
class DiceProvider {
    /**
     * creates a DiceProvider object
     * @param {DiceController} controller for notifying changes made to the DiceProvider
     */
    constructor(controller) {
        this.controller = controller;
        // map for retrieving dice models identified by UID
        this.diceModels = new Map();
        this.addDiceModel("D2", [1, 2]);
        this.addDiceModel("D3", [1, 2, 3]);
        this.addDiceModel("D6", [1, 2, 3, 4, 5, 6]);
        let D10 = [];
        for (let i=1; i<= 10; i++) {
            D10.push(i);
        }
        this.addDiceModel("D10", D10);
        let D100 = [];
        for (let i=1; i<=100; i++) {
            D100.push(i);
        }
        this.addDiceModel("D100", D100);
    }
    /**
     * adds a dice model to the DiceProvider
     * @param {string} name the name of the dice model
     * @param {array<string>} sides the sides of the dice model
     */
    addDiceModel(name, sides) {
        // UID for identifying the dice model
        let UID = UIDRandomProvider.getUID();
        this.diceModels.set(UID, [name, sides]);
        this.controller.onDiceModelAdded(UID, name);
    }
    /**
     * removes a dice model from the DiceProvider
     * @param {} UID the UID of the dice model
     */
    removeDiceModel(UID) {
        this.diceModels.delete(UID);
        this.controller.onDiceModelRemoved(UID);
    }
    /**
     * 
     * @param {} UID the UID of the dice model
     * @returns {Dice} a specific dice created from the dice model
     */
    createDice(UID) {
        // - get the dice model from the Map of models
        // - create and return a new dice specified by name and sides
        let diceModel = this.diceModels.get(UID);
        return new Dice(diceModel[0], diceModel[1]);
    }
    changeDiceTypes(type) {
        // placeholder
        switch (type) {
            case "":
                break;
        }
        this.controller.onDiceSetChanged();
    }
}

/**
 * a class representing a bucket where dices can be added, removed and rolled
 */
class Bucket {
    /**
     * creates a Bucket object
     * @param {DiceController} controller for notifying the controller about the bucket's changes
     */
    constructor(controller) {
        this.controller = controller;
        // a map holding dices added to the bucket
        this.dices = new Map();
    }
    /**
     * adds a dice to the bucket
     * notifies the controller which dice has been added
     * @param {Dice} dice the Dice to add
     */
    addDice(dice) {
        this.dices.set(dice.UID, dice);
        this.controller.onDiceAddedToBucket(dice);
    }
    /**
     * removes a dice from the bucket
     * notifies the controller about the removed dice's UID
     * @param {Dice} UID the UID of the dice to remove
     */
    removeDice(UID) {
        this.dices.delete(UID);
        this.controller.onDiceRemovedFromBucket(UID);
    }
    /**
     * calls the roll() method of the dices in the bucket
     * - and removes them from the bucket by calling this.removeDice()
     */
    roll() {
        for (let [UID, dice] of this.dices) {
            dice.roll();
            this.controller.onDiceRolled(dice);
            this.removeDice(UID);
        }
    }
}

/**
 * a class representing the NewDiceView for creating new dice models. contains the view's logic.
 */
class NewDiceView {
    /**
     * creates a NewDiceView object
     * @param {DiceController} controller for notifying the controller about user actions
     */
    constructor(controller) {
        // create the root div containing the view and add it to the DOM
        let root = document.createElement("div");
        root.id = "create-dice-model-container";
        document.getElementById("main_content").append(root);
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
        sideOutput.innerHTML = "sides:";
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
                        this.diceSides.splice(i);
                        side.remove();
                    }
                });
                this.sideOutput.append(side);
                this.diceSides.push(sideValue);
                this.sideInput.value = "";
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
                this.hide();
            }
        });
        // - the 'closeBtn', for hiding this view
        let closeBtn = document.createElement("button");
        closeBtn.innerHTML = "close";
        closeBtn.addEventListener("click", () => {
            this.hide();
        });
        // - add the buttons to the button container
        btnContainer.append(addSideBtn);
        btnContainer.append(createDiceBtn);
        btnContainer.append(closeBtn);
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
        this.sideOutput.innerHTML = "sides:";
        this.sideInput.value = "";
        this.diceSides = [];
    }
    /**
     * hides the view by setting the containers opacity to zero
     */
    hide() {
        this.root.style.opacity = 0;
    }
    /**
     * shows the view by setting the containers opacity to one
     */
    show() {
        this.root.style.opacity = 1;
    }
}

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
        // a Map <UID, HTML-Element> for accessing the HTML elements
        this.dices = new Map();
        this.controller = controller;
    }
    /**
     * adds the 'new dice model' button to the view 
     */
    addNewDiceModelBtn() {
        let newDiceModelBtn = document.createElement("img");
        newDiceModelBtn.classList.add("icon");
        newDiceModelBtn.classList.add("clickable");
        newDiceModelBtn.src = "/assets/img/icons/newdice.svg";
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
    displayDice(UID, name) {
        let dice = document.createElement("div");
        dice.classList.add("dice");
        dice.classList.add("clickable");
        dice.innerText = name;
        dice.addEventListener("click", () => {
            this.controller.onDiceModelClicked(UID);
        });
        this.root.append(dice);
        this.dices.set(UID, dice);
    }
}

/**
 * a class presenting the dices' bucket to the user
 */
class BucketView {
    /**
     * creates a new DiceController object
     * @param {DiceController} controller for notifying the controller about the user's interaction with the view
     */
    constructor(controller) {
        // create the container of the view
        let root = document.createElement("div");
        root.id = "bucket-container";
        document.getElementById("main_content").append(root);
        this.root = root;
        // tracks the state of the bucket/roll button
        this.bucketButtonActive = false;
        // holds the HTML dice elements Map<UID, dice>
        this.dices = new Map();
        this.controller = controller;
        this.addBucketBtn();
    }
    /**
     * adds the bucket button to the view
     */
    addBucketBtn() {
        let bucketBtn = document.createElement("img");
        bucketBtn.classList.add("icon");
        bucketBtn.src = "/assets/img/icons/bucket.svg";
        bucketBtn.id = "bucket-icon";
        this.bucketBtn = bucketBtn;
        this.bucketBtnActive = false;
        this.adaptBucketBtnState();
        this.root.append(bucketBtn);
    }
    /**
    * checks the bucket button's state in relation to the size of the bucket
    */
    adaptBucketBtnState() {
        // activate the button if
        // - the number of dices is greater than zero
        // - and the button is inactive
        if (this.dices.size > 0 && this.bucketBtnActive === false) {
            this.setBucketButtonState("active");
        }
        // inactivate the button if
        // - the number of dices is zero
        // - and the button is active
        else if (this.dices.size === 0 && this.bucketBtnActive === true) {
            this.setBucketButtonState("inactive");
        }
    }
    /**
     * changes the buttons html properties and eventhandler
     * @param {string} state the state to set the button to ("active"|"inactive")
     */
    setBucketButtonState(state) {
        switch (state) {
            case "active":
                this.bucketBtn.addEventListener("click", this.onRollClickedEventHandler);
                this.bucketBtn.classList.add("clickable");
                this.bucketBtnActive = true;
                break;
            case "inactive":
                this.bucketBtn.removeEventListener("click", this.onRollClickedEventHandler);
                this.bucketBtn.classList.remove("clickable");
                this.bucketBtnActive = false;
                break;
        }
    }
    /**
     * notifies the controller that the roll-button has been clicked
     */
    onRollClickedEventHandler = () => {
        this.controller.onRollClicked();
    }
    /**
     * adds a dice to the view
     * @param {number} UID the UID of the dice
     * @param {string} name the name of the dice
     */
    displayDice(UID, name) {
        let dice = document.createElement("div");
        dice.classList.add("dice");
        dice.classList.add("clickable");
        dice.innerText = name;
        dice.addEventListener("click", () => {
            // clickhandler for removing the dice from the bucket
            this.controller.removeDiceFromBucket(UID);
        });
        this.root.append(dice);
        this.dices.set(UID, dice);
        this.adaptBucketBtnState();
    }
    /**
     * removes a dice from  the view
     * @param {number} UID the UID of the dice to remove 
     */
    removeDice(UID) {
        let dice = this.dices.get(UID);
        dice.remove();
        this.dices.delete(UID);
        this.adaptBucketBtnState();
    }
}

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
        document.getElementById("main_content").append(root);
        this.root = root;
        this.dices = new Map();
        this.controller = controller;
        this.addTableBtn();
    }
    /**
     * adds the table button to the table
     */
    addTableBtn() {
        let tableBtn = document.createElement("img");
        tableBtn.classList.add("icon");
        tableBtn.src = "/assets/img/icons/table.svg";
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
        if (this.dices.size > 0 && this.tableBtnActive === false) {
            this.setTableButtonState("active");
        }
        else if (this.dices.size === 0 && this.tableBtnActive === true) {
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
        dice.innerHTML = `${name}<br>${result}`;
        this.dices.set(UID, dice);
        this.root.append(dice);
        this.adaptTableBtnState();
    }
    /**
     * removes a dice from the view
     * @param {number} UID the dice's UID
     */
    removeDice(UID) {
        let dice = this.dices.get(UID);
        dice.remove();
        this.dices.delete(UID);
        this.adaptTableBtnState();
    }
    /**
     * removes all dices from the view
     */
    clearTable = () => {
        for (let UID of this.dices.keys()) {
            this.removeDice(UID);
        }
    }
}

/**
 * acts as layer between the views and the dice logic
 */
class DiceController {
    constructor() {
        this.diceModelsView = new DiceModelsView(this);
        this.bucketView = new BucketView(this);
        this.tableView = new TableView(this);
        this.newDiceView = new NewDiceView(this);
        this.diceProvider = new DiceProvider(this);
        this.bucket = new Bucket(this);
    }
    onAddNewDiceModelClicked() {
        this.newDiceView.show();
    }
    onDiceModelClicked(UID) {
        let dice = this.diceProvider.createDice(UID);
        this.bucket.addDice(dice);
    }
    onCreateDiceClicked(name, sides) {
        this.diceProvider.addDiceModel(name, sides);
    }
    onDiceModelAdded(UID, name) {
        this.diceModelsView.displayDice(UID, name);
    }
    removeDiceFromBucket(UID) {
        this.bucket.removeDice(UID);
    }
    onDiceAddedToBucket(dice) {
        this.bucketView.displayDice(dice.UID, dice.name);
    }
    onDiceRemovedFromBucket(UID) {
        this.bucketView.removeDice(UID);
    }
    onRollClicked() {
        this.bucket.roll();
    }
    onDiceRolled(dice) {
        this.tableView.displayDice(dice.UID, dice.name, dice.result);
    }
}

new Init(init_dice);
