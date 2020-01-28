import {Input} from './input.js'
function $(x: string): any {
    return document.getElementById(x)
}
export abstract class Renderer {
    public static ctx = $('cvs').getContext('2d')
    public static draw(pic: ViewPic, x: number, y: number, mod?: any) {
        if (mod && mod.opacity >= 0) {
            this.ctx.globalAlpha = mod.opacity
        }
        if (mod && mod.rotation) {
            this.ctx.save()
            this.ctx.translate(x + pic.w / 2, y + pic.h / 2)
            this.ctx.rotate((mod.rotation * Math.PI) / 180.0)
            this.ctx.translate(-x - pic.w / 2, -y - pic.h / 2)
            this.ctx.drawImage(pic.img, x, y)
            this.ctx.restore()
        } else {
            this.ctx.drawImage(pic.img, x, y)
        }
        this.ctx.globalAlpha = 1
    }
    private static drawText(t: string, coords: Coords, fontSize: number, color: Color, mod?: any) {
        this.ctx.font = fontSize + 'px Kelly Slab'
        this.ctx.fillStyle = color
        this.ctx.textAlign = 'center'
        let targetX = coords.x + (mod && mod.offsetX ? mod.offsetX : 0)
        let targetY = coords.y + (mod && mod.offsetY ? mod.offsetY : 0)
        if (mod && mod.opacity >= 0) {
            this.ctx.globalAlpha = mod.opacity
        }
        this.ctx.fillText(t, targetX, targetY)
        this.ctx.globalAlpha = 1
    }
    public static textures: Texture[] = []
    public static texts: TextAsset[] = []
    public static shapes: ShapeAsset[] = []
    private static drawTextures(): void {
        for (let texture of this.textures) {
            if (texture.condition) {
                if (texture.condition()) {
                    this.draw(texture.pic, texture.pos.x, texture.pos.y, texture.mod ? texture.mod : undefined)
                    continue
                } else {
                    continue
                }
            }
            if (!texture.hover) {
                this.draw(texture.pic, texture.pos.x, texture.pos.y)
            } else {
                if (
                    Input.mouse.x > texture.pos.x &&
                    Input.mouse.y > texture.pos.y &&
                    Input.mouse.x < texture.pos.x + texture.pic.w && Input.mouse.y < texture.pos.y + texture.pic.h
                ) {
                    this.draw(texture.pic, texture.pos.x, texture.pos.y)
                }
            }
        }
    }
    public static drawRect(pos: Coords, w: number, h: number, color: Color) {
        this.ctx.fillStyle = color
        this.ctx.fillRect(pos.x, pos.y, w, h)
    }
    private static drawRects() {
        for (let shape of this.shapes) {
            this.drawRect(shape.pos, shape.w(), shape.h, shape.color)
        }
    }
    private static drawTexts(): void {
        for (let text of this.texts) {
            if (text.multiline) {
                let txt: string[] = text.text.split('\n')
                let xy: Coords = Object.assign({}, text.pos)
                for (let i = 0, l = txt.length; i < l; i++) {
                    this.drawText(txt[i], xy, text.size, text.color)
                    xy.y += text.size
                }
            } else {
                if (text.ctext) {
                    this.drawText(text.ctext(), text.pos, text.size, text.color, text.mod)
                } else {
                    this.drawText(text.text, text.pos, text.size, text.color, text.mod)
                }
            }
        }
    }
    public static drawLoop() {
        Renderer.drawTextures()
        Renderer.drawRects()
        Renderer.drawTexts()
        requestAnimationFrame(Renderer.drawLoop)
    }
}
Input.init($('cvs'))
