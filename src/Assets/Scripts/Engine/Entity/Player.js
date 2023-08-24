import PlayerAttribute from '../Model/PlayerAttribute.js';
import Point from '../Utils/Point.js';
import {DIRECTION} from '../Utils/gf.js';
import * as gf from '../Utils/gf.js';
import Arrow from './Arrow.js';
import Drop from './Drop.js';
import {SPRITECOLORMATRIX} from "../Sprites/SpriteMap.js";

export default class Player{
    constructor(gamescene){
        this.scene = gamescene;
        this.life = this.maxLife = 100;
        this.score = 0;
        this.cash = 0;
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
        this.ArrowsCount = 10000;
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
            this.scene.camera.fixToCords(this.center);
        }
        else{
            this.isMoving = false;
            // this.sprite = this.sprites[gf.DIRECTION.DOWN];
            // this.scene.camera.fixToCords(this.center);
        }
    }
    fire(){
        if(this.firecooldown > 0) return;
        this.firecooldown = 20 - this.attributes.ARCHERY*2;
        // console.log(this.firecooldown);
        this.ArrowsCount--;
        this.shots.push(new Arrow(this));
        this.playSwooshSound();
    }
    damageEffect(){
        this.showDamageEffect = 10;
    }
    useSword(){
        this.usingsword = 10;
    }
    applyArrowEffect(arrow){
        var center = arrow.center;
        var o = this.scene.gamemap.isObstacleAt(center.x/this.scene.tileSize,center.y/this.scene.tileSize);
        if((o == 1 || o == true) && o != 2){
            arrow.life = 0;
            this.playArrowHitSound();
        }
        for(let i = 0 ; i < this.scene.mobs.length;i++){
            var x = this.scene.mobs[i];
            var d = x.center.distanceTo(arrow.center);
            if(d < this.scene.tileSize){
                if(x.type == undefined){
                 continue;       
                }
                x.life -= arrow.life;
                if(x.life <= 0){
                    this.scene.mobs.push(new Drop(this.scene,x.center,x.type+1));
                    if(x.type == 4 || x.type == 5){
                        this.score -= x.type+1;
                    }
                    else{
                        this.score += x.type+1;
                    }
                }
                this.playArrowHitSound();
                arrow.life = 0;
            }
        }
    }
    getHealthBar(){
        var canvas = gf.makeCanvas(this.sprite.width,3);
        var ctx = gf.getCtx(canvas);
        // ctx.fillStyle = 'white';
        // ctx.fillRect(0,0,this.sprite.width,3);
        ctx.fillStyle = 'green';
        if(this.life < this.maxLife/2){
            ctx.fillStyle = 'orange';
        }
        if(this.life < this.maxLife/2){
            ctx.fillStyle = 'red';
        }
        var barw = this.sprite.width * (this.life / this.maxLife);
        // console.log(barw);
        ctx.fillRect(0,0,barw,3);
        return canvas;
    }
    draw(ctx){
        ctx.drawImage(this.sprite,this.center.x,this.center.y);
        if(this.direction == DIRECTION.DOWN){
            ctx.drawImage(this.bow,this.center.x + this.sprite.width - this.bow.width,this.center.y + this.sprite.height - this.bow.height * 1.5);
        }
        if(this.direction == DIRECTION.LEFT){
            ctx.drawImage(gf.mirror(this.bow),this.center.x + this.sprite.width - this.bow.width * 1.6,this.center.y + this.sprite.height - this.bow.height * 1.3);
        }
        if(this.direction == DIRECTION.RIGHT){
            ctx.drawImage(this.bow,this.center.x + this.sprite.width - this.bow.width * 1.2,this.center.y + this.sprite.height - this.bow.height * 1.3);
        }
        [...this.shots].forEach(obj=>{
            if(obj.draw) obj.draw(ctx);
        });
        ctx.drawImage(this.getHealthBar(),
            (this.center).x,// - (this.width)/2,
            (this.center).y,// -(this.height)/2
        );
        if(this.showDamageEffect > 0){
            ctx.fillStyle = '#ff0000aa';
            ctx.fillRect(
            (this.center).x,// - (this.width)/2,
            (this.center).y,// -(this.height)/2
            this.sprite.width,
            this.sprite.height,
        );
            this.showDamageEffect--;
        }
    }
    rotateToward(x,y){
        var dir = this.center.getDirectionTo(new Point(x,y));
        this.direction = dir;
        this.sprite = this.sprites[dir];
    }
    moveTo(x,y){
        if(this.scene.checkObstacle(x,y)) return;
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
                this.destination.move(dir,this.width);
            }
        }
        else{
            this.direction = dir;
        }
    }
    getSprites(){
        this.bow = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.bow,this.scene.scalemultiplier);
        var p = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.player,this.scene.scalemultiplier);
        var playerb = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.playerb,this.scene.scalemultiplier);
        var playersRight = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.players,this.scene.scalemultiplier);
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
    playSwooshSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const mainOscillator = audioContext.createOscillator();
        mainOscillator.type = "sawtooth"; // Experiment with different oscillator types
        mainOscillator.frequency.setValueAtTime(500, audioContext.currentTime); // Adjust frequency
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime); // Adjust initial volume
        const filter = audioContext.createBiquadFilter();
        filter.type = "lowpass"; // Apply lowpass filtering
        filter.frequency.setValueAtTime(500, audioContext.currentTime); // Adjust cutoff frequency
        mainOscillator.connect(gainNode);
        gainNode.connect(filter);
        filter.connect(audioContext.destination);
        mainOscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5); // Adjust fade-out time
        mainOscillator.stop(audioContext.currentTime + 1.0); // Adjust duration
    }
    playArrowHitSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const mainOscillator = audioContext.createOscillator();
        mainOscillator.type = "square"; // Adjust oscillator type
        mainOscillator.frequency.setValueAtTime(400, audioContext.currentTime); // Adjust frequency
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime); // Adjust initial volume
        const filter = audioContext.createBiquadFilter();
        filter.type = "lowpass"; // Apply lowpass filtering
        filter.frequency.setValueAtTime(400, audioContext.currentTime); // Adjust cutoff frequency
        mainOscillator.connect(gainNode);
        gainNode.connect(filter);
        filter.connect(audioContext.destination);
        mainOscillator.start();
        // Adjust the fade-out time and duration for arrow hit effect
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        mainOscillator.stop(audioContext.currentTime + 1.0); // Adjust duration
      }
}