export class Player {
    public HP: number
    public maxHP: number
    public animHP: number
    public mana: number
    public maxMana: number
    public animMana: number
    public attack: number
    public defense: number
    public hero: Hero
    public isAttacking: boolean
    public isDefending: boolean
    public specialUsed: boolean
    constructor(hero: Hero) {
        this.HP = 2000
        this.maxHP = 2000
        this.animHP = 0
        this.maxMana = 10
        this.mana = 10
        this.animMana = 0
        this.hero = hero
        this.attack = 100
        this.defense = 100
        this.isAttacking = false
        this.isDefending = false
        this.specialUsed = false
    }
    public isDead(): boolean {
        return this.HP <= 0
    }
}
