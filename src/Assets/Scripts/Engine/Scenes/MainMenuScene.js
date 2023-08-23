import Scene from "./Scene.js";
import TileSprite from "../Sprites/TileSprite.js";
import Tree from "../Sprites/Tree.js";
import * as gf from '../Utils/gf.js';
import MusicPlayer from '../Utils/MusicPlayer.js';
import KeyboardAndMouse from '../Utils/KeyboardAndMouse.js';
import SceneInstructions from "./SceneInstructions.js";
import SceneGame from "./SceneGame.js";
import Font from "../Sprites/Font.js";
// const bgm = 'E3E3E3D3E3G3G3E3E3D3E3A3A3G3G3E3E3E3E3D3E3G3G3E3E3D3E3A3A3G3G3E3E3D3E3E3E3D3E3D3D3';
const bgm = 'E4E4D4E4E4D4E4G4G4A4A4E4E4D4E4E4D4E4G4G4A4A4G4G4E4E4D4E4E4D4E4A4A4';

export default class LoadingScene extends Scene{
    constructor(main){
        super(main);
        this.sprites = {
            'steel' : TileSprite.getMagnified('steel',1),
            'water' : TileSprite.getMagnified('water',1),
            'grass' : TileSprite.getMagnified('grass',1),
            'dirt' : TileSprite.getMagnified('dirt',1),
            'magic' : TileSprite.getMagnified('magic',1),
            'player' : TileSprite.getMagnified('player',1)
        }
        var textx = 100;
        if(this.main.config.width < 400){
            textx = 32;
        }
        this.cursorLocations = [
            {x:textx,y:32*4},// 0 new game
            {x:textx,y:32*5},// 1 sound
            {x:textx,y:32*6},// 2 Music
            {x:textx,y:32*7},// 2 instructions
            {x:textx,y:32*8},// 3 name
        ];
        this.playername = 'robin hood';
        this.currentcursorloc = 0;
        this.sound = false;
        this.buffer = this.staticBuffer();
    }
    staticBuffer(){
        var canvas = gf.makeCanvas(this.main.config.width,this.main.config.height);
        let ctx = gf.getCtx(canvas);

        
        
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
            Font.getSpriteForText('█ ⓅⓁⒶⓎ ⒼⒶⓂⒺ',24,'green',this.sprites.grass,'Verdana'),
            this.cursorLocations[0].x + 20,
            this.cursorLocations[0].y,
        );
        ctx.drawImage(
            Font.getSpriteForText('█ INSTRUCTIONS ㋡',24,'green',this.sprites.dirt,'Roboto'),
            this.cursorLocations[1].x + 20,
            this.cursorLocations[1].y,
        );
        ctx.drawImage(
            Font.getSpriteForText(`█ Music : ${(this.musicPlayer && this.musicPlayer.playing ? 'on':'off')}`,24,'green',this.sprites.water,'Verdana'),
            this.cursorLocations[2].x + 20,
            this.cursorLocations[2].y
        );
        ctx.drawImage(
            Font.getSpriteForText(`█ SOUND : ${(this.sound && this.sound == true ? 'on':'off')}`,24,'green',this.sprites.water,'Verdana'),
            this.cursorLocations[3].x + 20,
            this.cursorLocations[3].y
        );
        ctx.drawImage(
            Font.getSpriteForText(`█ NAME : ${this.playername}`,24,'green',this.sprites.water,'Verdana'),
            this.cursorLocations[4].x + 20,
            this.cursorLocations[4].y
        );
        ctx.drawImage(this.sprites.player,
            this.cursorLocations[this.currentcursorloc].x,
            this.cursorLocations[this.currentcursorloc].y+4);
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
                this.main.toGameScene();
            }
            else if(this.currentcursorloc == 3){ //toggle music
                if(this.sound) this.sound = false;
                else this.sound = true;
            }
            else if(this.currentcursorloc == 2){ //toggle sound
                if(!this.musicPlayer) this.musicPlayer = new MusicPlayer(bgm, 120, false, true, 2000);
                this.musicPlayer.toggle();
            }
            else if(this.currentcursorloc == 4){ //change name
                var name = prompt('name',this.playername);
                this.playername = name && name.length > 0 ? name.substring(0,10) : 'robin';
            }
            else if(this.currentcursorloc == 2){ // instructions
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