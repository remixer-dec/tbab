import {View, locale} from './view.js'
import {Utils} from './utils.js'
import {Player} from './player.js'
import {Game} from './game.js'

export abstract class Heroes {
    public static list: {[index: string]: Hero} = {}
    public static init(): void {
        this.list.FROG = {
            name: locale.HEROES.FROG.NAME,
            power: locale.HEROES.FROG.POWER,
            special: (p: Player) => {
                p.maxMana += 1
            },
            specialCost: 6,
            pic: View.pics.hero1
        }
        this.list.DOG = {
            name: locale.HEROES.DOG.NAME,
            power: locale.HEROES.DOG.POWER,
            special: (p: Player) => {
                p.attack += Math.round(p.attack * 0.3)
            },
            specialCost: 10,
            pic: View.pics.hero2
        }
        this.list.CAT = {
            name: locale.HEROES.CAT.NAME,
            power: locale.HEROES.CAT.POWER,
            special: (p: Player) => {
                if (!p.specialUsed && p.HP > p.attack) {
                    Game.removeHP(p, p.attack)
                    Game.removeMana(p, -1 * (p.maxMana - p.mana))
                }
            },
            specialCost: 0,
            pic: View.pics.hero3
        }
        this.list.CHICK = {
            name: locale.HEROES.CHICK.NAME,
            power: locale.HEROES.CHICK.POWER,
            special: (p: Player) => {
                let swap = p.attack
                p.attack = p.defense
                p.defense = swap
            },
            specialCost: 2,
            pic: View.pics.hero4
        }
        this.list.FISH = {
            name: locale.HEROES.FISH.NAME,
            power: locale.HEROES.FISH.POWER,
            special: (p: Player) => {
                Game.removeHP(p, Math.round(-p.attack / 2))
            },
            specialCost: 4,
            pic: View.pics.hero5
        }
        this.list.MONKEY = {
            name: locale.HEROES.MONKEY.NAME,
            power: locale.HEROES.MONKEY.POWER,
            special: (p: Player) => {
                Game.removeHP(p, -p.defense)
            },
            specialCost: 10,
            pic: View.pics.hero6
        }
    }
    public static getRandomHero(): Hero {
        let h = ['FROG', 'DOG', 'CAT', 'CHICK', 'FISH', 'MONKEY']
        let s = h[Utils.rng(0, h.length - 1)]
        return <Hero>this.list[s]
    }
}
