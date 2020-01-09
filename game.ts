import {Renderer} from './renderer.js'
import {View, locale} from './view.js';
import {menuState,gameType,turn} from './enums.js'
import {GameState} from './gamestate.js'
import {Heroes} from './heroes.js'
import {Player} from './player.js'
import {Animator} from './animator.js'
import {Utils} from './utils.js';
import {Multiplayer} from './multiplayer.js';

export abstract class Game{
    public static start(){
        View.changeState(menuState.MainMenu)
        Renderer.drawLoop();
    }
    public static async startMatch(hero:Hero){
        GameState.player = new Player(hero)
        GameState.turnTimer = 4
        if(GameState.matchtype == gameType.SinglePlayer){
            GameState.running = true
            GameState.opponent = new Player(Heroes.getRandomHero())
            View.changeState(menuState.SinglePlayerGame)
        } else {
            GameState.running = true
            Multiplayer.roomserver.send(JSON.stringify({type:'selecthero', obj:hero.pic.name}))
            GameState.opponent = new Player(<Hero>await Multiplayer.getHero())
            View.changeState(menuState.MPGame)
            GameState.turnTimerInterval = setInterval(()=>{GameState.turnTimer > 0 ? GameState.turnTimer -= 1 : 0},1000)
            GameState.syncInterval = setInterval(()=>Multiplayer.roomserver.send(JSON.stringify({type:'syncstate',obj:GameState.player})),7000)
        }
        Animator.animateBar(0,GameState.player.maxHP,GameState.player,'animHP')
        Animator.animateBar(0,GameState.player.maxMana,GameState.player,'animMana')
        Animator.animateBar(0,GameState.opponent.maxHP,GameState.opponent,'animHP')
    }
    private static AIMove(){
        if(Utils.rng(0,1) == 1){
            this.atkBuff(GameState.opponent)
            GameState.opponent.isAttacking = true
        } else {
            this.defBuff(GameState.opponent)
            GameState.opponent.isDefending = true
        }
        if(Utils.rng(0,1) == 1){
            this.atkBuff(GameState.opponent)
        } else {
            if(Utils.rng(0,1) == 1){
                this.defBuff(GameState.opponent)
            } else {
                this.atkdefBuff(GameState.opponent)
            }
        }
    }
    public static startBattle(){
        if(GameState.matchtype == gameType.SinglePlayer){
            this.AIMove()
        }
        GameState.matchturn = turn.Battle
        if(GameState.player.isDefending){
            Animator.appear(View.MTextures.PlayerShield,0.05)
        }
        if(GameState.opponent.isDefending){
            Animator.appear(View.MTextures.OpponentShield,0.05)
        }
        if(GameState.player.isAttacking && !GameState.opponent.isDefending){
            Animator.animatePlayerSwordAttack(View.MTextures.PlayerSword,1,0)
            this.removeHP(GameState.opponent,GameState.player.attack)
        }
        if(GameState.player.isAttacking && GameState.opponent.isDefending){
            Animator.animatePlayerSwordAttack(View.MTextures.PlayerSword,1,4)
            let dmg = GameState.player.attack - GameState.opponent.defense
            this.removeHP(GameState.opponent, dmg > 0 ? dmg : 0) //do not heal your opponent
        }
        if(GameState.opponent.isAttacking && !GameState.player.isDefending){
            Animator.animatePlayerSwordAttack(View.MTextures.OpponentSword,-1,0)
            this.removeHP(GameState.player,GameState.opponent.attack)
        }
        if(GameState.opponent.isAttacking && GameState.player.isDefending){
            Animator.animatePlayerSwordAttack(View.MTextures.OpponentSword,-1,4)
            let dmg = GameState.opponent.attack - GameState.player.defense
            this.removeHP(GameState.player, dmg > 0 ? dmg : 0) //do not heal yourself from shield
        }
        setTimeout(()=>this.endBattle(),3000)
    }
    public static endBattle(){
        GameState.matchturn = turn.Upgrade
        GameState.turnTimer = 4
        if(GameState.player.isDead() && GameState.opponent.isDead()){
            //tie
            GameState.result = locale.TIE
        } else {
            if(GameState.player.isDead()){
                //loss
                GameState.result = locale.LOSS
            }
            if(GameState.opponent.isDead()){
                //win
                GameState.result = locale.WIN
            }    
        }
        if(GameState.player.isDead() || GameState.opponent.isDead()){
            if(GameState.syncInterval) clearInterval(GameState.syncInterval)
            if(GameState.turnTimerInterval) clearInterval(GameState.turnTimerInterval)
            GameState.running = false
            View.changeState(menuState.GameEnd);
        }
        GameState.player.isDefending = false
        GameState.player.isAttacking = false
        GameState.opponent.isAttacking = false
        GameState.opponent.isDefending = false
        this.removeMana(GameState.player, (10-GameState.player.mana) * -1)
        GameState.opponent.mana = 10
    }
    public static atkBuff(p:Player){
        if(p.mana >= 5 && GameState.matchturn != turn.Battle){
            this.removeMana(p,5)
            p.attack = Math.round(p.attack*1.2)
        }
    }   
    public static defBuff(p:Player){
        if(p.mana >= 5 && GameState.matchturn != turn.Battle){
            this.removeMana(p,5)
            p.defense = Math.round(p.defense*1.2)
        }
    }
    public static atkdefBuff(p:Player){
        if(p.mana >= 5 && GameState.matchturn != turn.Battle){
            this.removeMana(p,5)
            p.attack = Math.round(p.attack*1.1)
            p.defense = Math.round(p.defense*1.1)
        }
    }
    public static special(p:Player){
        p.hero.special(p)
    }
    public static attack(p:Player){
        if(!p.isAttacking && !p.isDefending){
            p.isAttacking = true
        }
        if(GameState.matchtype == gameType.SinglePlayer && GameState.matchturn != turn.Battle){
            this.startBattle()
        }
    }
    public static defend(p:Player){
        if(!p.isDefending && !p.isAttacking){
            p.isDefending = true
        }
        if(GameState.matchtype == gameType.SinglePlayer && GameState.matchturn != turn.Battle){
            this.startBattle()
        }
    }      
    public static removeMana(p:Player,rm:number){
        Animator.animateBar(p.mana,p.mana-rm,p,'animMana')
        p.mana -= rm
    }
    public static removeHP(p:Player,rm:number){
        let thp = p.HP
        let rmhp = thp - rm
        setTimeout(()=>Animator.animateBar(thp,rmhp >= 0 ? rmhp : 0,p,'animHP'),1700)
        p.HP -= rm
    }
}