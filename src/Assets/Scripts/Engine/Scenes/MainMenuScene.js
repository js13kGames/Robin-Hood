import Scene from "./Scene.js";
import TileSprite from "../Sprites/TileSprite.js";
import PixelFont from '../Sprites/PixelFont.js';
import Tree from "../Sprites/Tree.js";
import * as gf from '../Utils/gf.js';
import MusicPlayer from '../Utils/MusicPlayer.js';
import KeyboardAndMouse from '../Utils/KeyboardAndMouse.js';
import SceneInstructions from "./SceneInstructions.js";
import SceneGame from "./SceneGame.js";
// const bgm = 'E3E3E3D3E3G3G3E3E3D3E3A3A3G3G3E3E3E3E3D3E3G3G3E3E3D3E3A3A3G3G3E3E3D3E3E3E3D3E3D3D3';
const bgm = 'E4E4D4E4E4D4E4G4G4A4A4E4E4D4E4E4D4E4G4G4A4A4G4G4E4E4D4E4E4D4E4A4A4';

export default class LoadingScene extends Scene{
    constructor(main){
        super(main);
        this.sprites = {
            'steel' : TileSprite.getMagnified('steel',1),
            'water' : TileSprite.getMagnified('water',1),
            'grass' : TileSprite.getMagnified('grass',1),
            'player' : TileSprite.getMagnified('player',1)
        }
        this.cursorLocations = [
            {x:100,y:32*4},// 0 new game
            {x:100,y:32*5},// 1 sound
            {x:100,y:32*6},// 2 instructions
            {x:100,y:32*7},// 3 name
        ];
        this.playername = 'robin hood';
        this.currentcursorloc = 0;
        this.pixelFont1 = new PixelFont({color:'red',size : 2});
        this.buffer = this.staticBuffer();
    }
    staticBuffer(){
        var canvas = gf.makeCanvas(this.main.config.width,this.main.config.height);
        let ctx = gf.getCtx(canvas);
        ctx.drawImage(
            this.pixelFont1.getTextSprite('PLAY GAME',this.sprites.steel),
            this.cursorLocations[0].x + 20,
            this.cursorLocations[0].y,
        );
        ctx.drawImage(
            this.pixelFont1.getTextSprite('INSTRUCTIONS',this.sprites.grass),
            this.cursorLocations[3].x + 20,
            this.cursorLocations[3].y,
        );
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
        ctx.drawImage(
            this.pixelFont1.getTextSprite(`SOUND : ${(this.musicPlayer && this.musicPlayer.playing ? 'on':'off')}`,
            this.sprites.water),
            this.cursorLocations[1].x + 20,
            this.cursorLocations[1].y
        );
        ctx.drawImage(
            this.pixelFont1.getTextSprite(`NAME : ${this.playername}`,
            this.sprites.water),
            this.cursorLocations[2].x + 20,
            this.cursorLocations[2].y
        );
        ctx.drawImage(this.sprites.player,
            this.cursorLocations[this.currentcursorloc].x,
            this.cursorLocations[this.currentcursorloc].y);
        ctx.fillText("Time " + this.time, 20 , y); y+= h;
    }
    click(e){}
    control(e){
        if(e === 's' || e ==='ArrowDown'){
            this.currentcursorloc = gf.abs(this.currentcursorloc + 1) % (this.cursorLocations.length);
        }
        else if(e === 'w' || e === 'ArrowUp'){
            this.currentcursorloc = gf.abs(this.currentcursorloc - 1) % (this.cursorLocations.length);
        }
        else if(e === 'a' || e === 'ArrowLeft' || e === 'd' || e === 'ArrowRight' || e === 'space' || e === ' '){
            if(this.currentcursorloc == 0){ //new game
                // alert('new game');
                this.main.toGameScene();
            }
            else if(this.currentcursorloc == 1){ //toggle sound
                if(!this.musicPlayer) this.musicPlayer = new MusicPlayer(bgm, 120, false, true, 2000);
                this.musicPlayer.toggle();
            }
            else if(this.currentcursorloc == 2){ //change name
                var name = prompt('name','robin');
                this.playername = name && name.length > 0 ? name.substring(0,10) : 'robin';
            }
            else if(this.currentcursorloc == 3){ // instructions
                if(this.musicPlayer) this.musicPlayer.stop();
                this.ss(new SceneInstructions(this.main));
            }
        }
    }
    keydown(e){}
    keyup(e){
        this.control(e.key);
    }
    loadingNewGameScene(){
        
    }
}