import PlayerAttribute from '../Model/PlayerAttribute.js';
import SpriteMap from '../Sprites/SpriteMap.js';
import Point from '../Utils/Point.js';
import {DIRECTION} from '../Utils/gf.js';
import * as gf from '../Utils/gf.js';
import Arrow from './Arrow.js';
export default class Player{
    constructor(gamescene){
        this.scene = gamescene;
        this.life = 100;
        this.score = 0;
        this.attributes = new PlayerAttribute(1);
        this.center = new Point(0,0);
        this.destination = new Point(0,0);
        this.isMoving = false;
        this.time = 0;
        this.direction = gf.DIRECTION.DOWN;
        this.sprites = this.getSprites();
        this.sprite = this.sprites[gf.DIRECTION.DOWN];
        this.shots = [];
        this.firecooldown = 0;
        this.hunts = [];
        this.ArrowsCount = 100000000;
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
            // this.sprite = this.sprites[gf.DIRECTION.DOWN];
            this.scene.camera.fixToCords(this.center);
        }
    }
    fire(){
        if(this.firecooldown > 0) return;
        this.firecooldown = 20 - this.attributes.ARCHERY*2;
        // console.log(this.firecooldown);
        this.ArrowsCount--;
        this.shots.push(new Arrow(this));
    }
    useSword(){
        this.usingsword = 10;
    }
    applyArrowEffect(arrow){
        var center = arrow.center;
        var o = this.scene.gamemap.isObstacleAt(center.x/this.scene.tileSize,center.y/this.scene.tileSize);
        if((o == 1 || o == true) && o != 2){
            arrow.life = 0;
        }
        for(let i = 0 ; i < this.scene.mobs.length;i++){
            var x = this.scene.mobs[i];
            var d = x.center.distanceTo(arrow.center);
            if(d < this.scene.tileSize){
                x.life -= arrow.life;
                if(x.life <= 0){
                    if(x.type == 4 || x.type == 5){
                        this.score -= x.type+1;
                    }
                    else{
                        this.score += x.type+1;
                    }
                }
                arrow.life = 0;
            }
        }
    }
    draw(ctx){
        ctx.drawImage(this.sprite,this.center.x,this.center.y);
        [...this.shots].forEach(obj=>{
            if(obj.draw) obj.draw(ctx);
        });
    }
    rotateToward(x,y){
        var dir = this.center.getDirectionTo(new Point(x,y));
        this.direction = dir;
        this.sprite = this.sprites[dir];
    }
    moveTo(x,y){
        var dir = this.center.getDirectionTo(new Point(x,y));
        this.direction = dir;
        var distance = this.center.distanceTo(new Point(x,y));
        if(distance==0) return;
        // console.log('moving in dir ', dir, this.center, [x,y]);
        this.sprite = this.sprites[dir];
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
        this.width = p.width;
        this.height = p.height;
        var playersRight = gf.centerCanvasOn(playersRight,this.width,this.height);
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
        return sprites;
    }
    getSprite(){
        return this.sprite;
    }
}