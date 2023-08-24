import NPC from "../Entity/NPC.js";
import SpriteMap from "../Sprites/SpriteMap.js";
import Point from "../Utils/Point.js";
import * as gf from '../Utils/gf.js';
import {SPRITECOLORMATRIX,SPRITES_1} from '../Sprites/SpriteMap.js';
const MAPTILES = [
    {'n':'tree' ,o:1,'c':'#0d3702'},
    {'n':'brick' ,o:1,'c':'#bf0a0a'},
    {'n':'dirt' ,o:0,'c':'#d9a066'},
    {'n':'grass',o:0,'c':'#99e550'},
    {'n':'water',o:2,'c':'#8a99f6'},
    {'n':'steel',o:1,'c':'#6a6a6a'},
    {'n':'player',o:0,'c':'#130c40'},
    {'n':'army',o:0,'c':'#ff0000'},
    {'n':'cave',o:1,'c':'#2e2b2b'},
    {'n':'deerspawnpoint',o:0,'c':'#df7126'},
    {'n':'rabbitspawnpoint',o:0,'c':'#d1d1d1'},
    {'n':'wolfspawnpoint',o:0,'c':'#898898'},
];
const colorSpriteMap = {
    '#0d3702': 'tree',
    '#d9a066': 'dirt',
    '#bf0a0a': 'brick',
    '#99e550': 'grass',
    '#8a99f6': 'water',
    '#6a6a6a': 'steel',
    '#a9a9a9': 'castle',
    '#fbf236': 'house',
    '#eca732': 'shop',
    '#2e2b2b': 'cave',
};
 
