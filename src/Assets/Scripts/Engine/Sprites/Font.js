import * as gf from '../Utils/gf.js';
const CHARS = ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.:-×?©!';
export default class Font{
    static GetBlueprint(){
        if(Font.BLUEPRINT) return Font.BLUEPRINT;
        let spriteSheet = gf.querySelector('#spriteSheetMain');
        var originCanvas = gf.crop(spriteSheet,0,0,88,32);
        var colorMatrix = gf.getColorMatrix(originCanvas,(e)=>{
            if(e == "#ffffff") return '';
            return e;
        });
        var canvas = gf.colorsMatrixToSprite(colorMatrix,1,(e)=>{
            return e;
        });
        Font.BLUEPRINT = {
            canvas : canvas,
            colorMatrix : colorMatrix
        }
        return Font.BLUEPRINT;
    }
    constructor(config = {}){
        this.config = config;
        this.size = config.size ? config.size : 8;
        this.color = config.color ? config.color : '#ff00ff';
    }
    getTextSprite(word,fuseImage){
        let canvas = gf.makeCanvas(this.size * 8 * word.length,this.size * 8);
        let ctx = gf.getCtx(canvas);
        word = word.toUpperCase();
        // ctx.fillStyle = this.color;
        ctx.fillStyle = "green";
        ctx.font = "16px Arial";
        ctx.fillText(word,0,0);
        if(fuseImage){
            canvas = gf.fuseImage(canvas,fuseImage);
        }
        return canvas;
    }
    getCharsArrayFromSpriteMap(canvas,size){
        var chars = {};
        let y = 0;
        let x = 0;
        for(let i = 0 ; i < CHARS.length;i++){
            let char = CHARS[i];
            if(i >= 11 && i % 11 == 0){
                x = 0;
                y+= size;
            }
            let c = gf.crop(canvas, x * size, y, size, size);
            chars[char] = c;
            x++;
        }
        return chars;
    }
}