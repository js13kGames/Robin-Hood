import { SPRITECOLORMATRIX, SPRITES_1 } from '../Sprites/SpriteMap.js';
import Point from '../Utils/Point.js';
import * as gf from '../Utils/gf.js';
import Mob from './Mob.js';
import Soldier from './Soldier.js';
const cavespecs = {
    cooldown : 3
}
export default class Cave{
    constructor(scene,mult= 2){
        this.scene = scene;
        this.mult = mult;
        this.mobs = [];
        this.getSprites(mult);
    }
    setHeadPoint(point){
        var w = this.sprite.width;
        var h = this.sprite.height;
        this.center = new Point(point.x + w/2,point.y + h/2,);
        var spawnpt1 = new Point(point.x,point.y + h);
        var spawnpt2 = new Point(point.x + this.scene.tileSize,point.y + h);
        var spawnpt3 = new Point(point.x + this.scene.tileSize*2,point.y + h);
        this.spawnLocations = [
            // spawnpt1,
            spawnpt2,
            // spawnpt3,
        ];
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            (this.center).x - this.sprite.width/2,
            (this.center).y - this.sprite.height/2,
        );
    }
    update(time){
        this.mobs = this.mobs.filter(s => s.life > 0);
        [...this.mobs].forEach(obj=>{if(obj.update) obj.update(time);});
        if(this.time == time) return;
        this.time = time;
        var distance = this.center.distanceTo(this.scene.player.center);
        if(distance <= this.scene.tileSize * 4.5){
            for(let i in this.spawnLocations){
                var mob = this.scene.haveEntityAt(this.spawnLocations[i].x,this.spawnLocations[i].y);
                if(!mob){
                    var mob = new Mob(this.scene,3,this.spawnLocations[i]);
                    this.mobs.push(mob);
                    this.scene.mobs.push(mob);
                }
            }
        }
    }
    getSprites(mult = 2){
        var canvasOriginal = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.cave,mult);
        this.sprite = canvasOriginal;
        return;
        // var canvasOriginal = SPRITES_1.gnifiedcastle',mult);
        var skele = gf.getCanvasSkeleton(canvasOriginal);

        var outerprint = gf.colorsMatrixToSprite(skele['#6a6a6a']);
        var bodyprint = gf.colorsMatrixToSprite(skele['#c2c2c2']);

        var outer_dirt1 = gf.fuseImage(outerprint,gf.Lightify(SPRITES_1.dirt,.5));
        var outer_grass = gf.fuseImage(outerprint,gf.Lightify(SPRITES_1.grass,.5));
        var outer_water = gf.fuseImage(outerprint,gf.Lightify(SPRITES_1.water,.5));
        var outer_brick = gf.fuseImage(outerprint,gf.Lightify(SPRITES_1.brick,.5));
        var outer_steel = gf.fuseImage(outerprint,gf.Lightify(SPRITES_1.steel,.5));
        var outer_magic = gf.fuseImage(outerprint,gf.Lightify(SPRITES_1.magic,.5));
        
        var body_dirt1 = gf.fuseImage(bodyprint,gf.Lightify(SPRITES_1.dirt,.2));
        var body_grass = gf.fuseImage(bodyprint,gf.Lightify(SPRITES_1.grass,.2));
        var body_water = gf.fuseImage(bodyprint,gf.Lightify(SPRITES_1.water,.2));
        var body_brick = gf.fuseImage(bodyprint,gf.Lightify(SPRITES_1.brick,.2));
        var body_steel = gf.fuseImage(bodyprint,gf.Lightify(SPRITES_1.steel,.2));
        var body_magic = gf.fuseImage(bodyprint,gf.Lightify(SPRITES_1.magic,.2));

        this.dirt =     gf.combineSprites([canvasOriginal,body_dirt1,outer_dirt1]);
        this.grass =    gf.combineSprites([canvasOriginal,body_grass,outer_grass]);
        this.water =    gf.combineSprites([canvasOriginal,body_water,outer_water]);
        this.sprite =    gf.combineSprites([canvasOriginal,body_brick,outer_brick]);
        this.steel =    gf.combineSprites([canvasOriginal,body_steel,outer_steel]);
        this.magic =    gf.combineSprites([canvasOriginal,body_magic,outer_magic]);
    }
}