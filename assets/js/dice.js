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
        this.diceModels.set(name, eyes);
        this.controller.onAvailableDiceAdded(name);
    }
    createDice(name) {
        return new Dice(name, this.diceModels.get(name));
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

class AvailableDicesView {
    constructor(controller) {
        let root = document.createElement("div");
        root.id = "available_dices";
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
        newDice.addEventListener("click", ()=> {

        });
        this.root.append(newDice);
    }
    onDiceAdded(name) {
        let dice = document.createElement("div");
        dice.classList.add("dice");
        dice.classList.add("clickable");
        dice.innerText = name;
        dice.addEventListener("click", () => {
            this.controller.onAvailableDiceClicked(name);
        });
        this.root.append(dice);
        this.dices.set(name, dice);
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
        controller.onInitTableViewComplete(this);
    }
    addTableIcon() {
        let table = document.createElement("img");
        table.classList.add("icon");
        table.classList.add("clickable");
        table.src = "/assets/img/icons/table.svg";
        table.id = "table-icon";
        table.addEventListener("click", ()=> {
            this.clearTable();
        });
        this.root.append(table);
    }
    onDiceRolled(UID, name, result) {
        let dice = document.createElement("div");
        dice.classList.add("dice");
        dice.classList.add("rolled");
        dice.innerHTML = name;
        dice.innerHTML += '<br>'
        dice.innerHTML += result;
        this.dices.set(UID, dice);
        this.root.append(dice);
    }
    clearTable() {
        for (let UID of this.dices.keys()) {
            let dice = this.dices.get(UID);
            dice.remove();
        }
    }
}

class DiceController {
    constructor() {
        new AvailableDicesView(this);
        new BucketView(this);
        new TableView(this);
        this.diceProvider = new DiceProvider(this);
        this.bucket = new Bucket(this);
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
    onAvailableDiceAdded(name) {
        this.availableDicesView.onDiceAdded(name);
    }
    onAvailableDiceClicked(name) {
        let dice = this.diceProvider.createDice(name);
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
        this.bucketView.onDiceRemoved(dice.UID);
    }
}

new Init(init_dice);
