import Scene from "./Scene.js";
import TileSprite from "../Sprites/TileSprite.js";
import PixelFont from '../Sprites/PixelFont.js';
import Tree from "../Sprites/Tree.js";
import * as gf from '../Utils/gf.js';
import MusicPlayer from '../Utils/MusicPlayer.js';
import KeyboardAndMouse from '../Utils/KeyboardAndMouse.js';
import SceneInstructions from "./SceneInstructions.js";
import MapGenerator from "../Game/MapGenerator.js";
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

        this.gamemap = new MapGenerator(8);


        // this.water_row = gf.Lightify(gf.repeatCanvas(this.sprites.water2,2,36),0.9);
        // this.dirt_row = gf.Lightify(gf.repeatCanvas(this.sprites.dirt2,2,36),0.9);
        // this.grass_row = gf.Lightify(gf.repeatCanvas(this.sprites.grass2,2,36),0.9);

        this.playername = 'robin hood';
        this.playerxy = {x: 96, y: 64};

        this.currentcursorloc = 0;
        this.pixelFont1 = new PixelFont({color:'white',size : 1});
        this.buffer = this.staticBuffer();
    }
    staticBuffer(){
        var canvas = gf.makeCanvas(this.main.config.width,this.main.config.height);
        let ctx = gf.getCtx(canvas);


        // ctx.drawImage(this.water_row,0,0);
        // ctx.drawImage(this.dirt_row,0,32);
        // ctx.drawImage(this.dirt_row,0,32*2);
        // ctx.drawImage(this.grass_row,0,32*3);
        // ctx.drawImage(this.grass_row,0,32*4);

        ctx.drawImage(this.gamemap.mapcanvas,0,0);
        ctx.drawImage(this.sprites.house,0,0);
        ctx.drawImage(this.pixelFont1.getTextSprite('HOUSE'),14, 56,);

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
        ctx.drawImage(this.buffer,0,0);
        ctx.drawImage(this.sprites.player,this.playerxy.x,this.playerxy.y);


        ctx.fillText("Time " + this.time, 20 , y); y+= h;
    }
    click(e){}
    control(e){
        if(e === 's' || e ==='ArrowDown'){
            this.playerxy.y+= 32;
        }
        else if(e === 'w' || e === 'ArrowUp'){
            this.playerxy.y-= 32;
        }
        else if(e === 'd' || e === 'ArrowRight'){
            this.playerxy.x += 32;
        }
        else if(e === 'a' || e === 'ArrowLeft'){
            this.playerxy.x -= 32;
        }
        else if(e === ' ' || e === 'space'){
            
        }
        else if(e === 'q'){
            
        }
        console.log(this.playerxy);
    }
    keydown(e){}
    keyup(e){
        this.control(e.key);
    }

}