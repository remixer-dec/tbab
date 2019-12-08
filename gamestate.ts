import {gameType,turn} from './enums'
import {Player} from './player.js'
export abstract class GameState{
    public static matchtype:gameType
    public static player:Player 
    public static opponent:Player 
    public static matchturn:turn
    public static running:boolean
    public static result:string
}