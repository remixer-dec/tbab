interface ViewPic{
    url: string
    w: number
    h: number
    name: string
    img: HTMLImageElement,
}
interface PicList{
    [key: string]: ViewPic
}

interface Coords{
    x: number
    y: number
}

interface Texture{
    pic: ViewPic
    pos: Coords
    hover?: boolean
    condition?(): boolean
    mod?:{
        targetRotation?: number
        rotation?: number
        opacity?: number
    }
}

type Color = string

interface TextAsset{
    text: string
    pos: Coords
    size: number
    color: Color
    ctext?(): string 
    multiline?: boolean
    mod?:{
        opacity: number
        offsetX: number
        offsetY: number
    }
}

interface ShapeAsset{
    pos: Coords
    w(): number
    h: number
    color: Color
}

interface CustomClickEvent{
    s: Coords
    e: Coords
    callback(): void
}

interface Hero{
    name: string
    power: string
    special(p: any): void,
    specialCost: number,
    pic: ViewPic
}

interface TextureList{
    [key: string]: Texture
}

interface TextList{
    [key: string]: TextAsset
}

interface MPLobbyMessage{
    g: 'tbab'
    room: string
    t: number
}

interface MPRoom{
    opponentName:string
    opponentHero:Hero | false
}