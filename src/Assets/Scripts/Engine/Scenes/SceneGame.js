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


        this.gamemap = new MapGenerator(8);
        var mapctx = gf.getCtx(this.gamemap.canvas);

        mapctx.drawImage(this.sprites.house,this.playerxy.x-64,this.playerxy.y-64);
        mapctx.drawImage(this.pixelFont1.getTextSprite('HOUSE'),this.playerxy.x-64+14, this.playerxy.y-64+56,);

        this.camera = new Camera(this,32*16,32*16,0,0);
        this.camera.fixToCords(this.playerxy);

        // this.water_row = gf.Lightify(gf.repeatCanvas(this.sprites.water2,2,36),0.9);
        // this.dirt_row = gf.Lightify(gf.repeatCanvas(this.sprites.dirt2,2,36),0.9);
        // this.grass_row = gf.Lightify(gf.repeatCanvas(this.sprites.grass2,2,36),0.9);
        this.playername = 'robin hood';
    }
    getPtAtRc(r,c){

    }
    getBuffer(){
        var canvas = gf.makeCanvas(this.main.config.width,this.main.config.height);
        let ctx = gf.getCtx(canvas);
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);

        // ctx.drawImage(this.water_row,0,0);
        // ctx.drawImage(this.dirt_row,0,32);
        // ctx.drawImage(this.dirt_row,0,32*2);
        // ctx.drawImage(this.grass_row,0,32*3);
        // ctx.drawImage(this.grass_row,0,32*4);
        var updatedCanvas = gf.cloneCanvas(this.gamemap.mapcanvas);
        var fieldCanvasReduced = gf.Lightify(updatedCanvas,0.8);
        var ctxmap = gf.getCtx(fieldCanvasReduced);
        ctxmap.drawImage(this.sprites.player,this.playerxy.x,this.playerxy.y);

        var camerascene = this.camera.getCanvas(fieldCanvasReduced);
        ctx.drawImage(camerascene,0,0);

        return canvas;
    }
    update(time){
        this.time = time;
        
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
        if(e === 's' || e ==='ArrowDown'){
            this.playerxy.y += this.sprites.player.width;
        }
        else if(e === 'w' || e === 'ArrowUp'){
            this.playerxy.y -= this.sprites.player.width;
        }
        else if(e === 'd' || e === 'ArrowRight'){
            this.playerxy.x += this.sprites.player.width;
        }
        else if(e === 'a' || e === 'ArrowLeft'){
            this.playerxy.x -= this.sprites.player.width;
        }
        else if(e === ' ' || e === 'space'){
            
        }
        else if(e === 'q'){
            
        }
        this.camera.fixToCords(this.playerxy);
        console.log(this.playerxy, this.camera.center);
    }
    keydown(e){}
    keyup(e){
        this.control(e.key);
    }

}