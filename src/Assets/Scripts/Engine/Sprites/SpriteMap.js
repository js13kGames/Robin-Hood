import * as gf from '../Utils/gf.js';

const spriteMapDefinitons = [
    //row 1
    {c:0, o:0, n:'dirt',    x:88,y:0,w:8,h:8},
    {c:0, o:0, n:'grass',   x:96,y:0,w:8,h:8},
    {c:0, o:0, n:'water',   x:104,y:0,w:8,h:8},
    {c:0, o:0, n:'steel',   x:112,y:0,w:8,h:8},
    {c:0, o:0, n:'brick',   x:120,y:0,w:8,h:8},
    //row 2
    {c:1, o:0, n:'magic',   x:88,y:8,w:8,h:8},
    {c:1, o:1, n:'tree',    x:96,y:8,w:8,h:8},
    {c:1, o:0, n:'log',     x:104,y:8,w:8,h:8},
    {c:1, o:0, n:'apple',   x:112,y:8,w:8,h:8},
    {c:1, o:0, n:'lemon',   x:120,y:8,w:8,h:8},
    
    {c:1, o:0, n:'sword',   x:88,y:16,w:8,h:8},
    {c:1, o:0, n:'bow',     x:96,y:16,w:8,h:8},
    {c:1, o:0, n:'arrow',   x:104,y:16,w:8,h:8},

    {c:1, o:0, n:'rabbit',   x:88,y:24,w:8,h:8},
    {c:1, o:0, n:'wolf',     x:96,y:24,w:16,h:8},
    
    //castle 32px
    {c:1, o:0, n:'castle',  x:128,y:0,w:32,h:32},
    {c:1, o:0, n:'cave',    x:112,y:16,w:16,h:16},

    //mob row
    {c:1, o:0, n:'player',      x:0,y:32,w:16,h:16},
    {c:1, o:0, n:'playerb',     x:16,y:32,w:16,h:16},
    {c:1, o:0, n:'players',     x:32,y:32,w:8,h:16},
    {c:1, o:0, n:'playerh',     x:40,y:32,w:8,h:16},
    {c:1, o:0, n:'bear',        x:48,y:32,w:16,h:16},
    {c:1, o:0, n:'deer',        x:64,y:32,w:16,h:16},
    {c:1, o:0, n:'house',       x:80,y:32,w:16,h:16},
    {c:1, o:0, n:'shop',        x:96,y:32,w:16,h:16},
    {c:1, o:0, n:'npcgirl',     x:112,y:32,w:16,h:16},
    {c:1, o:0, n:'npcman',      x:128,y:32,w:16,h:16},
    {c:1, o:0, n:'direction',   x:128,y:32,w:16,h:16},

    //////MAPS
    {c:0, o:0, n:'map_spawn',       x:0,y:48,w:16,h:16},
    {c:0, o:0, n:'map_castle',      x:16,y:48,w:16,h:16},
    {c:0, o:0, n:'map_forest_1',    x:32,y:48,w:16,h:16},
    {c:0, o:0, n:'map_forest_2',    x:48,y:48,w:16,h:16},
    {c:0, o:0, n:'map_forest_3',    x:64,y:48,w:16,h:16},
    {c:0, o:0, n:'map_forest_4',    x:80,y:48,w:16,h:16},

];

export default class SpriteMap{
    constructor(){
        this.spriteMap = this.getSpriteMap();
    }
    getSpriteMap(){
        if(SpriteMap.MAP) return SpriteMap.MAP;
        var spriteMapFormated = spriteMapDefinitons;
        for(let i = 0 ; i < spriteMapFormated.length;i++){
            spriteMapFormated[i].s1 = this.get(spriteMapFormated[i].n);
            spriteMapFormated[i].s2 = this.getMagnified(spriteMapFormated[i].n,2);
            spriteMapFormated[i].s3 = this.getMagnified(spriteMapFormated[i].n,3);
        }
        SpriteMap.MAP = spriteMapFormated;
    }
    async prepareSprites(){

    }
    getSpecialTile(name){
        return null;
        // if(name == 'grass3brick1') 
    }
    getCfg(name){
        var source = (this.spriteMap) ? this.spriteMap : spriteMapDefinitons;
        var cfg = source.find(x=>x.n.toLowerCase()==name.toLowerCase());
        return cfg;
    }
    get(name){
        var cfg = this.getCfg(name);
        if(!cfg || cfg.x == undefined) return this.getSpecialTile(name);
        if(cfg.s) return cfg.s;
        let spritesheet = gf.querySelector('#spriteSheetMain');
        var sprite = gf.crop(spritesheet,cfg.x,cfg.y,cfg.w,cfg.h);
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
    getMagnified(name,scale = 1){
        var cfg = this.getCfg(name);
        if(cfg && scale == 2 && cfg.s2) return cfg.s2;
        if(cfg && scale == 3 && cfg.s3) return cfg.s3;
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
    static getColoredTile(color,w=1,h=1,r=1,c=1){
        var canvas = gf.makeCanvas(w * r,h * c);
        var ctx = gf.getCtx(canvas);
        ctx.fillStyle = color;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        return canvas;
    }
    static getByNameMagnified(name,scale=1){
        var originCanvas = this.getByName(name);
        var colorMatrix = gf.getColorMatrix(originCanvas,(e)=>{
            if(e == "#ffffff") return '';
            return e;
        });
        var canvas = gf.colorsMatrixToSprite(colorMatrix,scale,(e)=>{
            return e;
        });
        return canvas;
    }
    static getByName(name){
        var cfg = spriteMapDefinitons.find(x=>x.n.toLowerCase()==name.toLowerCase());
        if(cfg.s) return cfg.s;
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
    static getPattern(name,times){
        
    }
}
export {spriteMapDefinitons};
