import * as gf from '../Utils/gf.js';
import {spriteMapDefinitons} from './SpriteMap.js';
export default class TileSprite{
    constructor(){
    }
    getCustomTile4(s1,s2,s3,s4){
        var canvas = gf.makeCanvas(s1.width*2,s1.height*2);
        var ctx = gf.getCtx(canvas);
        ctx.drawImage(s1,0,0);
        ctx.drawImage(s2,s1.width,0);
        ctx.drawImage(s3,0,s1.height);
        ctx.drawImage(s4,s1.width,s1.height);
        return canvas;
    }
    static get(name){
        var cfg = spriteMapDefinitons.find(x=>x.n.toLowerCase()==name.toLowerCase());
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
        for(let i in spriteMapDefinitons){
            sprites[spriteMapDefinitons[i].n] = scale == 1 ? TileSprite.get(spriteMapDefinitons[i].n) : TileSprite.getMagnified(spriteMapDefinitons[i].n,scale);
        }
        return sprites;
    }
}