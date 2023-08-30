import Scene from "./Scene.js";
import * as gf from '../Utils/gf.js';
import MapGenerator from "../Game/MapGenerator.js";
import Camera from "../Utils/Camera.js";
import Point from "../Utils/Point.js";
import Player from "../Entity/Player.js";
import Mob from "../Entity/Mob.js";
import Pathfinder from "../Model/Pathfinder.js";
import { SPRITES_1 } from "../Sprites/SpriteMap.js";

export default class SceneGame extends Scene{
    constructor(main){
        super(main);
        this.init();
    }
    init(){
        this.difficulity = 1;
        this.MOBCOUNT = 5;
        this.scalemultiplier = 2;
        this.tileSize = 16 * this.scalemultiplier;
        this.keyboard = {};
        this.gamemap = new MapGenerator(this,this.scalemultiplier);

        this.miniMap = gf.Lightify(this.gamemap.map,0.7);

        this.player = new Player(this);
        if(this.main.mainmenuscene.cheatmode){
            this.player.cash = 10_000_000;
        }
        if(this.main.mainmenuscene.godmode){
            this.player.enableGodMode();
        }
        this.player.setPosition(this.gamemap.PLAYERLOCATION ? this.gamemap.PLAYERLOCATION : new Point(32*7,32*7));
        this.camera = new Camera(this, this.main.config.width, this.main.config.height,0,0);
        this.camera.mapToPoint(this.player.center);
        this.playername = 'robin hood';

        this.VILLAGERS = [...this.gamemap.VILLAGERS];
        this.BUILDINGS = [...this.gamemap.BUILDINGS];
        this.mobs = [];
        this.drops = [];

        this.pathMatrix = this.gamemap.pathMatrix;
        this.pathFinder = new Pathfinder(this.pathMatrix);

        this.validSpawnPointsForMobs = this.findValidSpawnPointInMap();
        this.spawnPointsTest = this.findAllValidSpawnPoint();
        this._spawnMobs();
        
    }
    haveEntityAt(x,y){
        x = Math.floor(x);
        y = Math.floor(y);
        var pt = new Point(x,y);
        for(let i = 0 ; i < this.VILLAGERS.length;i++){
            var mob = this.VILLAGERS[i];
            var d = mob.center.distanceTo(pt);
            if(d < this.tileSize){
                return mob;
            }
        }
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
        [...this.mobs].forEach(obj=>{if(obj.draw) obj.draw(ctxmap);});
        [...this.VILLAGERS].forEach(obj=>{if(obj.draw) obj.draw(ctxmap);});
        [...this.BUILDINGS].forEach(obj=>{if(obj.draw) obj.draw(ctxmap);});
        this.player.draw(ctxmap);
        if(this.pathToGo){
            for(let i in this.pathToGo){
                ctx.drawImage(gf.Lightify(this.player.sprite,.8),
                    this.pathToGo[i][0] * this.tileSize,
                    this.pathToGo[i][1] * this.tileSize,
                );
            }
        }
        var camerascene = this.camera.getCanvas(updatedCanvas);
        ctx.drawImage(camerascene,0,0);
        return canvas;
    }
    update(time){
        this.time = time;
        
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
            this.player.life = 100;
            this.main.toMainMenuScene();
        }
        if(this.pathToGo && this.pathToGo.length > 0){
            var pt = this.pathToGo.shift();
            this.player.center = new Point(pt[0] * this.tileSize,pt[1] * this.tileSize);
        }
        if(this.mobs.length <=0){
            this.MOBCOUNT += 5;
            this.difficulity++;
            this._spawnMobs();
        }
        [...this.BUILDINGS].forEach(obj=>{if(obj.update) obj.update(time);});
    }
    _spawnMobs(){
        for(let i = 0; i < this.MOBCOUNT;i++){
            if(this.mobs.length > this.MOBCOUNT) return;
            let mob = new Mob(this,gf.randInt(0,3));
            this.mobs.push(mob);
        }
    }
    findValidSpawnPointInMap(){
        var pointsList = [];
        for(let i = 0; i < this.gamemap.colorMatrix.length ;i++){
            for(let j = 0;j < this.gamemap.colorMatrix.length;j++){
                var pt = new Point(i*this.tileSize,j*this.tileSize);
                var obstacle = this.gamemap.isObstacleAt(i,j);
                if(!obstacle){
                    pointsList.push(pt);
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
    interactWithFacingEntity(){
        var pt = this.player.center.moveClone(this.player.direction,this.tileSize);
        var e = this.haveEntityAt(pt.x,pt.y);
        if(e && e.interact){
            e.interact();
        }
        else{
            console.log(e);
        }
    }
    applyKeyboardKey(e){
        if(e === ' ' || e === 'space'){
            this.player.fire();
        }
        if(e === 'f'){
            this.player.useSword();
        }
        if(e === 'e'){
            // this.player.fire();
            this.interactWithFacingEntity();
            this.keyboard={};
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
                var dir = this.player.center.getDirectionTo(next_playerxy);
                this.player.rotateToward(next_playerxy.x,next_playerxy.y);
                if(dir != this.player.direction){
                    this.player.rotateToward(next_playerxy.x,next_playerxy.y);
                    this.keyboard={};
                }
                else{
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
        ctx.fillRect(0,0,ctx.canvas.width,48);
        ctx.fillStyle = '#ffffff';
        ctx.fillText("♥ " + gf.getNumAsText(this.player.life), 15,15);
        ctx.fillText("⊕ " + gf.getNumAsText(this.player.score), 15,30);
        ctx.fillText("☺" + gf.getNumAsText(this.player.points), 15,45);
        
        ctx.fillText("➹\t" + gf.getNumAsText(this.player.ArrowsCount), 64*1.5,15);
        ctx.fillText("Ֆ\t" + gf.getNumAsText(this.player.cash), 64*1.5,30);
        
        ctx.fillText("Mobs " + gf.getNumAsText(this.mobs.length), 64*3,15);
        ctx.fillText("LVL " + gf.getNumAsText(this.difficulity), 64*3,30);

        ctx.drawImage(SPRITES_1.apple,64*5 - 4,4);
        ctx.drawImage(SPRITES_1.lemon,64*5 - 4,20);
        ctx.fillText("   " + gf.getNumAsText(this.player.apples), 64*5,15);
        ctx.fillText("   " + gf.getNumAsText(this.player.oranges), 64*5,30);


        ctx.drawImage(this.miniMap,0,ctx.canvas.height-this.miniMap.height);
        Point.drawCircle(ctx,
            this.player.center.x/this.tileSize,
            ctx.canvas.height-this.miniMap.height + this.player.center.y/this.tileSize,
            3,'green');
        // ctx.fillText("Time " + this.time, 20 , y); y+= h;
    }
    click(e){
        var ts = this.tileSize;
        var x = e.offsetX;//parseInt(e.offsetX/ts) * ts;
        var y = e.offsetY;//parseInt(e.offsetY/ts) * ts;
        var camxy = this.camera.getFxy(x,y,ts);
        var dest = new Point(camxy.x,camxy.y);
        //this.player.direction = this.player.center.getDirectionTo(dest);
        const path = this.pathFinder.findPath(
            this.player.center.x/ts,
            this.player.center.y/ts,
            dest.x/ts,
            dest.y/ts,
        );
        // this.pathToGo = path;
        console.log(path);
        // var destnext = this.player.center.moveClone(this.player.direction,this.player.height);
        // this.player.moveTo(destnext.x,destnext.y);
        // this.player.destination = dest;
    }
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