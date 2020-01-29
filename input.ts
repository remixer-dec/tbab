import {Fullscreen} from './fullscreen.js'
export abstract class Input {
    public static mouse: Coords = {x: 0, y: 0}
    public static escPressed: boolean = false
    public static clickEvents: CustomClickEvent[] = []
    public static init(cvs: HTMLCanvasElement) {
        cvs.addEventListener('mousemove', (e: MouseEvent): void => {
            let rect = cvs.getBoundingClientRect()
            this.mouse.x = e.clientX - rect.left
            this.mouse.y = e.clientY - rect.top
            let realw = rect.width
            let realh = rect.height

            if (Fullscreen.isFullscreen()) {
                if (rect.width / rect.height > 1.778) {
                    //for screens with non 16:9 ratio (wider)
                    realw = rect.height * 1.778
                    let offsetLeft = (rect.width - realw) / 2
                    this.mouse.x -= offsetLeft
                }
            }
            if (realw != 1280) {
                let prcX = 1 / (realw / 1280)
                let prcY = 1 / (realh / 720)
                this.mouse.x = Math.round(this.mouse.x * prcX)
                this.mouse.y = Math.round(this.mouse.y * prcY)
            }
        })
        cvs.addEventListener('click', (e: MouseEvent): void => {
            this.handleClicks()
        })

        window.addEventListener('keydown', (e: KeyboardEvent): void => {
            if (e.code == 'Escape') {
                this.escPressed = !this.escPressed
            }
        })
    }
    public static handleClicks() {
        for (let click of this.clickEvents) {
            if (this.mouse.x > click.s.x && this.mouse.y > click.s.y && this.mouse.x < click.e.x && this.mouse.y < click.e.y) {
                click.callback()
            }
        }
    }
}
