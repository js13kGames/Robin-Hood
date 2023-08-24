import Scene from "./Scene.js";
import * as gf from '../Utils/gf.js';
import MapGenerator from "../Game/MapGenerator.js";
import Camera from "../Utils/Camera.js";
import Point from "../Utils/Point.js";
import Player from "../Entity/Player.js";
import Mob from "../Entity/Mob.js";

const MOBCOUNT = 35;
export default class SceneGame extends Scene{
    constructor(main){
        super(main);
        this.init();
    }
    init(){
        this.difficulity = 1;
        this.scalemultiplier = 2;
        this.tileSize = 16 * this.scalemultiplier;
        this.keyboard = {};
        this.gamemap = new MapGenerator(this,this.scalemultiplier);
        this.player = new Player(this);
        this.player.setPosition(this.gamemap.PLAYERLOCATION ? 
            this.gamemap.PLAYERLOCATION : 
            new Point(32*7,32*7));
        this.camera = new Camera(this,
            this.main.config.width,
            this.main.config.height,
            0,0);
        this.camera.mapToPoint(this.player.center);
        this.playername = 'robin hood';
        this.mobs = [...this.gamemap.presetmobs];
        this.drops = [];
        this.validSpawnPointsForMobs = this.findValidSpawnPointInMap();
        this.spawnPointsTest = this.findAllValidSpawnPoint();
    }
    haveEntityAt(x,y){
        var pt = new Point(x,y);
        for(let i = 0 ; i < this.mobs.length;i++){
            var mob = this.mobs[i];
            var d = mob.center.distanceTo(pt);
            if(d < this.tileSize){
                return mob;
            }
        }
        return null;
    }
    checkObstacle(x,y){

    }
    checkObstacle(x,y){
        var mob = this.haveEntityAt(x,y);
        if(mob != null) return true;
        return this.gamemap.isObstacleAt(x/this.tileSize,y/this.tileSize);
    }
    getBuffer(){
        
        var canvas = gf.makeCanvas(this.main.config.width,this.main.config.height);
        let ctx = gf.getCtx(canvas);
        
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
        var updatedCanvas = gf.cloneCanvas(this.gamemap.mapcanvas);
        // var updatedCanvas = gf.Lightify(updatedCanvas,0.8);
        var ctxmap = gf.getCtx(updatedCanvas);
        
        // ctxmap.drawImage(this.player.currentSprite,this.player.center.x,this.player.center.y);
        [...this.mobs].forEach(obj=>{
            if(obj.update) obj.draw(ctxmap);
        });
        this.player.draw(ctxmap);
        var camerascene = this.camera.getCanvas(updatedCanvas);
        ctx.drawImage(camerascene,0,0);
        return canvas;
    }
    update(time){
        this.time = time;
        if(this.mobs.length < MOBCOUNT){
            this._spawnMob();
        }
        [...this.mobs].forEach(obj=>{
            if(obj.update) obj.update(time);
        });
        this.mobs = this.mobs.filter(s => s.life > 0);
        this.player.update(time);
        for(let i in this.keyboard){
            if(this.keyboard[i]){
                this.applyKeyboardKey(i);
            }
        }
        if(this.player.life <= 0){
            alert('game over');
            this.main.gamescene = null;
            this.main.toMainMenuScene();
        }
    }
    _spawnMob(){
        if(this.mobs.length > MOBCOUNT) return;
        let mob = new Mob(this,gf.randInt(0,3));
        this.mobs.push(mob);
    }
    findValidSpawnPointInMap(){
        var pointsList = [];
        for(let i = 0; i < this.gamemap.colorMatrix.length ;i++){
            for(let j = 0;j < this.gamemap.colorMatrix.length;j++){
                var pt = new Point(i*this.tileSize,j*this.tileSize);
                var obstacle = this.gamemap.isObstacleAt(i,j);
                if(!obstacle){
                    pointsList.push(pt);
                    // this.spawnPointsTest.push(pt);
                }
            }
        }
        return pointsList;
    }
    findAValidSpawnPoint(near = 8,far = 13){
        var points = this.findAllValidSpawnPoint(near,far);
        if(points.length > 0){
            return points[gf.randInt(0,points.length)]
        }
        return new Point(this.tileSize,this.tileSize);
    }
    findAllValidSpawnPoint(near = 8,far = 13){
        var validpoints = this.validSpawnPointsForMobs;
        validpoints = validpoints.filter(x=>x.distanceTo(this.player.center) > this.tileSize * near);
        validpoints = validpoints.filter(x=>x.distanceTo(this.player.center) < this.tileSize * far);
        var validated = [];
        for(let j in validpoints){
            var valid = true;
            for(let i = 0 ; i < this.mobs.length;i++){
                var mob = this.mobs[i];
                var d = mob.center.distanceTo(new Point(validpoints[j].x,validpoints[j].y));
                if(d < this.tileSize){
                    valid = false;
                    break;
                }
            }
            if(valid){
                validated.push(validpoints[j]);
            }
        }
        
        return validpoints;
    }
    applyKeyboardKey(e){
        if(e === ' ' || e === 'space'){
            this.player.fire();
        }
        if(e === ' ' || e === 'f'){
            this.player.useSword();
        }
        if(e === ' ' || e === 'e'){
            // this.player.fire();
        }
        else if(e === 'q'){
            this.keyboard['q'] = false; 
            this.main.toMainMenuScene();
        }
        else if(!this.player.isMoving){
            var next_playerxy = this.player.center.clone();
            // console.log(next_playerxy);
            var move = false;
            if(e === 's' || e ==='ArrowDown'){
                next_playerxy.move(gf.DIRECTION.DOWN,this.player.height);move=true;
            }
            else if(e === 'w' || e === 'ArrowUp'){
                next_playerxy.move(gf.DIRECTION.UP,this.player.height);move=true;
            }
            else if(e === 'd' || e === 'ArrowRight'){
                next_playerxy.move(gf.DIRECTION.RIGHT,this.player.height);move=true;
            }
            else if(e === 'a' || e === 'ArrowLeft'){
                next_playerxy.move(gf.DIRECTION.LEFT,this.player.height);move=true;
            }
            if(move){
                if(!this.checkObstacle(next_playerxy.x,next_playerxy.y)){
                    // console.log('move player');
                    this.player.moveTo(next_playerxy.x,next_playerxy.y);
                }
                else{
                    this.player.rotateToward(next_playerxy.x,next_playerxy.y);
                    // console.log('obstacle at',next_playerxy);
                }
            }
            
        }
        
    }
    draw(ctx){
        let h = 20;
        let y = 20;
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "green";
        ctx.font = "16px Arial";
        ctx.drawImage(this.getBuffer(),0,0);

        ctx.fillStyle = '#004b52d6';
        ctx.fillRect(0,0,ctx.canvas.width,32);
        ctx.fillStyle = '#ffffff';
        ctx.fillText("LIFE " + this.player.life, 15,15);
        ctx.fillText("SCORE " + this.player.score, 15,30);
        
        ctx.fillText("Arrows " + gf.getNumAsText(this.player.ArrowsCount), 64*3,15);

        // ctx.fillText("Time " + this.time, 20 , y); y+= h;
    }
    click(e){}
    control(e){
        this.applyKeyboardKey(e);
    }
    keydown(e){
        this.keyboard[e.key] = true;
    }
    keyup(e){
        this.keyboard[e.key] = false;
    }

}