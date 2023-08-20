import SpriteMap from "../Sprites/SpriteMap.js";
import TileSprite from "../Sprites/TileSprite.js";
import Point from "../Utils/Point.js";
import * as gf from '../Utils/gf.js';
import ForestGenerator from "./ForestGenerator.js";
const MAPTILES = [
    {'n':'tree' ,o:1,'c':'#0d3702'},
    {'n':'brick' ,o:1,'c':'#bf0a0a'},
    {'n':'dirt' ,o:0,'c':'#d9a066'},
    {'n':'grass',o:0,'c':'#99e550'},
    {'n':'water',o:1,'c':'#8a99f6'},
    {'n':'steel',o:1,'c':'#6a6a6a'},
    {'n':'player',o:1,'c':'#130c40'},
];
export default class MapGenerator{
    constructor(s=32){
        this.sMap = new SpriteMap();
        this.getPredefinedMap1(s);
        // this.getRandomizedMapByMicrosize(s);
    }
    isObstacleAt(x,y){
        x = Math.floor(x);
        y = Math.floor(y);
        if(x < 0) return true;
        if(x > this.colorMatrix.length-1) return true;
        if(y < 0) return true;
        if(y > this.colorMatrix.length-1) return true;
        var c = this.colorMatrix[x][y];
        return this.isObstacle(c);
    }
    isObstacle(color){
        var cfg = MAPTILES.find(x=>x.c == color);
        // console.log(cfg,color);
        return cfg == undefined || cfg.o == 1;
    }
    getPredefinedMap1(s=1){
        var map_house = this.sMap.get('map_house');
        var map_villge = this.sMap.get('map_villge');
        var map_village_2 = this.sMap.get('map_village_2');
        var map_castle = this.sMap.get('map_castle');
        var map_forest_1 = this.sMap.get('map_forest_1');
        var map_forest_2 = this.sMap.get('map_forest_2');
        var map_forest_3 = this.sMap.get('map_forest_3');
        var map_forest_4 = this.sMap.get('map_forest_4');
        var block1 = gf.getCustomCanvas4(map_house,map_forest_1,map_forest_2,map_villge);
        var block2 = gf.getCustomCanvas4(map_forest_1,map_forest_1,map_forest_1,map_forest_3);
        var block3 = gf.getCustomCanvas4(map_forest_1,map_castle,map_villge,map_forest_1);
        var block4 = gf.getCustomCanvas4(map_forest_4,map_forest_3,map_village_2,map_forest_1);
        var map = gf.getCustomCanvas4(block1,block2,block3,block4);
        // document.body.append(map);
        var mapColorMatrix = gf.getColorMatrix(map);
        this.colorMatrix = mapColorMatrix;

        var sprites = {
            '#0d3702' : this.sMap.getMagnified('tree',2*s),
            '#d9a066' : gf.repeatCanvas(this.sMap.get('dirt'),2*s),
            '#bf0a0a' : gf.repeatCanvas(this.sMap.get('brick'),2*s),
            '#99e550' : gf.repeatCanvas(this.sMap.get('grass'),2*s),
            '#8a99f6' : gf.repeatCanvas(this.sMap.get('water'),2*s),
            '#6a6a6a' : gf.repeatCanvas(this.sMap.get('steel'),2*s),
            '#a9a9a9' : this.sMap.getMagnified('castle',2*s),
            '#fbf236' : this.sMap.getMagnified('house',2*s),
            '#eca732' : this.sMap.getMagnified('shop',2*s),
        }

        var multiplier = 8*2*s;

        var mapcanvas = gf.makeCanvas(mapColorMatrix.length * multiplier, mapColorMatrix.length * multiplier);
        var ctx = mapcanvas.getContext("2d");
        for(var i = 0 ; i < mapColorMatrix.length;i++){
            for(var j = 0 ; j < mapColorMatrix[i].length;j++){
                
                var color = mapColorMatrix[i][j];
                if(color == '#0d3702'){ //tree
                    ctx.drawImage(gf.rand()>0.5? sprites['#d9a066'] : sprites['#99e550'],i*multiplier,j*multiplier);//dirt or grass before tree
                    ctx.drawImage(sprites['#0d3702'],i*multiplier,j*multiplier);
                }
                else if(color == '#d9a066'){ //dirt
                    ctx.drawImage(sprites['#d9a066'],i*multiplier,j*multiplier);
                }
                else if(color == '#bf0a0a'){//brick
                    ctx.drawImage(sprites['#bf0a0a'],i*multiplier,j*multiplier);
                }
                else if(color == '#99e550'){//grass
                    ctx.drawImage(sprites['#99e550'],i*multiplier,j*multiplier);
                }
                else if(color == '#8a99f6'){//water
                    ctx.drawImage(sprites['#8a99f6'],i*multiplier,j*multiplier);
                }
                else if(color == '#6a6a6a'){//steel
                    ctx.drawImage(sprites['#6a6a6a'],i*multiplier,j*multiplier);
                }
                else if(color == '#a9a9a9'){//castle
                    ctx.drawImage(gf.repeatCanvas(this.sMap.get('grass'),8*multiplier),i*multiplier,j*multiplier);
                    ctx.drawImage(sprites['#a9a9a9'],i*multiplier,j*multiplier);
                }
                else if(color == '#fbf236'){//house
                    ctx.drawImage(gf.repeatCanvas(this.sMap.get('grass'),4*multiplier),i*multiplier,j*multiplier);
                    ctx.drawImage(sprites['#fbf236'],i*multiplier,j*multiplier);
                }
                else if(color == '#eca732'){//shop
                    ctx.drawImage(gf.repeatCanvas(this.sMap.get('grass'),4*multiplier),i*multiplier,j*multiplier);
                    ctx.drawImage(sprites['#eca732'],i*multiplier,j*multiplier);
                }
                else if(color == '#130c40'){//player location
                    this.PLAYERLOCATION = new Point(i*multiplier,j*multiplier);
                    mapColorMatrix[i][j] = '#d9a066';
                    ctx.drawImage(sprites['#d9a066'],i*multiplier,j*multiplier);
                }
                else{

                }
                // colorset.add(color);
            }
        }
        this.mapcanvas = mapcanvas;
        // document.body.append(mapcanvas);

    }

    getRandomizedMapByMicrosize(microsize = 32){
        this.colorMatrix = this.makeNewMap(microsize);
        this.canvas = gf.colorsMatrixToSprite(this.colorMatrix,4);
        this.mapcanvas = this.getMagnifiedMap(MAPTILES);
    }
    getTileFromColor(){
        var tiles = {'n':'grassNbrick', c:'#d9a066', s : TileSprite.getMagnified('grassNbrick',1)}
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
    getMagnifiedMap(MAPTILES){
        var baseground = gf.fuseImageReplace(this.canvas,MAPTILES[0].s);
        var skeleton = gf.getCanvasSkeleton(this.colorMatrix,true);
        var fusedSprites = [baseground];
        for(let i in skeleton){
            var canvasskele = gf.colorsMatrixToSprite(skeleton[i],4);
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
}