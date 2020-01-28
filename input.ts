export abstract class Input {
    public static mouse: Coords = {x: 0, y: 0}
    public static escPressed: boolean = false
    public static clickEvents: CustomClickEvent[] = []
    public static init(cvs: HTMLCanvasElement) {
        let rect = cvs.getBoundingClientRect()
        cvs.addEventListener('mousemove', (e: MouseEvent): void => {
            this.mouse.x = e.clientX - rect.left
            this.mouse.y = e.clientY - rect.top
            //            console.log(this.mouse)
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
