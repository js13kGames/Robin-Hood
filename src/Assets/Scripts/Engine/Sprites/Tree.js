import TileSprite from "./TileSprite.js";
import * as gf from '../Utils/gf.js';
export default class Tree{
    constructor(){

    }

    static get(scale){
        var treelog = TileSprite.getMagnified('log',scale);
        var treeleaf = TileSprite.getMagnified('tree',scale);
        var canvas = gf.makeCanvas(treeleaf.width,treeleaf.width+treelog.width);
        var ctx = gf.getCtx(canvas);
        ctx.drawImage(treeleaf,0,0);
        ctx.drawImage(treelog,0,treeleaf.height);
        return canvas;
    }
    static getB(scale){
        var treelog = TileSprite.getMagnified('log',scale);
        var treeleaf = TileSprite.getMagnified('tree',scale);
        var canvas = gf.makeCanvas(treeleaf.width, treeleaf.height+treelog.height*2);
        var ctx = gf.getCtx(canvas);
        ctx.drawImage(treeleaf,0,0);
        ctx.drawImage(treelog,0,treeleaf.height);
        ctx.drawImage(treelog,0,treeleaf.height+treelog.height);
        return canvas;
    }
}