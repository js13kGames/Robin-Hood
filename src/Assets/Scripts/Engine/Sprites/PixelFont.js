import * as gf from '../Utils/gf.js';
const CHARS = ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ.:-×?©!';
export default class PixelFont{
    static GetBlueprint(){
        if(PixelFont.BLUEPRINT) return PixelFont.BLUEPRINT;
        let spriteSheet = gf.querySelector('#spriteSheetMain');
        var originCanvas = gf.crop(spriteSheet,0,0,88,32);
        var colorMatrix = gf.getColorMatrix(originCanvas,(e)=>{
            if(e == "#ffffff") return '';
            return e;
        });
        var canvas = gf.colorsMatrixToSprite(colorMatrix,1,(e)=>{
            return e;
        });
        PixelFont.BLUEPRINT = {
            canvas : canvas,
            colorMatrix : colorMatrix
        }
        return PixelFont.BLUEPRINT;
    }
    constructor(config = {}){
        this.config = config;
        if(!config.size) this.size = 1;
        else this.size = config.size;
        var blueprint = PixelFont.GetBlueprint();
        this.colorMatrix = JSON.parse(JSON.stringify(blueprint.colorMatrix));
        this.canvas = gf.colorsMatrixToSprite(this.colorMatrix,this.size,(e)=>{
            if(config.color && e == "#000000") return config.color;
            return e;
        });
        if(config.fuseImage){
            this.canvas = gf.fuseImage(this.canvas,config.fuseImage);
        }
        this.chars = this.getCharsArrayFromSpriteMap(this.canvas,8 * this.size);
    }
    getTextSprite(word,fuseImage){
        let canvas = gf.makeCanvas(this.size * 8 * word.length,this.size * 8);
        let ctx = gf.getCtx(canvas);
        word = word.toUpperCase();
        for(let i in word){
            ctx.drawImage(this.chars[word[i]],this.size*i*8,0);
        }
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