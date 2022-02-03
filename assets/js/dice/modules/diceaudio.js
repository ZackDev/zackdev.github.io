export { DiceAudio }

class DiceAudio {
    constructor() {
        this.audioObjects = new Map()
    }
    registerAudio(type, url) {
        let audio = new Audio(url)
        audio.addEventListener("canplaythrough", () => {
            if (this.audioObjects.has(type)) {
                let typeAudios = this.audioObjects.get(type)
                if (!typeAudios.includes(audio)){
                    typeAudios.push(audio)
                    this.audioObjects.set(type, typeAudios)
                }
            }
            else {
                this.audioObjects.set(type, new Array(audio))
            }
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