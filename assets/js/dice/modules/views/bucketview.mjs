import { changeClickableState, ViewPort } from '/assets/js/ui-tools.mjs';

export { BucketView };

/**
 * a class presenting the dices' bucket to the user
 */
class BucketView {

    /**
     * creates a new DiceController object
     * @param {DiceController} controller for notifying the controller about the user's interaction with the view
     * @param {String} appendToID the ID of the HTML-Element to append to
     */
    constructor(controller, appendToID) {
        this.viewPort = new ViewPort(appendToID);
        // create the container of the view
        let root = document.createElement("div");
        root.id = "bucket-container";
        root.classList.add("flex-row", "not-selectable");
        this.viewPort.append(root);
        this.root = root;
        // tracks the state of the bucket/roll button
        this.bucketButtonActive = false;
        // holds the UIDs of the bucket's dices
        // - used to adjust the bucket button's state
        this.dices = [];
        this.controller = controller;
        this.addBucketBtn();
        this.controller.bucketView = this;
    }

    /**
     * adds the bucket button to the view
     */
    addBucketBtn() {
        let bucketBtn = document.createElement("img");
        bucketBtn.classList.add("icon");
        bucketBtn.src = "/assets/icons/bucket.svg";
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
        if (this.dices.length > 0 && this.bucketBtnActive === false) {
            this.setBucketButtonState("active");
        }
        // inactivate the button if
        // - the number of dices is zero
        // - and the button is active
        else if (this.dices.length === 0 && this.bucketBtnActive === true) {
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
                changeClickableState(this.bucketBtn, state);
                this.bucketBtnActive = true;
                break;
            case "inactive":
                this.bucketBtn.removeEventListener("click", this.onRollClickedEventHandler);
                changeClickableState(this.bucketBtn, state);
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
        dice.classList.add("dice", "clickable");
        dice.id = UID;
        let shortName = name;
        if (name.length > 4) {
            shortName = name.substring(0, 3) + '.';
        }
        dice.innerHTML = shortName;
        dice.title = name;
        dice.addEventListener("click", () => {
            // clickhandler for removing the dice from the bucket
            this.controller.removeDiceFromBucket(UID);
        });
        this.root.append(dice);
        this.dices.push(UID);
        this.adaptBucketBtnState();
    }

    /**
     * removes a dice from  the view
     * @param {number} UID the UID of the dice to remove 
     */
    removeDice(UID) {
        let dice = document.getElementById(UID);
        let i = this.dices.indexOf(UID);
        if (i > -1 && dice !== null) {
            this.dices.splice(i, 1);
            dice.remove();
            this.adaptBucketBtnState();
        }
    }
}
