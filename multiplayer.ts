import {locale, View} from './view.js'
import {menuState, gameType} from './enums.js'
import {GameState} from './gamestate.js'
import {Game} from './game.js'
import {Heroes} from './heroes.js'

export abstract class Multiplayer {
    public static server = 'wss://connect.websocket.in/tbab?room_id='
    public static nickname = ''
    public static lobbyserver: WebSocket
    public static roomserver: WebSocket
    public static room: MPRoom
    public static roomList: string[] = []
    public static roomCreated: boolean = false
    public static roomDataList: MPLobbyMessage[] = []
    public static async setupNickname() {
        if (!this.nickname) {
            let nickname = prompt(locale.ASKNAME)
            if (nickname !== null) {
                this.nickname = nickname.replace(/[^A-z0-9_ -]/gim, '')
                if (this.nickname.length === 0) {
                    this.nickname = 'Unknown' + new Date().getMilliseconds()
                }
            } else {
                await this.setupNickname()
            }
        }
    }
    private static announce() {
        let rtime = new Date().getTime()
        let ri = setInterval(() => {
            this.lobbyserver.send(JSON.stringify({g: 'tbab', room: this.nickname, t: rtime}))
            if (this.room.opponentName || !this.roomCreated) {
                clearInterval(ri)
            }
        }, 2000)
    }
    public static createRoom() {
        if (this.roomCreated) return
        this.announce()
        this.roomserver = new WebSocket(this.server + this.nickname)
        this.roomserver.onmessage = m => this.gameMessageWorker(m)
        this.roomCreated = true
    }
    public static destroyRoom() {
        if (this.roomserver) {
            this.roomserver.close()
        }
        if (this.roomCreated) {
            this.roomCreated = false
        }
    }
    public static updateRoomInfo() {
        this.roomDataList = this.roomDataList.filter(x => new Date().getTime() - x.t < 200000).sort()
    }
    public static getRoomData(rid: number) {
        if (rid >= this.roomDataList.length) {
            return {room: ''}
        } else {
            return this.roomDataList[rid]
        }
    }
    public static getServerInfoFunction(i: number): Function {
        return () => this.getRoomData(i).room
    }
    public static getServerSelectFunction(i: number): Function {
        return () => this.selectRoom(i)
    }
    public static connect() {
        this.room = {opponentName: '', opponentHero: false}
        this.roomList = []
        if (this.lobbyserver) {
            return
        }
        this.lobbyserver = new WebSocket(this.server + 'lobby')
        this.lobbyserver.onmessage = msg => {
            try {
                let mobj: MPLobbyMessage = JSON.parse(msg.data)
                if (mobj.g && !this.roomList.includes(mobj.g + mobj.room + mobj.t)) {
                    this.roomList.push(mobj.g + mobj.room + mobj.t)
                    this.roomDataList.push(mobj)
                }
            } catch (e) {
                console.error(e)
            }
        }
    }
    public static selectRoom(roomId: number) {
        this.destroyRoom()
        this.roomserver = new WebSocket(this.server + this.roomDataList[roomId].room)
        this.roomserver.onopen = () => {
            this.roomserver.send(JSON.stringify({type: 'join', obj: this.nickname}))
            this.roomserver.onmessage = m => this.gameMessageWorker(m)
        }
    }
    public static getHero() {
        return new Promise((rs, rj) => {
            let i = setInterval(() => {
                if (this.room.opponentHero) {
                    rs(this.room.opponentHero)
                }
            })
        })
    }
    public static gameMessageWorker(msg: MessageEvent) {
        let m = {type: '', obj: <any>false}
        try {
            m = JSON.parse(msg.data)
        } catch (e) {
            console.error(e)
        }
        switch (m.type) {
            case 'join':
                if (!this.room.opponentName) {
                    this.room.opponentName = m.obj
                    this.roomserver.send(JSON.stringify({type: 'accept', obj: this.nickname}))
                    View.changeState(menuState.PlayerSelect)
                } else {
                    this.roomserver.send(JSON.stringify({type: 'decline', obj: this.nickname}))
                }
                break
            case 'accept':
                if (this.room.opponentName) return
                this.room.opponentName = m.obj
                View.changeState(menuState.PlayerSelect)
                break
            case 'decline':
                if (this.room.opponentName) return
                alert(locale.ROOMFULL)
                this.roomserver.close()
                break
            case 'selecthero':
                if (this.room.opponentHero) return
                for (let hero in Heroes.list) {
                    if (Heroes.list[hero].pic.name == m.obj) {
                        this.room.opponentHero = Heroes.list[hero]
                    }
                }
                break
            case 'syncstate':
                GameState.opponent.attack = m.obj.attack
                GameState.opponent.defense = m.obj.defense
                GameState.opponent.isAttacking = m.obj.isAttacking
                GameState.opponent.isDefending = m.obj.isDefending
                GameState.opponent.hero = m.obj.hero
                Game.removeHP(GameState.opponent, GameState.opponent.HP - m.obj.HP)
                Game.startBattle()
                break
        }
    }
}
