import {Renderer} from './renderer.js'
import {Input} from './input.js'
import * as Locale from './locale.js'
import {menuState} from './enums.js'

let locale = (true ||window.navigator.languages.includes("RU") || window.navigator.languages.includes("ru-RU")) ? Locale.RUlocale : Locale.ENlocale

export abstract class View {
    public static pics:picList = {}
    public static currentState:menuState = menuState.MainMenu
    public static setDisplayView(){
        
    }
    public static async loadPics(arr:any):Promise<boolean[]>{
        let loaded:Promise<boolean>[] = []
        for(let pic of arr){
            let img:HTMLImageElement = new Image(pic.w,pic.h)
            loaded.push(new Promise((rs,rj)=>{img.onload = _=>rs()}))
            img.src = pic.url;
            this.pics[pic.name] = 
            {
                url: pic.url,
                w: pic.w,
                h: pic.h,
                name: pic.name,
                img: img
            }
        }
        return Promise.all(loaded)
        

    }
    private static validateMenuStateChange(currentState:number,newState:number):boolean{
        switch(currentState){
            case menuState.MainMenu:
                return [menuState.MPLobby,menuState.PlayerSelect,menuState.MainMenu,menuState.Rules].includes(newState)
            break
            case menuState.Rules:
                return [menuState.MainMenu].includes(newState)
            break
            case menuState.PlayerSelect:
                return [menuState.SinglePlayerGame,menuState.MPGame].includes(newState)
            break
            case menuState.SinglePlayerGame:
                return [menuState.GameEnd,menuState.MainMenu].includes(newState)
            break
            case menuState.MPLobby:
                return [menuState.MainMenu,menuState.MPGame].includes(newState)
            break
            case menuState.MPGame:
                return [menuState.GameEnd,menuState.MainMenu].includes(newState)
            break
        }
        return false;
    }
    public static changeState(newState:menuState){
        if(!this.validateMenuStateChange(this.currentState,newState)){
            return
        }
        switch(newState){
            case menuState.MainMenu:
                Renderer.textures = [
                    {pic:View.pics.tbab_main_menu,pos:{x:0,y:0},hover:false},
                    {pic:View.pics.button_main, pos:{x:380,y:200},hover:false},
                    {pic:View.pics.button_main_hover, pos:{x:380,y:200},hover:true},
                    {pic:View.pics.button_main, pos:{x:380,y:320},hover:false},
                    {pic:View.pics.button_main_hover, pos:{x:380,y:320},hover:true},
                    {pic:View.pics.button_main, pos:{x:380,y:440},hover:false},
                    {pic:View.pics.button_main_hover, pos:{x:380,y:440},hover:true}
                ]
                Renderer.texts = [
                    {text:locale.SP,pos:{x:640,y:252},size:30,color:'#5f220a'},
                    {text:locale.MP,pos:{x:640,y:372},size:30,color:'#5f220a'},
                    {text:locale.RULES,pos:{x:640,y:492},size:30,color:'#5f220a'}
                ]
                Input.ClickEvents = [
                    {s:{x:380,y:200},e:{x:380+517,y:200+82},callback:()=>{this.changeState(menuState.PlayerSelect)}},
                    {s:{x:380,y:320},e:{x:380+517,y:320+82},callback:()=>{this.changeState(menuState.MPLobby)}},
                    {s:{x:380,y:440},e:{x:380+517,y:440+82},callback:()=>{this.changeState(menuState.Rules)}}
                ]
            break
            case menuState.Rules:
                Renderer.textures = [
                    {pic:View.pics.mp_menu,pos:{x:0,y:0},hover:false},
                    {pic:View.pics.button_main, pos:{x:30,y:10},hover:false},
                    {pic:View.pics.button_main_hover, pos:{x:30,y:10},hover:true},
                ]
                Renderer.texts = [
                    {text:locale.BACK,pos:{x:293,y:62},size:30,color:'#000'},
                    {text:locale.RULESTEXT,pos:{x:640,y:200},size:30,color:'#000',multiline:true}
                ]
                Input.ClickEvents = [
                    {s:{x:30,y:10},e:{x:547,y:92},callback:()=>{this.changeState(menuState.MainMenu)}}
                ]
            break
            case menuState.MPLobby:
                Renderer.textures = [
                    {pic:View.pics.mp_menu,pos:{x:0,y:0},hover:false},
                    {pic:View.pics.button_main, pos:{x:30,y:10},hover:false},
                    {pic:View.pics.button_main_hover, pos:{x:30,y:10},hover:true},
                    {pic:View.pics.button_main, pos:{x:730,y:10},hover:false},
                    {pic:View.pics.button_main_hover, pos:{x:730,y:10},hover:true}
                ]
                for(let i=0;i<10;i++){ // replace with Servers.count after adding mp part
                    Renderer.textures.push({pic:View.pics.select_server_hover, pos:{x:180,y:150+45*i},hover:true},)
                }
                Renderer.texts = [
                    {text:locale.BACK,pos:{x:293,y:62},size:30,color:'#000'},
                    {text:locale.CREATEROOM,pos:{x:730+258,y:62},size:30,color:'#000'},
                ]
                Input.ClickEvents = [
                    {s:{x:30,y:10},e:{x:547,y:92},callback:()=>{this.changeState(menuState.MainMenu)}}
                ]
            break
            case menuState.PlayerSelect:
                Renderer.textures = [
                    {pic:View.pics.player_select_BLURRED,pos:{x:0,y:0},hover:false},
                ]
                let timer = 60
                let timerobj = {text:''+timer,pos:{x:640,y:385},size:70,color:'#000'}
                Renderer.texts = [
                    timerobj,
                    {text:locale.SELECT,pos:{x:380,y:372},size:40,color:'#000'},
                    {text:locale.HERO,pos:{x:900,y:372},size:40,color:'#000'},
                    {text:locale.HEROES.FROG.NAME,pos:{x:240,y:210},size:26,color:'#000'},
                    {text:locale.HEROES.FROG.POWER,pos:{x:240,y:240},size:18,color:'#000'},
                    {text:locale.HEROES.DOG.NAME,pos:{x:640,y:210},size:26,color:'#000'},
                    {text:locale.HEROES.DOG.POWER,pos:{x:640,y:240},size:18,color:'#000'},
                    {text:locale.HEROES.CAT.NAME,pos:{x:1040,y:210},size:26,color:'#000'},
                    {text:locale.HEROES.CAT.POWER,pos:{x:1040,y:240},size:18,color:'#000'},
                    {text:locale.HEROES.CHICK.NAME,pos:{x:240,y:520},size:26,color:'#000'},
                    {text:locale.HEROES.CHICK.POWER,pos:{x:240,y:490},size:18,color:'#000'},
                    {text:locale.HEROES.FISH.NAME,pos:{x:640,y:520},size:26,color:'#000'},
                    {text:locale.HEROES.FISH.POWER,pos:{x:640,y:490},size:18,color:'#000'},
                    {text:locale.HEROES.MONKEY.NAME,pos:{x:1040,y:520},size:26,color:'#000'},
                    {text:locale.HEROES.MONKEY.POWER,pos:{x:1040,y:490},size:18,color:'#000'},
                ]
                setInterval(()=>{if(timer>0){timer--;timerobj.text=''+timer}},1000)
                Input.ClickEvents = [
                    {s:{x:0,y:0},e:{x:1280,y:720},callback:()=>{this.changeState(menuState.SinglePlayerGame)}}
                ]
            break
            case menuState.SinglePlayerGame:
                Renderer.textures = [
                    {pic:View.pics.blurred_bg,pos:{x:0,y:0},hover:false},
                    {pic:View.pics.battle_top,pos:{x:0,y:0},hover:false},
                ]
                Renderer.texts = [
                ]
                Input.ClickEvents = [
                    {s:{x:0,y:0},e:{x:1280,y:720},callback:()=>{this.changeState(menuState.MainMenu)}}
                ]
            break
        }
        this.currentState = newState
    }
}
