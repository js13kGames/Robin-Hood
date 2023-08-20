import Scene from "./Scene.js";
import TileSprite from "../Sprites/TileSprite.js";
import PixelFont from '../Sprites/PixelFont.js';
import Tree from "../Sprites/Tree.js";
import * as gf from '../Utils/gf.js';
import MusicPlayer from '../Utils/MusicPlayer.js';
import KeyboardAndMouse from '../Utils/KeyboardAndMouse.js';
import SceneInstructions from "./SceneInstructions.js";
import MapGenerator from "../Game/MapGenerator.js";
import Camera from "../Utils/Camera.js";
import Point from "../Utils/Point.js";
import Arrow from "../Entity/Arrow.js";
import MainMenuScene from './MainMenuScene.js';
import Player from "../Entity/Player.js";
import Mob from "../Entity/Mob.js";
export default class SceneGame extends Scene{
    constructor(main){
        super(main);
        this.init();
    }
    init(){
        this.scalemultiplier = 2;
        this.keyboard = {};
        this.gamemap = new MapGenerator(this.scalemultiplier);
        this.pixelFont1 = new PixelFont({color:'white',size : 1});
        this.player = new Player(this);
        this.player.setPosition(this.gamemap.PLAYERLOCATION ? 
            this.gamemap.PLAYERLOCATION : 
            new Point(32*7,32*7));
        this.camera = new Camera(this,32*10*this.scalemultiplier,32*10*this.scalemultiplier,0,0);
        this.camera.fixToCords(this.player.center);
        this.playername = 'robin hood';
        this.mobs = [];
    }
    getPtAtRc(r,c){

    }
    drawCoordsOnCanvas(canvas){
        var rows = canvas.height / 32;
        var cols = canvas.width / 32;
        var ctx = gf.getCtx(canvas);
        ctx.fillStyle = "black";
        ctx.font = "8px Arial";
        for(let i = 0 ; i < cols;i++){
            ctx.fillText(i, i*32 , 32-8);
        }
        for(let i = 0 ; i < rows;i++){
            ctx.fillText(i,0 , i*32);
        }
    }
    checkObstacle(x,y){
        return this.gamemap.isObstacleAt(x/this.player.width,y/this.player.height);
    }
    getBuffer(){
        
        var canvas = gf.makeCanvas(this.main.config.width,this.main.config.height);
        let ctx = gf.getCtx(canvas);
        
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
        var updatedCanvas = gf.cloneCanvas(this.gamemap.mapcanvas);
        // var updatedCanvas = gf.Lightify(updatedCanvas,0.8);
        this.drawCoordsOnCanvas(updatedCanvas);
        var ctxmap = gf.getCtx(updatedCanvas);
        
        // ctxmap.drawImage(this.player.currentSprite,this.player.center.x,this.player.center.y);
        this.player.draw(ctxmap);

        var camerascene = this.camera.getCanvas(updatedCanvas);
        ctx.drawImage(camerascene,0,0);

        return canvas;
    }
    update(time){
        this.time = time;
        if(this.mobs.length < 10){
            this._spawnMob();
        }
        this.shots = this.shots.filter(s => s.life > 0);
        [...this.mobs].forEach(obj=>{
            if(obj.update) obj.update(time);
        });
        this.player.update(time);
        for(let i in this.keyboard){
            if(this.keyboard[i]){
                this.applyKeyboardKey(i);
            }
        }
    }
    _spawnMob(){
        let mob = new Mob();

        
    }

    applyKeyboardKey(e){
        if(e === ' ' || e === 'space'){
            this.player.fire();
        }
        else if(e === 'q'){
            this.prevss(this);
        }
        else if(!this.player.isMoving){
            var next_playerxy = this.player.center.clone();
            // console.log(next_playerxy);
            if(e === 's' || e ==='ArrowDown'){
                next_playerxy.move(gf.DIRECTION.DOWN,this.player.height);
            }
            else if(e === 'w' || e === 'ArrowUp'){
                next_playerxy.move(gf.DIRECTION.UP,this.player.height);
            }
            else if(e === 'd' || e === 'ArrowRight'){
                next_playerxy.move(gf.DIRECTION.RIGHT,this.player.height);
            }
            else if(e === 'a' || e === 'ArrowLeft'){
                next_playerxy.move(gf.DIRECTION.LEFT,this.player.height);
            }
            if(!this.checkObstacle(next_playerxy.x,next_playerxy.y)){
                // console.log('move player');
                this.player.moveTo(next_playerxy.x,next_playerxy.y);
            }
            else{
                console.log('obstacle at',next_playerxy);
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
        ctx.fillText("Time " + this.time, 20 , y); y+= h;
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