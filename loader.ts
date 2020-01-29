import {View,locale} from './view.js'

export abstract class Loader {
    public static async init() {
        let warn = <any>document.getElementById("warning")
        warn.innerHTML = locale.ROTATE
        return Promise.all([this.loadTextures().then(x=>this.loadData())])
    }
    public static async loadTextures() {
        let picArray = await fetch('./meta/textures.json')
            .then(r => r.json())
            .then(x => x)
        return View.loadPics(picArray)
    }
    public static async loadData(){
        View.initialize()
    }
}
