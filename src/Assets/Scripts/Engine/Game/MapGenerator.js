import TileSprite from "../Sprites/TileSprite.js";
import * as gf from '../Utils/gf.js';
import ForestGenerator from "./ForestGenerator.js";
const MAPTILES = [
    {'n':'dirt' ,'p':50 + 1 * 20,'c':'#a1887f','s':TileSprite.getMagnified('dirt',1)},
    {'n':'water','p':2  + 1 * 2 ,'c':'#2979ff','s':TileSprite.getMagnified('water',1)},
    {'n':'grass','p':10 + 1 * 50,'c':'#66bb6a','s':TileSprite.getMagnified('grass',1)},
    {'n':'tree' ,'p':10 + 1 * 15,'c':'#1b9e00','s': TileSprite.getMagnified('tree',1)},
];
export default class MapGenerator{
    constructor(microsize = 32){
        this.origincolormatrix = this.makeNewMap(microsize);
        this.canvas = gf.colorsMatrixToSprite(this.origincolormatrix,2);
        this.magnified = this.getMagnifiedMap(this.canvas,MAPTILES);
        document.body.append(this.magnified);
        /*
        setInterval(()=>{
            // document.body.append(this.makeNewMap(gf.randInt(10,40)));
        },10);*/
    }
    makeNewMap(microsize=32){
        var largeforestcanvas = this.makeLargeForest(microsize);
        var colorMatrix = gf.getColorMatrix(largeforestcanvas);
        var watercolor = '#2979ff';
        for(let i = 0 ; i < microsize*7;i++){
            colorMatrix[i][0] = watercolor;
            colorMatrix[i][1] = watercolor;
            colorMatrix[i][2] = watercolor;
            colorMatrix[i][colorMatrix.length - 1] = watercolor;
            colorMatrix[i][colorMatrix.length - 2] = watercolor;
            colorMatrix[i][colorMatrix.length - 3] = watercolor;
        }
        for(let i = 0 ; i < microsize*7;i++){
            colorMatrix[0][i] = watercolor;
            colorMatrix[1][i] = watercolor;
            colorMatrix[2][i] = watercolor;
            colorMatrix[colorMatrix.length-1][i] = watercolor;
            colorMatrix[colorMatrix.length-2][i] = watercolor;
            colorMatrix[colorMatrix.length-3][i] = watercolor;
        }
        return colorMatrix;
    }
    getMagnifiedMap(canvas,MAPTILES){
        var baseground = gf.fuseImageReplace(canvas,MAPTILES[0].s);
        var skeleton = gf.getCanvasSkeleton(canvas);
        var fusedSprites = [baseground];
        for(let i in skeleton){
            var canvasskele = gf.colorsMatrixToSprite(skeleton[i]);
            var sprite = MAPTILES.find(x=>x.c == i);
            var fused = gf.fuseImageReplace(canvasskele,sprite.s);
            fusedSprites.push(fused);
        }
        var map = gf.combineSprites(fusedSprites);
        return map;
    }
    makeLargeForest(microsize = 32){
        var baseForestsLevels = '4433223,43311122,42211122,42211122,42211122,42211122,42211122'.split(',');
        var map = gf.makeCanvas(microsize*7,microsize*7)
        var ctx = gf.getCtx(map);
        for(let i = 0 ; i < baseForestsLevels.length;i++){
            for(let j = 0; j < baseForestsLevels[i].length;j++){
                var c = baseForestsLevels[i].charAt(j);
                var forest = new ForestGenerator(MAPTILES,parseInt(c), microsize, microsize);
                ctx.drawImage(forest.sprite, i * microsize,j*microsize);
            }
        }
        return map;
    }
    static getForestMap(canvas){
        var colorMatrix = gf.getColorMatrix(canvas);
        var canvas_8px = gf.colorsMatrixToSprite(colorMatrix,16);
        var skeleton = gf.getCanvasSkeleton(canvas_8px);
        var fusedSprites = [];
        for(let i in skeleton){
            var canvasskele = gf.colorsMatrixToSprite(skeleton[i]);
            var sprite = MAPTILES.find(x=>x.c == i);
            var fused = gf.fuseImage(canvasskele,sprite.s);
            fusedSprites.push(fused);
        }
        var map = gf.combineSprites(fusedSprites);
        document.body.append(map);
        return map;
    }
    static getForestMinimap(w = 32,h = 32){
        var newgenforest = this.genForestCM(w,h);
        var canvas1 = gf.colorsMatrixToSprite(newgenforest,1);
        var forestMap = this.getForestMap(canvas1);
        document.body.append(canvas1);
        document.body.append(forestMap);
    }
}