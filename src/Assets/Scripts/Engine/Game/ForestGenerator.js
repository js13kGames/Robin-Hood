import * as gf from '../Utils/gf.js';
import TileSprite from "../Sprites/TileSprite.js";

export default class ForestGenerator{
    constructor(MAPTILES, level = 1, w = 1, h = 0){
        this.MAPTILES = MAPTILES;
        this.options = [];
        for(var i in this.MAPTILES){
            var option = this.MAPTILES[i];
            for(let j = 0; j < option.p;j++){
                this.options.push(option.c);
            }
        }
        this.options = this.options.sort(() => gf.rand() - 0.5);
        if(h == 0) h = w;
        this.colorMatrix = this.generateColorMatrix(w,h);
        this.sprite = gf.colorsMatrixToSprite(this.colorMatrix,1);
    }
    getMagnifiedMap(){
        // debugger;
        var canvas_XL = gf.colorsMatrixToSprite(this.colorMatrix,1);
        var baseground = gf.fuseImageReplace(canvas_XL,this.MAPTILES[0].s);
        var skeleton = gf.getCanvasSkeleton(canvas_XL);
        var fusedSprites = [baseground];
        for(let i in skeleton){
            var canvasskele = gf.colorsMatrixToSprite(skeleton[i]);
            // document.body.append(canvasskele);
            var sprite = this.MAPTILES.find(x=>x.c == i);
            var fused = gf.fuseImageReplace(canvasskele,sprite.s);
            // document.body.append(fused);
            fusedSprites.push(fused);
        }
        var map = gf.combineSprites(fusedSprites);
        return map;
    }
    generateColorMatrix(w,h){
        var colorMatrix = [];
        for(let i = 0 ; i < h ;i++){
            colorMatrix[i] = [];
            for(let j = 0 ; j < w ;j++){
                colorMatrix[i][j] = this.getRandomTileColor();
            }
        }
        return colorMatrix;
    }
    getRandomTileColor(){
        return this.options[gf.randInt(0,this.options.length)]; 
    }

}