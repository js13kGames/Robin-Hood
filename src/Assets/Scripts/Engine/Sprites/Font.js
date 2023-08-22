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
    static getSpriteForText(word,size,color,fuseImage,family = 'Arial'){
        let ctx = gf.makeCanvas(1, 1).getContext("2d"); // Create a temporary canvas context
        ctx.font = size + "px "+family;
        const textWidth = ctx.measureText(word.toUpperCase()).width || 1;
        const textHeight = size*1.25+1; 
        let canvas = gf.makeCanvas(parseInt(textWidth), textHeight);
        ctx = gf.getCtx(canvas);
        
        ctx.font = size + "px "+family;
        ctx.fillStyle = color;
        ctx.fillText(word.toUpperCase(),0, size);
        if (fuseImage) {
            canvas = gf.fuseImage(canvas, fuseImage);
        }

        var c2 = gf.makeCanvas(canvas.width,canvas.height);
        var cx2 = gf.getCtx(c2);
        // cx2.fillStyle = '#ffffff';
        // cx2.fillRect(0,0,c2.width,c2.height);
        cx2.drawImage(canvas,0,0);
        return c2;
    }
}