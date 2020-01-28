export abstract class Animator {
    public static barAnimations: [[number, object, string]] = <any>[]
    public static animateBar(start: number, end: number, obj: any, prop: string) {
        for (let a of this.barAnimations) {
            if (obj == a[1] && prop == a[2]) {
                clearInterval(a[0])
                start = obj[prop]
                this.barAnimations.splice(this.barAnimations.indexOf(a), 1)
                //oh really, you can do that in loop? looks like you can!
            }
        }

        let sign = start > end ? -1 : 1
        let diff = Math.abs(start - end)
        let add = sign * (diff / 100)
        let a = setInterval(
            () => {
                if (obj[prop] === end || (sign == 1 && end < obj[prop]) || (sign == -1 && end > obj[prop])) {
                    obj[prop] = end
                    clearInterval(a)
                    return
                }
                obj[prop] = <number>obj[prop] + add
            },
            sign > 0 ? 3 : 1
        )
        this.barAnimations.push([a, obj, prop])
    }
    public static appear(t: Texture, speed: number) {
        let a = setInterval(() => {
            if (t.mod && t.mod.opacity) {
                t.mod.opacity += speed
                if (t.mod.opacity >= 1) {
                    t.mod.opacity = 1
                    clearInterval(a)
                }
            }
        }, 10)
    }
    public static animatePlayerSwordAttack(t: Texture, dir: number, h: number) {
        let origX = t.pos.x
        let origY = t.pos.y
        let origR = t.mod && t.mod.rotation ? t.mod.rotation : 0
        let acc = 0.1
        let fade = 0.001
        let zframes = 0
        let a = setInterval(() => {
            zframes++
            if (zframes < 60) {
                fade += 0.02
                if (t.mod) t.mod.opacity = fade
                return
            }
            if (zframes < 75 - h) {
                t.pos.y -= (1 + Math.sin(acc)) * 20 * dir
                t.pos.x -= Math.sin(acc) * 20 * dir
            } else {
                if (acc > 2.5) {
                    acc = 0.4
                }
                if (t.mod && t.mod.targetRotation && t.mod.rotation !== undefined && t.mod.rotation < t.mod.targetRotation) {
                    t.mod.rotation += (1 + Math.sin(acc)) * 6
                    t.pos.x += (1 + Math.sin(acc)) * 10 * dir
                }
                if (t.mod) {
                    fade -= 0.1
                    if (fade < 0) {
                        fade = 0.001
                        clearInterval(a)
                        t.pos.y = origY
                        t.pos.x = origX
                        t.mod.rotation = origR
                    }
                    t.mod.opacity = fade
                }
            }
            acc += 0.01
        }, 10)
    }
    public static animateTextAppearDisappear(t: TextAsset, dir: number) {
        let zframes = 0
        let opi = 0
        let offi = 0
        let a = setInterval(() => {
            if (!t.mod) return clearInterval(a)
            if (zframes > 60 && zframes < 80) {
                opi += 0.05
                t.mod.opacity += t.mod.opacity < 1 ? opi : 0
            } else if (zframes > 80) {
                t.mod.opacity -= t.mod.opacity > 0.01 ? 0.01 : 0
                offi += 0.005
            }
            t.mod.offsetY += offi * dir
            if (zframes > 180) {
                clearInterval(a)
                t.mod.opacity = 0
                t.mod.offsetY = 0
                t.text = ''
            }
            zframes++
        }, 10)
    }
}
