import * as gf from '../Utils/gf.js';
import {initColorMatrix,colorsMatrixToSprite} from '../Utils/gf.js';

const SPRITECOLORMATRIX = {
    dirt : initColorMatrix(0,0,1,1),
    grass : initColorMatrix(1,0,1,1),
    water : initColorMatrix(2,0,1,1),
    steel : initColorMatrix(3,0,1,1),
    brick : initColorMatrix(4,0,1,1),
    sword : initColorMatrix(0,1,1,1),
    bow : initColorMatrix(1,1,1,1),
    arrow : initColorMatrix(2,1,1,1),
    magic : initColorMatrix(3,1,1,1),
    tree : initColorMatrix(4,1,1,1),
    coin : initColorMatrix(0,2,1,1),
    apple : initColorMatrix(1,2,1,1),
    lemon : initColorMatrix(2,2,1,1),
    rabbit : initColorMatrix(0,3,1,1),
    wolf : initColorMatrix(1,3,2,1),
    castle : initColorMatrix(9,0,4,4),
    cave : initColorMatrix(3,2,2,2),
    player : initColorMatrix(0,4,2,2),
    playerb : initColorMatrix(2,4,2,2),
    players : initColorMatrix(4,4,1,2),
    playerh : initColorMatrix(5,4,1,2),
    wizzard : initColorMatrix(6,4,1,2),
    bear : initColorMatrix(7,4,2,2),
    deer : initColorMatrix(9,4,2,2),
    house : initColorMatrix(5,0,2,2),
    shop : initColorMatrix(5,2,2,2),
    npcman : initColorMatrix(7,0,2,2),
    npcgirl : initColorMatrix(7,2,2,2),
    direction : initColorMatrix(11,4,2,2),
    map_spawn : initColorMatrix(0,6,2,2),
    map_castle : initColorMatrix(2,6,2,2),
    map_forest_1 : initColorMatrix(4,6,2,2),
    map_forest_2 : initColorMatrix(6,6,2,2),
    map_forest_3 : initColorMatrix(8,6,2,2),
    map_forest_4 : initColorMatrix(10,6,2,2)
}
const SPRITES_1 = {
    dirt : colorsMatrixToSprite(SPRITECOLORMATRIX.dirt,1),
    grass : colorsMatrixToSprite(SPRITECOLORMATRIX.grass,1),
    water : colorsMatrixToSprite(SPRITECOLORMATRIX.water,1),
    steel : colorsMatrixToSprite(SPRITECOLORMATRIX.steel,1),
    brick : colorsMatrixToSprite(SPRITECOLORMATRIX.brick,1),
    sword : colorsMatrixToSprite(SPRITECOLORMATRIX.sword,1),
    bow : colorsMatrixToSprite(SPRITECOLORMATRIX.bow,1),
    arrow : colorsMatrixToSprite(SPRITECOLORMATRIX.arrow,1),
    magic : colorsMatrixToSprite(SPRITECOLORMATRIX.magic,1),
    tree : colorsMatrixToSprite(SPRITECOLORMATRIX.tree,1),
    coin : colorsMatrixToSprite(SPRITECOLORMATRIX.coin,1),
    apple : colorsMatrixToSprite(SPRITECOLORMATRIX.apple,1),
    lemon : colorsMatrixToSprite(SPRITECOLORMATRIX.lemon,1),
    rabbit : colorsMatrixToSprite(SPRITECOLORMATRIX.rabbit,1),
    wolf : colorsMatrixToSprite(SPRITECOLORMATRIX.wolf,1),
    castle : colorsMatrixToSprite(SPRITECOLORMATRIX.castle,1),
    cave : colorsMatrixToSprite(SPRITECOLORMATRIX.cave,1),
    player : colorsMatrixToSprite(SPRITECOLORMATRIX.player,1),
    playerb : colorsMatrixToSprite(SPRITECOLORMATRIX.playerb,1),
    players : colorsMatrixToSprite(SPRITECOLORMATRIX.players,1),
    playerh : colorsMatrixToSprite(SPRITECOLORMATRIX.playerh,1),
    wizzard : colorsMatrixToSprite(SPRITECOLORMATRIX.wizzard,1),
    bear : colorsMatrixToSprite(SPRITECOLORMATRIX.bear,1),
    deer : colorsMatrixToSprite(SPRITECOLORMATRIX.deer,1),
    house : colorsMatrixToSprite(SPRITECOLORMATRIX.house,1),
    shop : colorsMatrixToSprite(SPRITECOLORMATRIX.shop,1),
    npcman : colorsMatrixToSprite(SPRITECOLORMATRIX.npcman,1),
    npcgirl : colorsMatrixToSprite(SPRITECOLORMATRIX.npcgirl,1),
    direction : colorsMatrixToSprite(SPRITECOLORMATRIX.direction,1),
    map_spawn : colorsMatrixToSprite(SPRITECOLORMATRIX.map_spawn,1),
    map_castle : colorsMatrixToSprite(SPRITECOLORMATRIX.map_castle,1),
    map_forest_1 : colorsMatrixToSprite(SPRITECOLORMATRIX.map_forest_1,1),
    map_forest_2 : colorsMatrixToSprite(SPRITECOLORMATRIX.map_forest_2,1),
    map_forest_3 : colorsMatrixToSprite(SPRITECOLORMATRIX.map_forest_3,1),
    map_forest_4 : colorsMatrixToSprite(SPRITECOLORMATRIX.map_forest_4,1),
}
const SPRITES_2 = {
    castle : colorsMatrixToSprite(SPRITECOLORMATRIX.castle,2),
    house : colorsMatrixToSprite(SPRITECOLORMATRIX.house,2),
    shop : colorsMatrixToSprite(SPRITECOLORMATRIX.shop,2),
    cave : colorsMatrixToSprite(SPRITECOLORMATRIX.cave,2),
}
export {SPRITECOLORMATRIX,SPRITES_1,SPRITES_2};
export default class SpriteMap{}
/*

export default class SpriteMap{
    constructor(spriteMap){
        this.spriteMap = spriteMap || this.getSpriteMap();
    }
    static fromO(that){
        return new SpriteMap(that.spriteMap);
    }
    initAllColorMatrix(obj){
        this.dirt = this.initColorMatrix(0,0,1,1);
        this.grass = this.initColorMatrix(1,0,1,1);
        this.water = this.initColorMatrix(2,0,1,1);
        this.steel = this.initColorMatrix(3,0,1,1);
        this.brick = this.initColorMatrix(4,0,1,1);
        this.sword = this.initColorMatrix(0,1,1,1);
        this.bow = this.initColorMatrix(1,1,1,1);
        this.arrow = this.initColorMatrix(2,1,1,1);
        this.magic = this.initColorMatrix(3,1,1,1);
        this.tree = this.initColorMatrix(4,1,1,1);
        this.coin = this.initColorMatrix(0,2,1,1);
        this.apple = this.initColorMatrix(1,2,1,1);
        this.lemon = this.initColorMatrix(2,2,1,1);
        this.rabbit = this.initColorMatrix(0,3,1,1);
        this.wolf = this.initColorMatrix(1,3,2,1);
        this.castle = this.initColorMatrix(9,0,4,4);
        this.cave = this.initColorMatrix(3,2,2,2);
        this.player = this.initColorMatrix(0,4,2,2);
        this.playerb = this.initColorMatrix(2,4,2,2);
        this.players = this.initColorMatrix(4,4,1,2);
        this.playerh = this.initColorMatrix(5,4,1,2);
        this.wizzard = this.initColorMatrix(6,4,1,2);
        this.bear = this.initColorMatrix(7,4,2,2);
        this.deer = this.initColorMatrix(9,4,2,2);
        this.house = this.initColorMatrix(5,0,2,2);
        this.shop = this.initColorMatrix(5,2,2,2);
        this.npcman = this.initColorMatrix(7,0,2,2);
        this.npcgirl = this.initColorMatrix(7,2,2,2);
        this.direction = this.initColorMatrix(11,4,2,2);
        this.map_spawn = this.initColorMatrix(0,6,2,2);
        this.map_castle = this.initColorMatrix(2,6,2,2);
        this.map_forest_1 = this.initColorMatrix(4,6,2,2);
        this.map_forest_2 = this.initColorMatrix(6,6,2,2);
        this.map_forest_3 = this.initColorMatrix(8,6,2,2);
        this.map_forest_4 = this.initColorMatrix(10,6,2,2);
    }
    static initColorMatrix(x,y,w,h){
        let spritesheet = gf.querySelector('#spriteSheetMain');
        var sprite = gf.crop(spritesheet,x * 8, y * 8,w *8 ,h *8);
        var colorMatrix = gf.getColorMatrix(sprite,(e)=>{
            if(e === "#ffffff") return '';
            return e;
        });
        return colorMatrix;
    }
    getSpriteMap(){
        if(SpriteMap.MAP) return SpriteMap.MAP;
        var spriteMapFormated = spriteMapDefinitons;
        for(let i = 0 ; i < spriteMapFormated.length;i++){
            spriteMapFormated[i].s1 = this.get(spriteMapFormated[i].n);
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
export {spriteMapDefinitons,SPRITECOLORMATRIX,SPRITES_1,SPRITES_2};
*/