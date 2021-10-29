const init_dice = () => {
    new DiceController();
}

const UIDRandomProvider = {
    used: [],
    getUID() {
        let uid = Math.round(Date.now() * Math.random());
        if (this.used.indexOf(uid) < 0) {
            this.used.push(uid);
            return uid;
        }
        else {
            return this.getUID();
        }
    }
}

class Dice {
    constructor(name, eyes) {
        this.name = name;
        this.eyes = eyes;
        this.result = undefined;
        this.UID = UIDRandomProvider.getUID();
    }
    roll() {
        this.result = this.eyes[Math.ceil(Math.random() * this.eyes.length) -1];
    }
}

class DiceProvider {
    constructor(controller) {
        this.controller = controller;
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
    addDiceModel(name, eyes) {
        let UID = UIDRandomProvider.getUID();
        this.diceModels.set(UID, [name, eyes]);
        this.controller.onDiceModelAdded(UID, name);
    }
    removeDiceModel(UID) {
        this.diceModels.delete(UID);
        this.controller.onDiceModelRemoved(UID);
    }
    createDice(UID) {
        let diceModel = this.diceModels.get(UID);
        return new Dice(diceModel[0], diceModel[1]);
    }
    changeDiceTypes(type) {
        switch (type) {
            case "":
                break;
        }
        this.controller.onDiceSetChanged();
    }
}

class Bucket {
    constructor(controller) {
        this.controller = controller;
        this.dices = new Map();
    }
    addDice(dice) {
        this.dices.set(dice.UID, dice);
        this.controller.onDiceAddedToBucket(dice);
    }
    removeDice(UID) {
        this.dices.delete(UID);
        this.controller.onDiceRemovedFromBucket(UID);
    }
    roll() {
        for (let [UID, dice] of this.dices) {
            dice.roll();
            this.controller.onDiceRolled(dice);
            this.removeDice(UID);
        }
    }
}

class NewDiceView {
    constructor(controller) {
        let root = document.createElement("div");
        root.id = "new-dice";
        document.getElementById("main_content").append(root);
        this.root = root;
        this.diceName = "";
        this.diceEyes = [];
        let label = document.createElement("div");
        label.innerHTML = "create a new type of dice."
        let nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.placeholder = "add a name here."
        nameInput.minLength = 1;
        nameInput.maxLength = 4;
        let eyeOutput = document.createElement("div");
        eyeOutput.id = "eyes-container";
        eyeOutput.innerHTML = "eyes:";
        let eyeInput = document.createElement("input");
        eyeInput.type = "text";
        eyeInput.placeholder = "add eye here."
        eyeInput.minLength = 1;
        eyeInput.maxLength = 4;
        let btnContainer = document.createElement("div");
        btnContainer.id = "btn-container";
        let addEyeBtn = document.createElement("button");
        addEyeBtn.innerHTML = "add eye";
        addEyeBtn.addEventListener("click", () => {
            let eyeValue = this.eyeInput.value;
            if (eyeValue.length >= 1 && eyeValue.length <= 4) {
                let eye = document.createElement("div");
                eye.classList.add("dice");
                eye.classList.add("clickable");
                eye.innerText = eyeValue;
                eye.addEventListener("click", () => {
                    let i = this.diceEyes.indexOf(eyeValue);
                    if (i > -1) {
                        this.diceEyes.splice(i);
                        eye.remove();
                    }
                });
                this.eyeOutput.append(eye);
                this.diceEyes.push(eyeValue);
                this.eyeInput.value = "";
            } 
        });
        let createDiceBtn = document.createElement("button");
        createDiceBtn.innerHTML = "create dice";
        createDiceBtn.addEventListener("click", () => {
            if (this.diceEyes.length >= 2 && this.nameInput.value.length >= 1 && this.nameInput.value.length <= 4 ) {
                this.controller.onCreateDiceClicked(this.nameInput.value, this.diceEyes);
                this.clear();
                this.hide();
            }
        });
        let closeBtn = document.createElement("button");
        closeBtn.innerHTML = "close";
        closeBtn.addEventListener("click", () => {
            this.hide();
        });
        btnContainer.append(addEyeBtn);
        btnContainer.append(createDiceBtn);
        btnContainer.append(closeBtn);
        this.nameInput = nameInput;
        this.eyeOutput = eyeOutput;
        this.eyeInput = eyeInput;
        this.addEyeBtn = addEyeBtn;
        this.createDiceBtn = createDiceBtn;
        this.root.append(label);
        this.root.append(nameInput);
        this.root.append(eyeOutput);
        this.root.append(eyeInput);
        this.root.append(btnContainer);
        this.hide();
        this.controller = controller;
        this.controller.onInitNewDiceViewComplete(this);
    }
    clear() {
        this.nameInput.value = "";
        this.eyeOutput.innerHTML = "eyes:";
        this.eyeInput.value = "";
        this.diceEyes = [];
    }
    hide() {
        this.root.style.opacity = 0;
    }
    show() {
        this.root.style.opacity = 1;
    }
}

class AvailableDicesView {
    constructor(controller) {
        let root = document.createElement("div");
        root.id = "available-dices";
        document.getElementById("main_content").append(root);
        this.root = root;
        this.addNewDiceIcon();
        this.dices = new Map();
        this.controller = controller;
        this.controller.onInitAvailableDicesViewComplete(this);
    }
    addNewDiceIcon() {
        let newDice = document.createElement("img");
        newDice.classList.add("icon");
        newDice.classList.add("clickable");
        newDice.src = "/assets/img/icons/newdice.svg";
        newDice.id = "newdice-icon";
        newDice.addEventListener("click", () => {
            this.controller.onAddNewDiceClicked();
        });
        this.root.append(newDice);
    }
    onDiceAdded(UID, name) {
        let dice = document.createElement("div");
        dice.classList.add("dice");
        dice.classList.add("clickable");
        dice.innerText = name;
        dice.addEventListener("click", () => {
            this.controller.onAvailableDiceClicked(UID);
        });
        this.root.append(dice);
        this.dices.set(UID, dice);
    }
}

class BucketView {
    constructor(controller) {
        let root = document.createElement("div");
        root.id = "bucket";
        document.getElementById("main_content").append(root);
        this.root = root;
        this.addBucketIcon();
        this.dices = new Map();
        this.controller = controller;
        this.controller.onInitRollDicesViewComplete(this);
    }
    addBucketIcon() {
        let bucket = document.createElement("img");
        bucket.classList.add("icon");
        bucket.classList.add("clickable");
        bucket.src = "/assets/img/icons/bucket.svg";
        bucket.id = "bucket-icon";
        bucket.addEventListener("click", () => {
            this.controller.onRollClicked();
        });
        this.root.append(bucket);
    }
    onDiceAdded(UID, name) {
        let dice = document.createElement("div");
        dice.classList.add("dice");
        dice.classList.add("clickable");
        dice.innerText = name;
        dice.addEventListener("click", () => {
            this.controller.removeDiceFromBucket(UID);
        });
        this.root.append(dice);
        this.dices.set(UID, dice);
    }
    onDiceRemoved(UID) {
        let dice = this.dices.get(UID);
        dice.remove();
    }
}

class TableView {
    constructor(controller) {
        let root = document.createElement("div");
        root.id = "table";
        document.getElementById("main_content").append(root);
        this.root = root;
        this.addTableIcon();
        this.dices = new Map();
        this.controller = controller;
        this.controller.onInitTableViewComplete(this);
    }
    addTableIcon() {
        let table = document.createElement("img");
        table.classList.add("icon");
        table.classList.add("clickable");
        table.src = "/assets/img/icons/table.svg";
        table.id = "table-icon";
        table.addEventListener("click", () => {
            this.clearTable();
        });
        this.root.append(table);
    }
    onDiceRolled(UID, name, result) {
        let dice = document.createElement("div");
        dice.classList.add("dice");
        dice.classList.add("rolled");
        dice.innerHTML = `${name}<br>${result}`;
        this.dices.set(UID, dice);
        this.root.append(dice);
    }
    clearTable() {
        for (let UID of this.dices.keys()) {
            let dice = this.dices.get(UID);
            dice.remove();
            this.dices.delete(UID);
        }
    }
}

class DiceController {
    constructor() {
        new AvailableDicesView(this);
        new BucketView(this);
        new TableView(this);
        new NewDiceView(this);
        this.diceProvider = new DiceProvider(this);
        this.bucket = new Bucket(this);
    }
    onInitNewDiceViewComplete(view) {
        this.newDiceView = view;
    }
    onInitAvailableDicesViewComplete(view) {
        this.availableDicesView = view;
    }
    onInitRollDicesViewComplete(view) {
        this.bucketView = view;
    }
    onInitTableViewComplete(view) {
        this.tableView = view;
    }
    onAddNewDiceClicked() {
        this.newDiceView.show();
    }
    onCreateDiceClicked(name, eyes) {
        this.diceProvider.addDiceModel(name, eyes);
    }
    onDiceModelAdded(UID, name) {
        this.availableDicesView.onDiceAdded(UID, name);
    }
    onAvailableDiceClicked(UID) {
        let dice = this.diceProvider.createDice(UID);
        this.bucket.addDice(dice);
    }
    removeDiceFromBucket(UID) {
        this.bucket.removeDice(UID);
    }
    onDiceAddedToBucket(dice) {
        this.bucketView.onDiceAdded(dice.UID, dice.name);
    }
    onDiceRemovedFromBucket(UID) {
        this.bucketView.onDiceRemoved(UID);
    }
    onRollClicked() {
        this.bucket.roll();
    }
    onDiceRolled(dice) {
        this.tableView.onDiceRolled(dice.UID, dice.name, dice.result);
    }
}

new Init(init_dice);
