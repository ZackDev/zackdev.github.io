import { changeClickableState, ViewPort } from '/assets/js/ui-tools.mjs';

export { SettingsView };

class SettingsView {
    constructor(controller, attachToId) {
        this.controller = controller;
        this.viewPort = new ViewPort(attachToId);
        this.isAudioMuted = true;
        let root = document.createElement("div");
        root.id = "dice-ui-settings-container";
        root.classList.add("flex-row");
        this.viewPort.append(root);
        this.root = root;

        this.addMuteBtn();
        this.addNewDiceTypeBtn();
        this.setNewDiceTypeBtnState("inactive");

        this.controller.settingsView = this;
    }

    addMuteBtn() {
        let muteBtn = document.createElement("img");
        muteBtn.classList.add("icon-small", "clickable");
        muteBtn.addEventListener("click", () => {
            this.isAudioMuted = !this.isAudioMuted;
            this.adaptMuteBtn();
        });
        this.muteBtn = muteBtn;
        this.adaptMuteBtn();
        this.root.append(muteBtn);
    }

    addNewDiceTypeBtn() {
        let newDiceTypeBtn = document.createElement("img");
        newDiceTypeBtn.classList.add("icon-small", "clickable");
        newDiceTypeBtn.src = "/assets/icons/newdice.svg";
        newDiceTypeBtn.id = "new-dice-type-icon";
        this.newDiceTypeBtn = newDiceTypeBtn;
        this.root.append(newDiceTypeBtn);
    }

    /**
    * handler for the AddNewDiceTypeClicked Btn
    * - notifies the controller that it has been clicked
    */
    onAddNewDiceTypeClickedHandler = () => {
        this.controller.onAddNewDiceTypeClicked();
    }

    /**
     * sets the AddNewDoceTypeBtn's state
     * @param {string} state - the state to change to ("active"|"inactive")
     */
    setNewDiceTypeBtnState(state) {
        switch (state) {
            case "active":
                changeClickableState(this.newDiceTypeBtn, state);
                this.newDiceTypeBtn.addEventListener("click", this.onAddNewDiceTypeClickedHandler);
                this.newDiceTypeBtn.title = 'new type: enabled';
                break;
            case "inactive":
                changeClickableState(this.newDiceTypeBtn, state);
                this.newDiceTypeBtn.removeEventListener("click", this.onAddNewDiceTypeClickedHandler);
                this.newDiceTypeBtn.title = 'new type: disabled';
                break;
        }
    }

    adaptMuteBtn() {
        if (this.isAudioMuted === true) {
            this.muteBtn.src = "/assets/icons/audio-disabled.svg";
            this.muteBtn.title = "audio: disabled";
        }
        else if (this.isAudioMuted === false) {
            this.muteBtn.src = "/assets/icons/audio-enabled.svg";
            this.muteBtn.title = "audio: enabled";
        }
    }

    getAudioMutedState() {
        return this.isAudioMuted;
    }
}