import NPC from "../Entity/NPC.js";
import Point from "../Utils/Point.js";
import * as gf from '../Utils/gf.js';
import {SPRITECOLORMATRIX,SPRITES_1} from '../Sprites/SpriteMap.js';
import Villager from "../Entity/Villager.js";
import Merchant from "../Entity/Merchant.js";
import Wizzard from "../Entity/Wizzard.js";
const MAPTILES = [
    {'n':'tree' ,o:1,'c':'#0d3702'},
    {'n':'brick' ,o:1,'c':'#bf0a0a'},
    {'n':'dirt' ,o:0,'c':'#d9a066'},
    {'n':'grass',o:0,'c':'#99e550'},
    {'n':'water',o:2,'c':'#8a99f6'},
    {'n':'steel',o:1,'c':'#6a6a6a'},
    {'n':'snow',o:0,'c':'#dcdcdc'},
    {'n':'player',o:0,'c':'#130c40'},
    {'n':'villager',o:1,'c':'#fff300'},
    {'n':'merchant',o:1,'c':'#76428a'},
    {'n':'wizzard',o:1,'c':'#191919'},
    {'n':'army',o:0,'c':'#ff0000'},
    {'n':'cave',o:1,'c':'#2e2b2b'},
    {'n':'deerspawnpoint',o:0,'c':'#df7126'},
    {'n':'rabbitspawnpoint',o:0,'c':'#d1d1d1'},
    {'n':'wolfspawnpoint',o:0,'c':'#898898'},
];
const colorToTileMap = (k)=>{
    switch(k){
        case '#99e550': return 'grass';
        case '#d9a066': return 'dirt';
        case '#dcdcdc': return 'snow';
        case '#8a99f6': return 'water';
        default:return null;
    }
}
const colorToObjectMap = (k)=>{
    switch(k){
        case '#0d3702': return 'tree';
        case '#bf0a0a': return 'brick';
        case '#6a6a6a': return 'steel';
        case '#a9a9a9': return 'castle';
        case '#fbf236': return 'house';
        case '#eca732': return 'shop';
        case '#2e2b2b': return 'cave';
        default:return null;
    }
}
const colorToEntityMap= (k)=>{
    switch(k){
        case '#130c40': return 'player';
        case '#fff300': return 'villager';
        case '#76428a': return 'merchant';
        case '#191919': return 'wizzard';
        case '#df7126': return 'spawner_deer';
        case '#d1d1d1': return 'spawner_rabbit';
        case '#898898': return 'spawner_wolf';
        default:return null;
    }
}
export default class MapGenerator {
    constructor(gamescene, s = 1) {
        this.gamescene = gamescene;
        this.sprites_dirt = gf.repeatCanvas(SPRITES_1.dirt,4);
        this.sprites_grass = gf.repeatCanvas(SPRITES_1.grass,4);
        this.sprites_water = gf.repeatCanvas(SPRITES_1.water,4);
        this.sprites_snow = gf.repeatCanvas(SPRITES_1.snow,4);
        this.sprites_brick = gf.repeatCanvas(SPRITES_1.brick,4);
        this.sprites_steel = gf.repeatCanvas(SPRITES_1.steel,4);
        this.sprites_tree = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.tree,4);
        this.sprites_castle = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.castle,4);
        this.sprites_house = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.house,4);
        this.sprites_shop = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.shop,4);
        this.sprites_cave = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.cave,4);
        this.PLAYERLOCATION = [0,0];
        this.villagers = [];
        this.buildings = [];
        this.colorMatrix = [];
        this.tileMatrix = [];
        this.caves = [];
        this.deerspawnpoints = [];
        this.getPredefinedMap1(s);
        this.pathMatrix = this.getPathfindMatrix();
    }
    getPathfindMatrix(){
        var obstacle = {};
        for(let i in MAPTILES){
            obstacle[MAPTILES[i].c] = MAPTILES[i].o;
        }
        var obstacleMatrix = [];
        for(var i = 0 ; i < this.colorMatrix.length;i++){
            obstacleMatrix[i] = [];
            for(var j = 0 ; j < this.colorMatrix[i].length;j++){
                var c = this.colorMatrix[j][i];
                var obs = obstacle[c];
                var ispassable = obs != undefined && obs == 0;
                obstacleMatrix[i][j] = ispassable ? 0 : 1;
            }
        }
        return obstacleMatrix;
    }
    getColorAt(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        if(x < 0) return null;
        if(x > this.colorMatrix.length-1) return null;
        if(y < 0) return null;
        if(y > this.colorMatrix.length-1) return null;
        // return this.colorMatrix[x][y];
        return this.colorMatrix[y][x];
    }
    isObstacleAt(x,y){
        x = Math.floor(x);
        y = Math.floor(y);
        if(x < 0) return true;
        if(x > this.colorMatrix.length-1) return true;
        if(y < 0) return true;
        if(y > this.colorMatrix.length-1) return true;
        if(!this.colorMatrix[x]) return true;
        // var c = this.colorMatrix[x][y];
        var c = this.colorMatrix[y][x];
        return this.isObstacle(c);
    }
    isObstacle(color){
        var cfg = MAPTILES.find(x=>x.c == color);
        // console.log(cfg,color);
        return cfg == undefined ? 1 : cfg.o;
    }
    getMapPixels(){
        var map_spawn = SPRITES_1.map_spawn;
        var map_castle =    SPRITES_1.map_castle;
        var map_forest_1 =  SPRITES_1.map_forest_1;
        var map_forest_2 =  SPRITES_1.map_forest_2;
        var map_forest_3 =  SPRITES_1.map_forest_3;
        var map_forest_4 =  SPRITES_1.map_forest_4;
        var w = map_spawn.width;
        var h = map_spawn.height;
        var map = gf.makeCanvas(w*3,h*3);
        var ctx = gf.getCtx(map);
        for(let i = 0 ; i < 3;i++){
            for(let j = 0 ; j < 3;j++){
                ctx.drawImage(map_forest_1, i*w ,j*w);
            }
        }
        ctx.drawImage(map_forest_2, w ,0);
        ctx.drawImage(map_forest_3, w*2 ,w*2);
        ctx.drawImage(map_forest_4, w*2 ,w);
        ctx.drawImage(map_castle,0,0);
        ctx.drawImage(map_spawn,w,w);
        // document.body.append(map);
        return map;
    }
    getMapItems(colorMatrix,s = 32){
        var tilemap = [];
        var objectsmap = [];
        var entitymap = {};
        var rows = colorMatrix.length;
        var cols = colorMatrix[0].length;
        tilemap = new Array(rows).fill(null).map(()=>new Array(cols).fill(null));
        objectsmap = new Array(rows).fill(null).map(()=>new Array(cols).fill(null));
        var playerLocation= new Point(32,32);
        var villagers = [];
        gf.forIJMatrix(colorMatrix,(e,i,j)=>{
            tilemap[i][j] = colorToTileMap(e) || 'grass';
            objectsmap[i][j] = colorToObjectMap(e) || null;

            if(!entitymap[colorToEntityMap(e)]){
                entitymap[colorToEntityMap(e)] = [];
            }
            if(colorToEntityMap(e)){
                entitymap[colorToEntityMap(e)].push([i,j]);
                if(colorToEntityMap(e) == 'player'){
                    playerLocation = new Point(i*s,j*s);
                }
                else if(colorToEntityMap(e) == 'villager'){
                    villagers.push(new Villager(this.gamescene,new Point(i*s,j*s)));
                    console.log('villager added');
                }
                else if(colorToEntityMap(e) == 'merchant'){
                    villagers.push(new Merchant(this.gamescene,new Point(i*s,j*s)));
                    console.log('merchant added');
                }
                else if(colorToEntityMap(e) == 'wizzard'){
                    villagers.push(new Wizzard(this.gamescene,new Point(i*s,j*s)));
                    console.log('wizzard added');
                }
            }
        });
        var tilemapcanvas = this.buildCanvasForMap(tilemap,s);
        var objectsmapcanvas = this.buildCanvasForMap(objectsmap,s);
        return {
            tilemap : tilemap,
            objectsmap : objectsmap,
            tilemapcanvas : tilemapcanvas,
            objectsmapcanvas : objectsmapcanvas,
            entitymap : entitymap,
            playerLocation : playerLocation,
            villagers : villagers
        }

    }
    buildCanvasForMap(map,s=32){
        var canvas = gf.makeCanvas(map.length*s,map.length*s);
        var ctx = gf.getCtx(canvas);
        gf.forIJMatrix(map,(e,i,j)=>{
            var sprite = e ? this.getImageSprite(e) : null;
            // console.log(e,sprite);
            if(e && sprite) ctx.drawImage(sprite,j*s,i*s);
        });
        return canvas;
    }
    getImageSprite(name){
        switch(name){
            case 'dirt' : return this.sprites_dirt;
            case 'grass' : return this.sprites_grass;
            case 'water' : return this.sprites_water;
            case 'snow' : return this.sprites_snow;
            case 'brick' : return this.sprites_brick;
            case 'steel' : return this.sprites_steel;
            case 'tree' : return this.sprites_tree;
            case 'castle' : return this.sprites_castle;
            case 'house' : return this.sprites_house;
            case 'shop' : return this.sprites_shop;
            case 'cave' : return this.sprites_cave;
            default :return null;
        }
    }
    getPredefinedMap1(s = 1) {
        var map = this.getMapPixels();
        this.map = map;
        var multiplier = 8*2*s;
        var mapColorMatrix = gf.getColorMatrix(map);
        this.colorMatrix = mapColorMatrix;
        // console.log(JSON.stringify(this.colorMatrix));
        var mapItems = this.getMapItems(mapColorMatrix,multiplier);
        this.mapItems = mapItems;
        // console.log(mapItems);
        // console.log(this.mapItems.entitymap['player']);
        this.PLAYERLOCATION = this.mapItems.playerLocation;
        this.VILLAGERS = this.mapItems.villagers;
        var mapcanvas = gf.combineSprites([mapItems.tilemapcanvas,mapItems.objectsmapcanvas]);
        this.mapcanvas = mapcanvas;
        // document.body.append(mapcanvas);
    }
}