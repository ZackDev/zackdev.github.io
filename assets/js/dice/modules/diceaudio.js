export { DiceAudio }

class DiceAudio {
    constructor() {
        this.audioObjects = new Map()
    }
    registerAudio(type, url) {
        let audio = new Audio(url)
        audio.addEventListener("canplaythrough", () => {
            let audioTypeArray = new Array(audio)
            if (this.audioObjects.has(type)) {
                let registeredAudioTypes = this.audioObjects.get(type)
                if (!registeredAudioTypes.includes(audio)){
                    audioTypeArray.push(...registeredAudioTypes)
                }
            }
            this.audioObjects.set(type, audioTypeArray)
        });
    }
    playAudio(type) {
        if (this.audioObjects.has(type)) {
            let sounds = this.audioObjects.get(type)
            let l = sounds.length - 1
            let audio = sounds[Math.round(Math.random() * l)].cloneNode()
            audio.addEventListener("ended", () => {
                audio.remove()
            })
            audio.play()            
        }
    }
}