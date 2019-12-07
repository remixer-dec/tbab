interface viewPic{
    url: string
    w: number
    h: number
    name:string
    img: HTMLImageElement,
}
interface picList{
    [key: string]: viewPic
}

interface Coords{
    x: number
    y: number
}

interface Texture{
    pic:viewPic
    pos:Coords
    hover:boolean
}

type Color = string

interface TextAsset{
    text: string
    pos: Coords
    size: number
    color: Color
    multiline?: boolean
}

interface customClickEvent{
    s:Coords
    e:Coords
    callback():void
}