export default class MapGenerator {
    constructor(gamescene, s = 1) {
        this.gamescene = gamescene;
        this.presetmobs = [];
        this.caves = [];
        this.deerspawnpoints = [];
        this.houseLocations = [];
        this.shopLocations = [];
        
        console.log(SPRITECOLORMATRIX);
        console.log(SPRITECOLORMATRIX.dirt);
        console.log(SPRITECOLORMATRIX.steel);
        console.log(SPRITES_1.dirt);

        this.getPredefinedMap1(s);
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
    getPredefinedMap1(s = 1) {
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

        ctx.drawImage(map_forest_2, 0 ,0);
        ctx.drawImage(map_castle,   w ,0);
        ctx.drawImage(map_forest_1, w+w ,0);

        ctx.drawImage(map_forest_1, 0 ,w);
        ctx.drawImage(map_spawn,   w ,w);
        ctx.drawImage(map_forest_1, w+w ,w);

        ctx.drawImage(map_forest_1, 0 ,w+w);
        ctx.drawImage(map_forest_1,   w ,w+w);
        ctx.drawImage(map_forest_1, w+w ,w+w);

        // document.body.append(map);
        
        var mapColorMatrix = gf.getColorMatrix(map);
        this.colorMatrix = mapColorMatrix;

        var sprites = {
            '#d9a066' : gf.repeatCanvas(SPRITES_1.dirt,2*s),
            '#bf0a0a' : gf.repeatCanvas(SPRITES_1.brick,2*s),
            '#99e550' : gf.repeatCanvas(SPRITES_1.grass,2*s),
            '#8a99f6' : gf.repeatCanvas(SPRITES_1.water,2*s),
            '#6a6a6a' : gf.repeatCanvas(SPRITES_1.steel,2*s),
            '#0d3702' : gf.colorsMatrixToSprite(SPRITECOLORMATRIX.tree,2*s),
            '#a9a9a9' : gf.colorsMatrixToSprite(SPRITECOLORMATRIX.castle,2*s),
            '#fbf236' : gf.colorsMatrixToSprite(SPRITECOLORMATRIX.house,2*s),
            '#eca732' : gf.colorsMatrixToSprite(SPRITECOLORMATRIX.shop,2*s),
            '#2e2b2b' : gf.colorsMatrixToSprite(SPRITECOLORMATRIX.cave,2*s),
        };

        var multiplier = 8*2*s;
        var mapcanvas = gf.makeCanvas(mapColorMatrix.length * multiplier, mapColorMatrix.length * multiplier);
        var ctx = gf.getCtx(mapcanvas);
        for(var i = 0 ; i < mapColorMatrix.length;i++){
            for(var j = 0 ; j < mapColorMatrix[i].length;j++){
                var color = mapColorMatrix[j][i];
                //random ground grass or dirt by default
                ctx.drawImage(gf.rand()>0.5? sprites['#d9a066'] : sprites['#99e550'],i*multiplier,j*multiplier);//dirt or grass before tree
                if(color == '#0d3702'){ //tree
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
                else if(color == '#df7126'){//deer spawn point
                    ctx.drawImage(sprites['#99e550'],i*multiplier,j*multiplier);
                    this.deerspawnpoints.push([i,j]);
                }
                else if(color == '#8a99f6'){//water
                    ctx.drawImage(sprites['#8a99f6'],i*multiplier,j*multiplier);
                }
                else if(color == '#6a6a6a'){//steel
                    ctx.drawImage(sprites['#6a6a6a'],i*multiplier,j*multiplier);
                }
                else if(color == '#a9a9a9'){//castle
                    //ctx.drawImage(gf.repeatCanvas(this.sMap.get('grass'),8*multiplier),i*multiplier,j*multiplier);
                    //ctx.drawImage(sprites['#a9a9a9'],i*multiplier,j*multiplier);
                    this.castlelocation = new Point(i*multiplier,j*multiplier);
                }
                else if(color == '#2e2b2b'){//cave
                    //ctx.drawImage(gf.repeatCanvas(this.sMap.get('grass'),4*multiplier),i*multiplier,j*multiplier);
                    //ctx.drawImage(sprites['#2e2b2b'],i*multiplier,j*multiplier);
                    this.caves.push(new Point(i*multiplier,j*multiplier));
                }
                else if(color == '#fbf236'){//house
                    //ctx.drawImage(gf.repeatCanvas(this.sMap.get('grass'),4*multiplier),i*multiplier,j*multiplier);
                    // ctx.drawImage(sprites['#fbf236'],i*multiplier,j*multiplier);
                    this.houseLocations.push(new Point(i*multiplier,j*multiplier));
                }
                else if(color == '#eca732'){//shop
                    //ctx.drawImage(gf.repeatCanvas(this.sMap.get('grass'),4*multiplier),i*multiplier,j*multiplier);
                    // ctx.drawImage(sprites['#eca732'],i*multiplier,j*multiplier);
                    this.shopLocations.push(new Point(i*multiplier,j*multiplier));
                }
                else if(color == '#130c40'){//player location
                    this.PLAYERLOCATION = new Point(i*multiplier,j*multiplier);
                    mapColorMatrix[i][j] = '#d9a066';
                    // ctx.drawImage(sprites['#d9a066'],i*multiplier,j*multiplier);
                }
                else if(color == '#ff0000'){//npc location
                    this.presetmobs.push(new NPC(this.gamescene,4,new Point(i*this.gamescene.tileSize,j*this.gamescene.tileSize)));
                }
                else if(color == '#000000'){//
                    
                    //this.presetmobs.push(new NPC(this.gamescene,4,new Point(i*this.gamescene.tileSize,j*this.gamescene.tileSize)));
                }
                else if(color == '#d1d1d1'){//
                    
                    //this.presetmobs.push(new NPC(this.gamescene,4,new Point(i*this.gamescene.tileSize,j*this.gamescene.tileSize)));
                }
                else if(color == '#898898'){//
                    
                    //this.presetmobs.push(new NPC(this.gamescene,4,new Point(i*this.gamescene.tileSize,j*this.gamescene.tileSize)));
                }
                else{
                    console.log(color,'unclassified');
                }
                // colorset.add(color);
            }
        }


        ctx.drawImage(sprites['#a9a9a9'],this.castlelocation.x,this.castlelocation.y);
        
        this.houseLocations.forEach(p=>{
            ctx.drawImage(sprites['#fbf236'],p.x,p.y);
        });
        this.shopLocations.forEach(p=>{
            ctx.drawImage(sprites['#eca732'],p.x,p.y);
        });
        this.caves.forEach(p=>{
            ctx.drawImage(sprites['#2e2b2b'],p.x,p.y);
        });

        this.mapcanvas = mapcanvas;
        // document.body.append(mapcanvas);

    }
}