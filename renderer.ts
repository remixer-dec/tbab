import {Input} from './input.js'
function $(x:string):any{
    return document.getElementById(x)
}
export abstract class Renderer {
    public static ctx  =  $('cvs').getContext('2d')
    public static draw(pic:viewPic,x:number,y:number){
        this.ctx.drawImage(pic.img, x, y)
    }
    private static drawText(t:string,coords:Coords,fontSize:number,color:Color){
        this.ctx.font = fontSize+"px Kelly Slab"
        this.ctx.fillStyle = color;
        this.ctx.textAlign = 'center'
        this.ctx.fillText(t, coords.x, coords.y)
    }
    public static textures:Texture[] = []
    public static texts:TextAsset[] = []
    private static drawTextures():void{
        for(let texture of this.textures){
            if(!texture.hover)
                this.draw(texture.pic,texture.pos.x,texture.pos.y)
            else{
                if((Input.mouse.x > texture.pos.x && Input.mouse.y > texture.pos.y) && (Input.mouse.x < (texture.pos.x + texture.pic.w) && Input.mouse.y < (texture.pos.y + texture.pic.h))){
                    this.draw(texture.pic,texture.pos.x,texture.pos.y)
                }
            }
        }
    }
    private static drawTexts():void{
        for(let text of this.texts){
            if(text.multiline){
                let txt:string[] = text.text.split('\n');
                let xy:Coords = Object.assign({},text.pos)
                for(let i=0,l=txt.length;i<l;i++){
                    this.drawText(txt[i],xy,text.size,text.color)    
                    xy.y += text.size
                }
            } else{
                this.drawText(text.text,text.pos,text.size,text.color)
            }
        }
    }
    public static drawLoop(){
        Renderer.drawTextures()
        Renderer.drawTexts()
        requestAnimationFrame(Renderer.drawLoop)
    } 
}
Input.init($('cvs'))