import {GameState} from './gamestate.js'
import {Game} from './game.js'
import {Player} from './player.js'
import {Utils} from './utils.js'
export abstract class AI {
    public static getAllBuffs(p: Player): {action: Function; cost: number; isAtk: number; isDef: number}[] {
        return [
            {action: Game.atkBuff, cost: p.atkBuffCost, isAtk: 1, isDef: 0},
            {action: Game.defBuff, cost: p.defBuffCost, isAtk: 0, isDef: 1},
            {action: Game.atkdefBuff, cost: p.atkdefBuffCost, isAtk: 1, isDef: 1}
        ]
    }
    public static getAvailableBuffs(p: Player) {
        return this.getAllBuffs(p).filter(b => b.cost <= p.mana)
    }
    public static randomBuffStrategy(p: Player) {
        let buffs = this.getAvailableBuffs(p)
        while (buffs.length > 0) {
            buffs[Utils.rng(0, buffs.length - 1)].action.call(Game, p)
            buffs = this.getAvailableBuffs(p)
        }
    }
    public static attackBuffStrategy(p: Player) {
        let buffs = this.getAvailableBuffs(p).filter(b => b.isAtk === 1)
        while (buffs.length > 0) {
            buffs[0].action.call(Game, p)
            buffs = this.getAvailableBuffs(p).filter(b => b.isAtk === 1)
        }
    }
    public static defenseBuffStrategy(p: Player) {
        let buffs = this.getAvailableBuffs(p).filter(b => b.isDef === 1)
        while (buffs.length > 0) {
            buffs[0].action.call(Game, p)
            buffs = this.getAvailableBuffs(p).filter(b => b.isDef === 1)
        }
    }
    public static efficientBuffStrategy(p: Player) {
        let buffs = this.getAvailableBuffs(p).sort((a, b) => (a.cost > b.cost ? 1 : -1))
        while (buffs.length > 0) {
            buffs[0].action.call(Game, p)
            buffs = this.getAvailableBuffs(p).sort((a, b) => (a.cost > b.cost ? 1 : -1))
        }
    }
    public static defPrefferedBuffStrategy(p: Player) {
        if (Utils.rng(0, 100) < 70) this.defenseBuffStrategy(p)
        else this.efficientBuffStrategy(p)
    }

    public static atkPrefferedBuffStrategy(p: Player) {
        if (Utils.rng(0, 100) < 70) this.attackBuffStrategy(p)
        else this.randomBuffStrategy(p)
    }
    public static selectAction(p: Player, o: Player) {
        if (p.HP < o.attack * 2 && p.attack < o.HP) {
            p.isDefending = true
        } else {
            let atkchance = 0
            if (p.HP > p.maxHP / 2) {
                atkchance = 70
                if (o.isAttacking && p.attack < o.attack) {
                    atkchance = 20
                }
            } else {
                atkchance = 45
            }
            if (p.attack >= o.HP) {
                atkchance = 99
            }
            if (Utils.rng(0, 100) <= atkchance) {
                p.isAttacking = true
            } else {
                p.isDefending = true
            }
        }
    }
    public static frogStrategy(p: Player, o: Player) {
        if (p.maxMana < 18) {
            p.hero.special(p)
            if (p.mana >= p.hero.specialCost * 2) {
                p.hero.special(p)
            }
            this.randomBuffStrategy(p)
            p.isDefending = true
        } else {
            this.efficientBuffStrategy(p)
            this.selectAction(p, o)
        }
    }
    public static dogStrategy(p: Player, o: Player) {
        p.hero.special(p)
        if (p.attack < 300) {
            p.isDefending = true
        } else {
            this.selectAction(p, o)
        }
    }
    public static catStrategy(p: Player, o: Player) {
        this.defPrefferedBuffStrategy(p)
        p.hero.special(p)
        this.randomBuffStrategy(p)
        this.selectAction(p, o)
    }
    public static chickStrategy(p: Player, o: Player) {
        let atkChance = 0
        if (o.HP > p.HP) {
            if (o.isAttacking && p.defense < p.attack) {
                p.hero.special(p)
                this.defPrefferedBuffStrategy(p)
                atkChance = 10
            } else {
                this.atkPrefferedBuffStrategy(p)
                atkChance = 80
            }
        } else {
            if (p.defense > p.attack) {
                p.hero.special(p)
            }
            this.efficientBuffStrategy(p)
            atkChance = 90
        }
        if (Utils.rng(0, 100) <= atkChance) {
            p.isAttacking = true
        } else {
            p.isDefending = true
        }
    }
    public static fishStrategy(p: Player, o: Player) {
        if (p.HP < p.maxHP - p.attack / 2) {
            if (Utils.rng(0, 100) < 70) {
                p.hero.special(p)
            }
            this.efficientBuffStrategy(p)
        } else {
            this.atkPrefferedBuffStrategy(p)
        }
        this.selectAction(p, o)
    }
    public static monkeyStrategy(p: Player, o: Player) {
        if (p.HP < p.maxHP / 2) {
            if (Utils.rng(0, 100) < 60) {
                p.hero.special(p)
            }
            p.isDefending = true
        } else {
            this.defPrefferedBuffStrategy(p)
            this.selectAction(p, o)
        }
    }
}
