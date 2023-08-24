import * as gf from '../Utils/gf.js';
export default class Font{
    constructor(config = {}){
    }
    //get
    static get(word,size,color,fuseImage,family = 'Arial',w=0,h=0){
        let ctx = gf.getCtx(gf.makeCanvas(1, 1)); // Create a temporary canvas context
        ctx.font = size + "px "+family;
        const textWidth = w || ctx.measureText(word).width || 1;
        const textHeight = h ||size+2; 
        let canvas = gf.makeCanvas(parseInt(textWidth), textHeight);
        ctx = gf.getCtx(canvas);
        ctx.font = size + "px "+family;
        ctx.fillStyle = color;
        ctx.fillText(word,0, size-2);
        if (fuseImage) {
            canvas = gf.fuseImage(canvas, fuseImage);
        }
        var c2 = gf.makeCanvas(canvas.width,canvas.height);
        var cx2 = gf.getCtx(c2);
        cx2.fillStyle = '#ffffff';
        // cx2.fillRect(0,0,c2.width,c2.height);
        cx2.drawImage(canvas,0,0);
        return c2;
    }
}