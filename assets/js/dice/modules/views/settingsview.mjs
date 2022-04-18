import { ViewPort } from '/assets/js/viewport.mjs';

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
        let muteBtn = document.createElement("img");
        muteBtn.classList.add("icon-small", "clickable");
        muteBtn.addEventListener("click", () => {
            this.isAudioMuted = !this.isAudioMuted;
            this.adaptMuteBtn();
        });
        this.muteBtn = muteBtn;
        this.adaptMuteBtn();
        this.root.append(muteBtn);

        this.controller.settingsView = this;
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