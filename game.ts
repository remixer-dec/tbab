import {Renderer} from './renderer.js'
import {View, locale} from './view.js'
import {menuState, gameType, turn} from './enums.js'
import {GameState} from './gamestate.js'
import {Heroes} from './heroes.js'
import {Player} from './player.js'
import {Animator} from './animator.js'
import {Utils} from './utils.js'
import {Multiplayer} from './multiplayer.js'
import {AI} from './ai.js'

export abstract class Game {
    public static start() {
        View.changeState(menuState.MainMenu)
        Renderer.drawLoop()
    }
    public static async startMatch(hero: Hero) {
        GameState.player = new Player(hero)
        GameState.turnTimer = 4
        if (GameState.matchtype == gameType.SinglePlayer) {
            GameState.running = true
            GameState.opponent = new Player(Heroes.getRandomHero())
            View.changeState(menuState.SinglePlayerGame)
        } else {
            GameState.running = true
            Multiplayer.roomserver.send(JSON.stringify({type: 'selecthero', obj: hero.pic.name}))
            GameState.opponent = new Player(<Hero>await Multiplayer.getHero())
            View.changeState(menuState.MPGame)
            GameState.turnTimerInterval = setInterval(() => {
                GameState.turnTimer > 0 ? (GameState.turnTimer -= 1) : 0
            }, 1000)
            GameState.syncInterval = setInterval(() => Multiplayer.roomserver.send(JSON.stringify({type: 'syncstate', obj: GameState.player})), 7000)
        }
        Animator.animateBar(0, GameState.player.maxHP, GameState.player, 'animHP')
        Animator.animateBar(0, GameState.player.maxMana, GameState.player, 'animMana')
        Animator.animateBar(0, GameState.opponent.maxHP, GameState.opponent, 'animHP')
    }
    private static AIMove() {
        switch (GameState.opponent.hero.name) {
            case Heroes.list.FROG.name:
                AI.frogStrategy(GameState.opponent, GameState.player)
                break
            case Heroes.list.DOG.name:
                AI.dogStrategy(GameState.opponent, GameState.player)
                break
            case Heroes.list.CAT.name:
                AI.catStrategy(GameState.opponent, GameState.player)
                break
            case Heroes.list.CHICK.name:
                AI.chickStrategy(GameState.opponent, GameState.player)
                break
            case Heroes.list.FISH.name:
                AI.fishStrategy(GameState.opponent, GameState.player)
                break
            case Heroes.list.MONKEY.name:
                AI.monkeyStrategy(GameState.opponent, GameState.player)
                break
        }
    }
    public static startBattle() {
        if (GameState.matchtype == gameType.SinglePlayer) {
            this.AIMove()
        }
        GameState.matchturn = turn.Battle
        View.MTexts.OpponentHPDiff.text = '-0'
        if (GameState.player.isDefending) {
            Animator.appear(View.MTextures.PlayerShield, 0.05)
        }
        if (GameState.opponent.isDefending) {
            Animator.appear(View.MTextures.OpponentShield, 0.05)
        }
        if (GameState.player.isAttacking && !GameState.opponent.isDefending) {
            Animator.animatePlayerSwordAttack(View.MTextures.PlayerSword, 1, 0)
            this.removeHP(GameState.opponent, GameState.player.attack)
            View.MTexts.OpponentHPDiff.text = '-' + GameState.player.attack
        }
        if (GameState.player.isAttacking && GameState.opponent.isDefending) {
            Animator.animatePlayerSwordAttack(View.MTextures.PlayerSword, 1, 4)
            let dmg = GameState.player.attack - GameState.opponent.defense
            dmg = dmg > 0 ? dmg : 0 //do not heal your opponent
            this.removeHP(GameState.opponent, dmg)
            View.MTexts.OpponentDamageRecieved.text = ' ' + GameState.player.attack
            View.MTexts.OpponentDefenseBlocked.text = '-' + GameState.opponent.defense
            Animator.animateTextAppearDisappear(View.MTexts.OpponentDamageRecieved, -1)
            Animator.animateTextAppearDisappear(View.MTexts.OpponentDefenseBlocked, -1)
            View.MTexts.OpponentHPDiff.text = '-' + dmg
        }
        Animator.animateTextAppearDisappear(View.MTexts.OpponentHPDiff, 1)
        View.MTexts.PlayerHPDiff.text = '-0'
        if (GameState.opponent.isAttacking && !GameState.player.isDefending) {
            Animator.animatePlayerSwordAttack(View.MTextures.OpponentSword, -1, 0)
            this.removeHP(GameState.player, GameState.opponent.attack)
            View.MTexts.PlayerHPDiff.text = '-' + GameState.opponent.attack
        }
        if (GameState.opponent.isAttacking && GameState.player.isDefending) {
            Animator.animatePlayerSwordAttack(View.MTextures.OpponentSword, -1, 4)
            let dmg = GameState.opponent.attack - GameState.player.defense
            dmg = dmg > 0 ? dmg : 0 //do not heal yourself from shield
            this.removeHP(GameState.player, dmg)
            View.MTexts.PlayerDamageRecieved.text = ' ' + GameState.opponent.attack
            View.MTexts.PlayerDefenseBlocked.text = '-' + GameState.player.defense
            Animator.animateTextAppearDisappear(View.MTexts.PlayerDamageRecieved, -1)
            Animator.animateTextAppearDisappear(View.MTexts.PlayerDefenseBlocked, -1)
            View.MTexts.PlayerHPDiff.text = '-' + dmg
        }
        Animator.animateTextAppearDisappear(View.MTexts.PlayerHPDiff, -1)
        setTimeout(() => this.endBattle(), 3000)
    }
    public static endBattle() {
        GameState.matchturn = turn.Upgrade
        GameState.turnTimer = 4
        if (GameState.player.isDead() && GameState.opponent.isDead()) {
            //tie
            GameState.result = locale.TIE
        } else {
            if (GameState.player.isDead()) {
                //loss
                GameState.result = locale.LOSS
            }
            if (GameState.opponent.isDead()) {
                //win
                GameState.result = locale.WIN
            }
        }
        if (GameState.player.isDead() || GameState.opponent.isDead()) {
            if (GameState.syncInterval) clearInterval(GameState.syncInterval)
            if (GameState.turnTimerInterval) clearInterval(GameState.turnTimerInterval)
            GameState.running = false
            setTimeout(() => View.changeState(menuState.GameEnd), 1000)
        }
        GameState.player.isDefending = false
        GameState.player.isAttacking = false
        GameState.player.specialUsed = false
        GameState.opponent.isAttacking = false
        GameState.opponent.isDefending = false
        GameState.opponent.specialUsed = false
        this.removeMana(GameState.player, (GameState.player.maxMana - GameState.player.mana) * -1)
        GameState.opponent.mana = GameState.opponent.maxMana
    }
    public static atkBuff(p: Player) {
        if (p.mana >= p.atkBuffCost && GameState.matchturn != turn.Battle) {
            this.removeMana(p, p.atkBuffCost)
            p.attack = Math.round(p.attack * 1.1)
            p.atkBuffs++
            if (p.atkBuffs % 8 == 0) {
                p.atkBuffCost++
            }
        }
    }
    public static defBuff(p: Player) {
        if (p.mana >= p.defBuffCost && GameState.matchturn != turn.Battle) {
            this.removeMana(p, p.defBuffCost)
            p.defense = Math.round(p.defense * 1.1)
            p.defBuffs++
            if (p.defBuffs % 8 == 0) {
                p.defBuffCost++
            }
        }
    }
    public static atkdefBuff(p: Player) {
        if (p.mana >= p.atkdefBuffCost && GameState.matchturn != turn.Battle) {
            this.removeMana(p, p.atkdefBuffCost)
            p.attack = Math.round(p.attack * 1.05)
            p.defense = Math.round(p.defense * 1.05)
            p.atkdefBuffs++
            if (p.atkdefBuffs % 8 == 0) {
                p.atkdefBuffCost++
            }
        }
    }
    public static special(p: Player) {
        if (GameState.matchturn != turn.Battle && p.mana >= p.hero.specialCost) {
            Game.removeMana(p, p.hero.specialCost)
            p.hero.special(p)
            p.specialUsed = true
        }
    }
    public static attack(p: Player) {
        if (!p.isAttacking && !p.isDefending) {
            p.isAttacking = true
        }
        if (GameState.matchtype == gameType.SinglePlayer && GameState.matchturn != turn.Battle) {
            this.startBattle()
        }
    }
    public static defend(p: Player) {
        if (!p.isDefending && !p.isAttacking) {
            p.isDefending = true
        }
        if (GameState.matchtype == gameType.SinglePlayer && GameState.matchturn != turn.Battle) {
            this.startBattle()
        }
    }
    public static removeMana(p: Player, rm: number) {
        Animator.animateBar(p.mana, p.mana - rm, p, 'animMana')
        p.mana -= rm
    }
    public static removeHP(p: Player, rm: number) {
        let thp = p.HP
        let rmhp = thp - rm
        if (rmhp > p.maxHP) rmhp = p.maxHP
        setTimeout(() => Animator.animateBar(thp, rmhp >= 0 ? rmhp : 0, p, 'animHP'), 1700)
        p.HP -= rm
    }
}
