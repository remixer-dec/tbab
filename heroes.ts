import {View,locale} from './view.js'
import {Utils} from './utils.js'
import {Player} from './player.js'

export abstract class Heroes{
    public static list:{[index:string]:Hero} = {}
    public static init():void{
        this.list.FROG = {
            name: locale.HEROES.FROG.NAME,
            power: locale.HEROES.FROG.POWER,
            special:(p:Player)=>{},
            pic: View.pics.hero1
        }
        this.list.DOG = {
            name: locale.HEROES.DOG.NAME,
            power: locale.HEROES.DOG.POWER,
            special:(p:Player)=>{},
            pic: View.pics.hero2
        }
        this.list.CAT = {
            name: locale.HEROES.CAT.NAME,
            power: locale.HEROES.CAT.POWER,
            special:(p:Player)=>{},
            pic: View.pics.hero3
        }
        this.list.CHICK = {
            name: locale.HEROES.CHICK.NAME,
            power: locale.HEROES.CHICK.POWER,
            special:(p:Player)=>{},
            pic: View.pics.hero4
        }
        this.list.FISH = {
            name: locale.HEROES.FISH.NAME,
            power: locale.HEROES.FISH.POWER,
            special:(p:Player)=>{},
            pic: View.pics.hero5
        }
        this.list.MONKEY = {
            name: locale.HEROES.MONKEY.NAME,
            power: locale.HEROES.MONKEY.POWER,
            special:(p:Player)=>{},
            pic: View.pics.hero6
        }
    }
    public static getRandomHero():Hero{
        let h = ['FROG','DOG','CAT','CHICK','FISH','MONKEY']
        let s = h[Utils.rng(0,h.length-1)]
        return <Hero>this.list[s]
    }
}
