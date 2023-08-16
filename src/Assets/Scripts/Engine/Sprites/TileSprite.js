import * as gf from '../Utils/gf.js';

export default class TileSprite{
    constructor(){
    }
    static get(name){
        var cfg = TileSprite.TILES.find(x=>x.n.toLowerCase()==name.toLowerCase());
        let spritesheet = gf.querySelector('#spriteSheetMain');
        var sprite = gf.crop(spritesheet,
            cfg.x,
            cfg.y,
            cfg.w,
            cfg.h);
        if(cfg.c){
            var colorMatrix = gf.getColorMatrix(sprite,(e)=>{
                if(e === "#ffffff") return '';
                return e;
            });
            var canvas = gf.colorsMatrixToSprite(colorMatrix,1,(e)=>{
                return e;
            });
            return canvas;
        }
        else{
            return sprite;
        }
    }
    static getColoredTile(color,w=1,h=1,r=1,c=1){
        var canvas = gf.makeCanvas(w * r,h * c);
        var ctx = gf.getCtx(canvas);
        ctx.fillStyle = color;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        return canvas;
    }
    static getPattern(name,r = 1,c = 0){
        if(c == 0) c = r;
        var canvas = this.get(name);
        return gf.repeatCanvas(canvas,r,c);
    }
    static getMagnified(name,scale = 1){
        var originCanvas = this.get(name);
        var colorMatrix = gf.getColorMatrix(originCanvas,(e)=>{
            if(e == "#ffffff") return '';
            return e;
        });
        var canvas = gf.colorsMatrixToSprite(colorMatrix,scale,(e)=>{
            return e;
        });
        return canvas;
    }
    static getMagnifiedPattern(name,scale,r=1,c=0){
        if(c == 0) c = r;
        var canvas = this.get(name);
        var originCanvas = this.get(name);
        var colorMatrix = gf.getColorMatrix(originCanvas,(e)=>{
            if(e == "#ffffff") return '';
            return e;
        });
        var canvas = gf.colorsMatrixToSprite(colorMatrix,scale,(e)=>{
            return e;
        });
        var buffer = gf.makeCanvas(canvas.width * r, canvas.height*c);
        var ctx = gf.getCtx(buffer);
        for(let i = 0 ; i < r;i++){
            for(let j = 0 ; j < c;j++){
                ctx.drawImage(canvas,i*canvas.width,j*canvas.height);
            }
        }
        return buffer;
    }
    static getAll(scale = 1){
        var sprites = {};
        for(let i in TileSprite.TILES){
            sprites[TileSprite.TILES[i].n] = scale == 1 ? TileSprite.get(TileSprite.TILES[i].n) : TileSprite.getMagnified(TileSprite.TILES[i].n,scale);
        }
        return sprites;
    }
}
TileSprite.TILES = [
    {n:'brick',x:88,y:0,w:8,h:8,c:0},
    {n:'grass',x:96,y:0,w:8,h:8,c:0},
    {n:'water',x:104,y:0,w:8,h:8,c:0},
    {n:'steel',x:112,y:0,w:8,h:8,c:0},
    {n:'dirt',x:88,y:8,w:8,h:8,c:1},
    {n:'tree',x:96,y:8,w:8,h:8,c:1},
    {n:'log',x:104,y:8,w:8,h:8,c:1},
    {n:'magic',x:112,y:8,w:8,h:8,c:1},
    {n:'castle',x:120,y:0,w:32,h:32,c:1},
    {n:'apple',x:88,y:16,w:8,h:8,c:1},
    {n:'lemon',x:96,y:16,w:8,h:8,c:1},
    {n:'fort',x:104,y:16,w:16,h:16,c:1},
    {n:'player',x:0,y:32,w:16,h:16,c:1},
    {n:'playerback',x:16,y:32,w:16,h:16,c:1},
    {n:'playerside',x:32,y:32,w:8,h:16,c:1},
    {n:'playersidehand',x:40,y:32,w:8,h:16,c:1},
    {n:'bear',x:48,y:32,w:16,h:16,c:1},
    {n:'rabbit',x:64,y:40,w:8,h:8,c:1},
    {n:'arrow',x:64,y:32,w:8,h:8,c:1},
    {n:'deer',x:72,y:32,w:16,h:16,c:1},
    {n:'house',x:88,y:32,w:16,h:16,c:1},
    {n:'shop',x:104,y:32,w:16,h:16,c:1},
    {n:'npcgirl',x:120,y:32,w:16,h:16,c:1},
    {n:'npcman',x:136,y:32,w:16,h:16,c:1},
];
