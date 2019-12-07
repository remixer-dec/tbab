import {View} from './view.js';

export abstract class Loader{
    public static async init(){
        return Promise.all([
            this.loadTextures()
        ])
    }
    public static async loadTextures(){
        let picArray = await fetch('./meta/textures.json').then(r=>r.json()).then(x=>x)
        return View.loadPics(picArray)
    }
}
