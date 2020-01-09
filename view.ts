import {Renderer} from './renderer.js'
import {Input} from './input.js'
import {Heroes} from './heroes.js'
import {Game} from './game.js'
import {GameState} from './gamestate.js'
import {Utils} from './utils.js'
import {Multiplayer} from './multiplayer.js'
import {menuState,gameType,turn} from './enums.js'
import * as Locale from './locale.js'

export let locale = (window.navigator.languages.includes("ru") || window.navigator.languages.includes("ru-RU")) ? Locale.RUlocale : Locale.ENlocale

export abstract class View {
    public static pics:PicList = {}
    public static MTextures:TextureList = {}
    public static currentState:menuState = menuState.MainMenu
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
        Heroes.init()
        this.initMTextures()
        return Promise.all(loaded)
    }
    private static initMTextures(){
        this.MTextures = {
            PlayerSword:{pic:this.pics.sword_small_up,pos:{x:610,y:485},condition:()=>GameState.player.isAttacking,mod:{targetRotation:100,rotation:0, opacity:0.001}},
            PlayerShield:{pic:this.pics.shield_small,pos:{x:620,y:490},condition:()=>GameState.player.isDefending,mod:{opacity:0.001}},
            OpponentSword:{pic:this.pics.sword_small_up,pos:{x:610,y:215},condition:()=>GameState.opponent.isAttacking, mod: {rotation:180,targetRotation: 270,opacity:0.001}},
            OpponentShield:{pic:this.pics.shield_small,pos:{x:620,y:215},condition:()=>GameState.opponent.isDefending,mod:{opacity:0.001}}
        }
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
                return [menuState.MainMenu,menuState.PlayerSelect].includes(newState)
            break
            case menuState.MPGame:
                return [menuState.GameEnd,menuState.MainMenu].includes(newState)
            break
            case menuState.GameEnd:
                return [menuState.MainMenu].includes(newState)
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
                    {pic:View.pics.tbab_main_menu,pos:{x:0,y:0}},
                    {pic:View.pics.button_main, pos:{x:380,y:200}},
                    {pic:View.pics.button_main_hover, pos:{x:380,y:200},hover:true},
                    {pic:View.pics.button_main, pos:{x:380,y:320}},
                    {pic:View.pics.button_main_hover, pos:{x:380,y:320},hover:true},
                    {pic:View.pics.button_main, pos:{x:380,y:440}},
                    {pic:View.pics.button_main_hover, pos:{x:380,y:440},hover:true}
                ]
                Renderer.texts = [
                    {text:locale.SP,pos:{x:640,y:252},size:30,color:'#5f220a'},
                    {text:locale.MP,pos:{x:640,y:372},size:30,color:'#5f220a'},
                    {text:locale.RULES,pos:{x:640,y:492},size:30,color:'#5f220a'}
                ]
                Input.clickEvents = [
                    {s:{x:380,y:200},e:{x:380+517,y:200+82},callback:()=>{this.changeState(menuState.PlayerSelect); GameState.matchtype = gameType.SinglePlayer}},
                    {s:{x:380,y:320},e:{x:380+517,y:320+82},callback:()=>{this.changeState(menuState.MPLobby); GameState.matchtype = gameType.MultiPlyaer}},
                    {s:{x:380,y:440},e:{x:380+517,y:440+82},callback:()=>{this.changeState(menuState.Rules)}}
                ]
                Renderer.shapes = []
            break
            case menuState.Rules:
                Renderer.textures = [
                    {pic:View.pics.mp_menu,pos:{x:0,y:0}},
                    {pic:View.pics.button_main, pos:{x:30,y:10}},
                    {pic:View.pics.button_main_hover, pos:{x:30,y:10},hover:true},
                ]
                Renderer.texts = [
                    {text:locale.BACK,pos:{x:293,y:62},size:30,color:'#000'},
                    {text:locale.RULESTEXT,pos:{x:640,y:200},size:30,color:'#000',multiline:true}
                ]
                Input.clickEvents = [
                    {s:{x:30,y:10},e:{x:547,y:92},callback:()=>{this.changeState(menuState.MainMenu)}}
                ]
            break
            case menuState.GameEnd:
                Renderer.textures = [
                    {pic:View.pics.mp_menu,pos:{x:0,y:0}},
                    {pic:View.pics.button_main, pos:{x:30,y:10}},
                    {pic:View.pics.button_main_hover, pos:{x:30,y:10},hover:true},
                ]
                Renderer.texts = [
                    {text:locale.BACK,pos:{x:293,y:62},size:30,color:'#000'},
                    {text:GameState.result,pos:{x:640,y:200},size:30,color:'#000',multiline:true}
                ]
                Input.clickEvents = [
                    {s:{x:30,y:10},e:{x:547,y:92},callback:()=>{this.changeState(menuState.MainMenu)}}
                ]
                Renderer.shapes = []
            break
            case menuState.MPLobby:
                Multiplayer.setupNickname()
                Multiplayer.connect()
                Renderer.textures = [
                    {pic:View.pics.mp_menu,pos:{x:0,y:0}},
                    {pic:View.pics.button_main, pos:{x:30,y:10}},
                    {pic:View.pics.button_main_hover, pos:{x:30,y:10},hover:true},
                    {pic:View.pics.button_main, pos:{x:730,y:10},condition:()=>!Multiplayer.roomCreated},
                    {pic:View.pics.button_main_hover, pos:{x:730,y:10},hover:true},
                    {pic:View.pics.button_main_hover, pos:{x:730,y:10},condition:()=>Multiplayer.roomCreated},
                ]

                Renderer.texts = [
                    {text:locale.BACK,pos:{x:293,y:62},size:30,color:'#000'},
                    {text:'',ctext:()=>Multiplayer.roomCreated?locale.ROOMCREATED:locale.CREATEROOM,pos:{x:730+258,y:62},size:30,color:'#000'},
                ]

                Input.clickEvents = [
                    {s:{x:30,y:10},e:{x:547,y:92},callback:()=>{Multiplayer.destroyRoom(); this.changeState(menuState.MainMenu)}},
                    {s:{x:730,y:10},e:{x:730+517,y:92},callback:()=>{Multiplayer.createRoom()}}
                ]

                for(let i=0;i<10;i++){
                    Renderer.textures.push({pic:View.pics.select_server_hover, pos:{x:180,y:150+45*i},hover:true})
                    Renderer.texts.push({text:'',pos:{x:640,y:175+45*i},size:16,color:'#000',ctext:<any>Multiplayer.getServerInfoFunction(i)})
                    Input.clickEvents.push({s:{x:180,y:150+45*i},e:{x:180+921,y:150+45+45*i},callback:<any>Multiplayer.getServerSelectFunction(i)})
                }
            break
            case menuState.PlayerSelect:
                Renderer.textures = [
                    {pic:View.pics.player_select_BLURRED,pos:{x:0,y:0}},
                    {pic:View.pics.hero_select_hover,pos:{x:156,y:23},hover:true},
                    {pic:View.pics.hero_select_hover,pos:{x:560,y:23},hover:true},
                    {pic:View.pics.hero_select_hover,pos:{x:964,y:23},hover:true},
                    {pic:View.pics.hero_select_hover,pos:{x:156,y:540},hover:true},
                    {pic:View.pics.hero_select_hover,pos:{x:560,y:540},hover:true},
                    {pic:View.pics.hero_select_hover,pos:{x:964,y:540},hover:true},
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
                let tmr = setInterval(()=>{
                    if(timer>0){
                        timer--;
                        timerobj.text=''+timer
                        if(GameState.running){
                            timerobj.text=locale.WAITING
                            clearInterval(tmr)
                        }
                    } else {
                        if(GameState.running){
                            clearInterval(tmr)
                            return
                        }
                        Game.startMatch(Heroes.getRandomHero())
                    }
                },1000)
                Input.clickEvents = [
                    {s:{x:140,y:25},e:{x:340,y:245},callback:()=>{Game.startMatch(Heroes.list.FROG)}},
                    {s:{x:540,y:25},e:{x:740,y:245},callback:()=>{Game.startMatch(Heroes.list.DOG)}},
                    {s:{x:940,y:25},e:{x:1140,y:245},callback:()=>{Game.startMatch(Heroes.list.CAT)}},
                    {s:{x:140,y:540},e:{x:340,y:690},callback:()=>{Game.startMatch(Heroes.list.CHICK)}},
                    {s:{x:540,y:540},e:{x:740,y:690},callback:()=>{Game.startMatch(Heroes.list.FISH)}},
                    {s:{x:940,y:540},e:{x:1140,y:690},callback:()=>{Game.startMatch(Heroes.list.MONKEY)}}
                ]
            break
            case menuState.SinglePlayerGame:
            case menuState.MPGame:
                Input.escPressed = false
                Renderer.textures = [
                    {pic:View.pics.blurred_bg,pos:{x:0,y:0}},
                    {pic:View.pics.battle_top,pos:{x:0,y:0}},
                    {pic:GameState.player.hero.pic,pos:{x:562,y:540}},
                    {pic:GameState.opponent.hero.pic,pos:{x:562,y:55}},
                    {pic:View.pics.hero_hover_up,pos:{x:560,y:495},hover:true},
                    {pic:View.pics.hero_hover_down,pos:{x:560,y:150},hover:true},
                    {pic:View.pics.atk_btn_hover,pos:{x:5,y:530},hover:true},
                    {pic:View.pics.def_btn_hover,pos:{x:5,y:625},hover:true},
                    {pic:View.pics.atk_btn_hover,pos:{x:5,y:530},condition:()=>GameState.matchtype == gameType.MultiPlyaer && GameState.player.isAttacking},
                    {pic:View.pics.def_btn_hover,pos:{x:5,y:625},condition:()=>GameState.matchtype == gameType.MultiPlyaer && GameState.player.isDefending},
                    {pic:View.pics.upg_btn_hover,pos:{x:215,y:540},hover:true},
                    {pic:View.pics.upg_btn_hover,pos:{x:215,y:635},hover:true},
                    {pic:View.pics.upg_btn_hover,pos:{x:385,y:540},hover:true},
                    {pic:View.pics.upg_btn_hover,pos:{x:385,y:635},hover:true},
                    {pic:View.pics.blurred_bg, pos:{x:0,y:0},condition:()=>Input.escPressed,mod:{opacity:0.6}},
                    {pic:View.pics.button_main, pos:{x:380,y:320},condition:()=>Input.escPressed},
                    this.MTextures.PlayerShield,
                    this.MTextures.OpponentShield,
                    this.MTextures.PlayerSword,
                    this.MTextures.OpponentSword
                ]
                let gtimer = {text:'',pos:{x:640,y:385},size:70,color:'#000',
                    ctext:()=>GameState.matchtype == gameType.MultiPlyaer && GameState.matchturn == turn.Upgrade ?''+GameState.turnTimer : ''
                }
                Renderer.texts = [
                    {text:'',pos:{x:1240,y:592},size:20,color:'#5f220a',ctext:()=>''+Math.ceil(GameState.player.animHP)},
                    {text:'',pos:{x:720,y:32},size:14,color:'#5f220a',ctext:()=>''+Math.ceil(GameState.opponent.animHP)},
                    {text:'',pos:{x:1240,y:675},size:20,color:'#5f220a',ctext:()=>''+Math.ceil(GameState.player.animMana)},
                    {text:'',pos:{x:130,y:590},size:26,color:'#fff',ctext:()=>''+GameState.player.attack},
                    {text:'',pos:{x:130,y:685},size:26,color:'#fff',ctext:()=>''+GameState.player.defense},
                    {text:'ATK +2%',pos:{x:275,y:590},size:22,color:'#fff'},
                    {text:'5M',pos:{x:350,y:587},size:14,color:'#2196F3'},
                    {text:'DEF +2%',pos:{x:275,y:684},size:22,color:'#fff'},
                    {text:'5M',pos:{x:350,y:681},size:14,color:'#2196F3'},
                    {text:'ATK +1%\nDEF +1%',pos:{x:442,y:580},size:22,color:'#fff',multiline:true},
                    {text:'5M',pos:{x:520,y:587},size:14,color:'#2196F3'},
                    {text:'SPECIAL',pos:{x:442,y:684},size:22,color:'#fff'},
                    {text:'5M',pos:{x:520,y:681},size:14,color:'#2196F3'},
                    gtimer,
                    {text:'',ctext:()=>Input.escPressed?locale.BACK:'',pos:{x:640,y:372},size:30,color:'#5f220a'},
                    {text:'',ctext:()=>GameState.matchturn == turn.Battle?locale.BATTLE:locale.UPGRADE,pos:{x:45,y:15},size:14,color:'#fff'},
                ]
                Input.clickEvents = [
                    {s:{x:220,y:550},e:{x:370,y:615},callback:()=>{Game.atkBuff(GameState.player)}},
                    {s:{x:220,y:640},e:{x:370,y:710},callback:()=>{Game.defBuff(GameState.player)}},
                    {s:{x:390,y:550},e:{x:540,y:615},callback:()=>{Game.atkdefBuff(GameState.player)}},
                    {s:{x:390,y:640},e:{x:540,y:710},callback:()=>{Game.special(GameState.player)}},
                    {s:{x:20,y:540},e:{x:90,y:615},callback:()=>{Game.attack(GameState.player)}},
                    {s:{x:20,y:640},e:{x:90,y:710},callback:()=>{Game.defend(GameState.player)}},
                    {s:{x:380,y:320},e:{x:380+517,y:320+82},callback:()=>{
                        if(Input.escPressed){
                            if(GameState.matchtype == gameType.MultiPlyaer){
                                Multiplayer.destroyRoom()
                            }
                            this.changeState(menuState.MainMenu)
                        }
                    }}
                ]
                Renderer.shapes = [
                    {pos:{x:745,y:555},w:()=>Utils.calcPixels(GameState.player.animHP,GameState.player.maxHP,530),h:58,color:'#b71c1c'},
                    {pos:{x:538,y:18},w:()=>Utils.calcPixels(GameState.opponent.animHP,GameState.opponent.maxHP,204),h:18,color:'#b71c1c'},
                    {pos:{x:745,y:638},w:()=>Utils.calcPixels(GameState.player.animMana,GameState.player.maxMana,530),h:58,color:'#2196F3'}
                ]
            break
        }
        this.currentState = newState
    }
}
