export abstract class Fullscreen {
    public static isFullscreen(): boolean {
        let d = <any>document
        return d.webkitIsFullScreen || d.mozFullScreen || d.msFullscreenElement !== undefined
    }
    public static requestFullscreen(e: any) {
        e.requestFullscreen
            ? e.requestFullscreen()
            : e.mozRequestFullScreen
            ? e.mozRequestFullScreen()
            : e.webkitRequestFullScreen
            ? e.webkitRequestFullScreen()
            : e.msRequestFullscreen()
    }
    public static exitFullscreen() {
        let e = <any>document
        e.exitFullscreen ? e.exitFullscreen() : e.mozCancelFullScreen ? e.mozCancelFullScreen() : e.webkitExitFullscreen ? e.webkitExitFullscreen() : e.msExitFullscreen()
    }
    public static fullscreen() {
        let el = <any>document.getElementById('cvs')
        this.isFullscreen() ? this.exitFullscreen() : this.requestFullscreen(el)
    }
}
