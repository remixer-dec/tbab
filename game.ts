import {Renderer} from './renderer.js'
import {View} from './view.js';
import {menuState} from './enums.js'
export abstract class Game{
    public static currentState:number
    public static start(){
        View.changeState(menuState.MainMenu)
        Renderer.drawLoop();
    }   
}