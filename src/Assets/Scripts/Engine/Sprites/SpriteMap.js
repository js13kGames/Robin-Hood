import * as gf from '../Utils/gf.js';

const spriteMapDefinitons = [
    //row 1
    {c:0, n:'dirt',    x:0,y:0,w:8,h:8},
    {c:0, n:'grass',   x:1,y:0,w:8,h:8},
    {c:0, n:'water',   x:2,y:0,w:8,h:8},
    {c:0, n:'steel',   x:3,y:0,w:8,h:8},
    {c:0, n:'brick',   x:4,y:0,w:8,h:8},
    //row 2
    {c:1, n:'sword',   x:0,y:1,w:8,h:8},
    {c:1, n:'bow',     x:1,y:1,w:8,h:8},
    {c:1, n:'arrow',   x:2,y:1,w:8,h:8},
    {c:1, n:'magic',   x:3,y:1,w:8,h:8},
    {c:1, o:1, n:'tree',    x:4,y:1,w:8,h:8},
    //row 3
    {c:1, n:'coin',    x:0,y:2,w:8,h:8},
    {c:1, n:'apple',   x:1,y:2,w:8,h:8},
    {c:1, n:'lemon',   x:2,y:2,w:8,h:8},
    //row 4
    {c:1, n:'rabbit',   x:0,y:3,w:8,h:8},
    {c:1, n:'wolf',     x:1,y:3,w:16,h:8},
    
    //castle 32px
    {c:1, n:'castle',  x:9,y:0,w:32,h:32},
    {c:1, n:'cave',    x:3,y:2,w:16,h:16},

    //mob row
    {c:1, n:'player',      x:0,y:4,w:16,h:16},
    {c:1, n:'playerb',     x:2,y:4,w:16,h:16},
    {c:1, n:'players',     x:4,y:4,w:8,h:16},
    {c:1, n:'playerh',     x:5,y:4,w:8,h:16},
    {c:1, n:'wizzard',     x:6,y:4,w:8,h:16},
    {c:1, n:'bear',        x:7,y:4,w:16,h:16},
    {c:1, n:'deer',        x:9,y:4,w:16,h:16},


    {c:1, n:'house',       x:5,y:0,w:16,h:16},
    {c:1, n:'shop',        x:5,y:2,w:16,h:16},
    {c:1, n:'npcman',      x:7,y:0,w:16,h:16},
    {c:1, n:'npcgirl',     x:7,y:2,w:16,h:16},
    {c:1, n:'direction',   x:11,y:4,w:16,h:16},

    //////MAPS
    {c:0, n:'map_spawn',       x:0,y:6,w:16,h:16},
    {c:0, n:'map_castle',      x:2,y:6,w:16,h:16},
    {c:0, n:'map_forest_1',    x:4,y:6,w:16,h:16},
    {c:0, n:'map_forest_2',    x:6,y:6,w:16,h:16},
    {c:0, n:'map_forest_3',    x:8,y:6,w:16,h:16},
    {c:0, n:'map_forest_4',    x:10,y:6,w:16,h:16},

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
        return SpriteMap.MAP;
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
        var sprite = gf.crop(spritesheet,cfg.x * 8,cfg.y * 8,cfg.w,cfg.h);
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
            cfg.x*8,
            cfg.y*8,
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
