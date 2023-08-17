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
const bgm = 'E3E3E3D3E3G3G3E3E3D3E3A3A3G3G3E3E3E3E3D3E3G3G3E3E3D3E3A3A3G3G3E3E3D3E3E3E3D3E3D3D3';
// const bgm = 'E4E4D4E4E4D4E4G4G4A4A4E4E4D4E4E4D4E4G4G4A4A4G4G4E4E4D4E4E4D4E4A4A4';

export default class SceneGame extends Scene{
    constructor(main){
        super(main);
        this.init();
    }
    init(){
        this.keyboard = {};
        this.sprites = {
            'steel' : TileSprite.getMagnified('steel',1),
            'water' : TileSprite.getMagnified('water',1),
            'grass' : TileSprite.getMagnified('grass',1),
            'player' : TileSprite.getMagnified('player',2),
            'house' : TileSprite.getMagnified('house',6),
            'water2' : TileSprite.getMagnified('water',2),
            'dirt2' : TileSprite.getMagnified('dirt',2),
            'grass2' : TileSprite.getMagnified('grass',2),
        }
        this.pixelFont1 = new PixelFont({color:'white',size : 1});
        this.playerxy = new Point(32*7,32*7);
        this.gamemap = new MapGenerator(16);
        var mapctx = gf.getCtx(this.gamemap.canvas);
        mapctx.drawImage(this.sprites.house,this.playerxy.x-64,this.playerxy.y-64);
        mapctx.drawImage(this.pixelFont1.getTextSprite('HOUSE'),this.playerxy.x-64+14, this.playerxy.y-64+56,);
        this.camera = new Camera(this,32*16,32*16,0,0);
        this.camera.fixToCords(this.playerxy);
        this.playername = 'robin hood';
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
        var color = this.gamemap.colorMatrix[x/32][y/32];
        return color == '#2979ff' || color == '#1b9e00';
    }
    getMapItem(x,y){
        x = x/32;
        y = y/32;
        var color = this.gamemap.colorMatrix[x][y];
        return {c:color,o : color == '#2979ff' || color == '#1b9e00'}
    }
    getBuffer(){
        var canvas = gf.makeCanvas(this.main.config.width,this.main.config.height);
        let ctx = gf.getCtx(canvas);
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
        var updatedCanvas = gf.cloneCanvas(this.gamemap.mapcanvas);
        var updatedCanvas = gf.Lightify(updatedCanvas,0.8);
        this.drawCoordsOnCanvas(updatedCanvas);
        var ctxmap = gf.getCtx(updatedCanvas);
        ctxmap.drawImage(this.sprites.player,this.playerxy.x,this.playerxy.y);
        var camerascene = this.camera.getCanvas(updatedCanvas);
        ctx.drawImage(camerascene,0,0);

        return canvas;
    }
    update(time){
        this.time = time;
        for(let i in this.keyboard){
            if(this.keyboard[i]){
                this.applyKeyboardKey(i);
            }
        }
    }
    applyKeyboardKey(e){
        var next_playerxy = new Point(this.playerxy.x,this.playerxy.y);
        
        
        if(e === 's' || e ==='ArrowDown'){
            
            next_playerxy.y += this.sprites.player.width;
        }
        else if(e === 'w' || e === 'ArrowUp'){
            next_playerxy.y -= this.sprites.player.width;
        }
        else if(e === 'd' || e === 'ArrowRight'){
            next_playerxy.x += this.sprites.player.width;
        }
        else if(e === 'a' || e === 'ArrowLeft'){
            next_playerxy.x -= this.sprites.player.width;
        }
        else if(e === ' ' || e === 'space'){
            
        }
        else if(e === 'q'){
            
        }
        if(!this.checkObstacle(next_playerxy.x,next_playerxy.y)){
            this.playerxy = new Point(next_playerxy.x,next_playerxy.y);
            this.camera.fixToCords(this.playerxy);
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