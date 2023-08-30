import { SPRITECOLORMATRIX, SPRITES_1 } from '../Sprites/SpriteMap.js';
import Point from '../Utils/Point.js';
import * as gf from '../Utils/gf.js';
import Mob from './Mob.js';
export default class Cave{
    constructor(scene,mult= 2){
        this.scene = scene;
        this.mult = mult;
        this.mobs = [];
        this.sprite = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.cave,mult);
    }
    setHeadPoint(point){
        var w = this.sprite.width;
        var h = this.sprite.height;
        this.center = new Point(point.x + w/2,point.y + h/2,);
        var spawnpt2 = new Point(point.x + this.scene.tileSize,point.y + h);
        this.spawnLocations = [
            spawnpt2,
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
}