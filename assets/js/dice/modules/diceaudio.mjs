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
                let registered = false
                for (let a of typeAudios) {
                    if (a.src === audio.src) {
                        registered = true
                        break
                    }
                }
                if (!registered) {
                    typeAudios.push(audio)
                    this.audioObjects.set(type, typeAudios)
                }
                else {
                    console.log("audio and type combination already registered.", audio.src, type)
                }
            }
            else {
                this.audioObjects.set(type, new Array(audio))
            }
        });
    }
    playAudio(type) {
        if (this.audioObjects.has(type)) {
            let typeAudios = this.audioObjects.get(type)
            let l = typeAudios.length - 1
            let audio = typeAudios[Math.round(Math.random() * l)].cloneNode()
            audio.addEventListener("ended", () => {
                audio.remove()
            })
            audio.play()
        }
        else {
            console.log("no audio registered for type:", type)
        }
    }
}