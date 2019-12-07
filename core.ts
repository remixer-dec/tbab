import {Loader} from './loader.js'
import {Game} from './game.js'

Loader.init().then(x=>{
    Game.start()
})

