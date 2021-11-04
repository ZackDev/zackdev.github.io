export { DiceAudio }

class DiceAudio {
    constructor() {
        this.audioObjects = new Map();
    }
    registerAudio(name, url) {
        let audio = new Audio(url);
        audio.addEventListener("canplaythrough", () => {
            this.audioObjects.set(name, audio);
        });
    }
    playAudio(name) {
        let audio = this.audioObjects.get(name);
        if (audio) {
            audio.play();
        }
    }
}