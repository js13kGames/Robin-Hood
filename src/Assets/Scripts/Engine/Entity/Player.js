import PlayerAttribute from '../Model/PlayerAttribute.js';
import SpriteMap from '../Sprites/SpriteMap.js';
import Point from '../Utils/Point.js';
import {DIRECTION} from '../Utils/gf.js';
import * as gf from '../Utils/gf.js';
import Arrow from './Arrow.js';
export default class Player{
    constructor(gamescene){
        this.scene = gamescene;
        this.attributes = new PlayerAttribute(1);
        this.center = new Point(0,0);
        this.destination = new Point(0,0);
        this.isMoving = false;
        this.time = 0;
        this.direction = gf.DIRECTION.DOWN;
        this.sprites = this.getSprites();
        this.currentSprite = this.sprites[gf.DIRECTION.DOWN];
        this.shots = [];
        this.firecooldown = 0;
    }
    setPosition (point){
        this.center = new Point(point.x,point.y);
        this.destination = new Point(point.x,point.y);
    }
    update(time){
        this.firecooldown = Math.max(this.firecooldown-1,0);
        this.shots = this.shots.filter(s => s.life > 0);
        [...this.shots].forEach(obj=>{
            if(obj.update) obj.update(time);
        });
        // if(time == this.time) return;
        this.time = time;
        // this.Arrow.update(time);
        if(this.center.distanceTo(this.destination) != 0){
            this.isMoving = true;
            this.center.movetoward(this.destination,this.attributes.SPEED);
        }
        else{
            this.isMoving = false;
            // this.currentSprite = this.sprites[gf.DIRECTION.DOWN];
            this.scene.camera.fixToCords(this.center);
        }
    }
    fire(){
        if(this.firecooldown > 0) return;
        this.firecooldown = 20 - this.attributes.ARCHERY*2;
        console.log(this.firecooldown);
        this.shots.push(new Arrow(this));
    }
    applyArrowEffect(arrow){
        var center = arrow.center;
        var o = this.scene.checkObstacle(center.x,center.y);
        if(o){
            console.log('obstacle at ',center);
            arrow.life = 0;
        }
    }
    draw(ctx){
        ctx.drawImage(this.currentSprite,this.center.x,this.center.y);
        [...this.shots].forEach(obj=>{
            if(obj.draw) obj.draw(ctx);
        });
    }
    moveTo(x,y){
        var dir = this.center.getDirectionTo(new Point(x,y));
        // console.log('moving in dir ', dir, this.center, [x,y]);
        this.currentSprite = this.sprites[dir];
        this.move(dir);
    }
    move(dir){
        if(dir === this.direction){
            if(!this.isMoving){
                console.log('moving player');
                this.destination.move(dir,this.width);
            }
        }
        else{
            this.direction = dir;
        }
    }
    getSprites(){
        var p = SpriteMap.getByNameMagnified('player',this.scene.scalemultiplier);
        var playerb = SpriteMap.getByNameMagnified('playerb',this.scene.scalemultiplier);
        var playersRight = SpriteMap.getByNameMagnified('players',this.scene.scalemultiplier);
        var playersLeft = gf.mirror(playersRight,true);
        var sprites = [
            playerb,        //UP
            playerb,        //UPRIGHT
            playersRight,       //RIGHT
            p,        //DOWNRIGHT
            p,        //DOWN
            p,        //DOWNLEFT
            playersLeft,        //LEFT
            playerb,        //UPLEFT
        ];
        this.width = p.width;
        this.height = p.height;
        return sprites;
    }
    getSprite(){
        return this.currentSprite;
        return this.sprites.find(x=>x.d==this.direction)?.s;
    }
}