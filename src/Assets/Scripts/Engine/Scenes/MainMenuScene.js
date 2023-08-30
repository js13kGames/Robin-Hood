import Scene from "./Scene.js";
import * as gf from '../Utils/gf.js';
import MusicPlayer from '../Utils/MusicPlayer.js';
import Font from "../Sprites/Font.js";
const bgm = 'E4E4D4E4E4D4E4G4G4A4A4E4E4D4E4E4D4E4G4G4A4A4G4G4E4E4D4E4E4D4E4A4A4';
import {SPRITES_1} from '../Sprites/SpriteMap.js';
export default class MainMenuScene extends Scene{
    constructor(main){
        super(main);
        this.sprites = {
            'steel' :   SPRITES_1.steel,
            'water' :   SPRITES_1.water,
            'snow' :   SPRITES_1.snow,
            'grass' :   SPRITES_1.grass,
            'dirt' :    SPRITES_1.dirt,
            'magic' :   SPRITES_1.magic,
            'player' :  SPRITES_1.player,
        }
        this.textx = this.main.config.width < 400 ? 32 : 100;
        this.cursorLocations = [
            {x:this.textx,y:32*4},// 0 new game
            {x:this.textx,y:32*5},// 1 sound
            {x:this.textx,y:32*6},// 2 Music
            {x:this.textx,y:32*7},// 3 name
            {x:this.textx,y:32*8},// cheat mode
            {x:this.textx,y:32*9},
            {x:this.textx,y:32*10},//god mode
        ];
        this.playername = 'robin hood';
        this.currentcursorloc = 0;
        this.sound = false;
        this.cheatmode = false;
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
        var ff = 'Verdana';
        var cc = 'green';
        ctx.drawImage(
            Font.get('█ ⓅⓁⒶⓎ ⒼⒶⓂⒺ',24,cc,this.sprites.grass,ff),
            this.cursorLocations[0].x + 20,
            this.cursorLocations[0].y,
        );
        ctx.drawImage(
            Font.get(`█ SOUND : ${(this.sound && this.sound == true ? 'on':'off')}`,24,cc,this.sprites.water,ff),
            this.cursorLocations[1].x + 20,
            this.cursorLocations[1].y
        );
        ctx.drawImage(
            Font.get(`█ Music : ${(this.musicPlayer && this.musicPlayer.playing ? 'on':'off')}`,24,cc,this.sprites.water,ff),
            this.cursorLocations[2].x + 20,
            this.cursorLocations[2].y
        );
        
        ctx.drawImage(
            Font.get(`█ NAME : ${this.playername}`,24,cc,this.sprites.water,ff),
            this.cursorLocations[3].x + 20,
            this.cursorLocations[3].y
        );
        ctx.drawImage(
            Font.get(`█ Cheatmode : ${(this.cheatmode ? 'on':'off')}`,24,cc,this.sprites.snow,ff),
            this.cursorLocations[4].x + 20,
            this.cursorLocations[4].y
        );
        ctx.drawImage(
            Font.get('█ STATS ㋡',24,cc,this.sprites.dirt,ff),
            this.cursorLocations[5].x + 20,
            this.cursorLocations[5].y,
            );
        ctx.drawImage(
            Font.get(`█ GOD MODE : ${(this.godmode ? 'on':'off')}`,24,cc,this.sprites.snow,ff),
            this.cursorLocations[6].x + 20,
            this.cursorLocations[6].y
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
            if(this.currentcursorloc == 0) this.currentcursorloc = this.cursorLocations.length-1;
            else this.currentcursorloc = gf.abs(this.currentcursorloc - 1) % (this.cursorLocations.length);
        }
        else if(e === 'a' || e === 'ArrowLeft' || e === 'd' || e === 'ArrowRight' || e === 'space' || e === ' '){
            if(this.currentcursorloc == 0){ //new game
                if(!this.main.gamescene){
                    var c = confirm('start new game?');
                    if(c) this.main.toGameScene();
                }
                else{
                    this.main.toGameScene();
                }
            }
            else if(this.currentcursorloc == 1){ //toggle music
                if(this.sound) this.sound = false;
                else this.sound = true;
            }
            else if(this.currentcursorloc == 2){ //toggle sound
                if(!this.musicPlayer) this.musicPlayer = new MusicPlayer(bgm, 120, false, true, 2000);
                this.musicPlayer.toggle();
            }
            else if(this.currentcursorloc == 3){ //change name
                var name = prompt('name',this.playername);
                this.playername = name && name.length > 0 ? name.substring(0,10) : this.playername;
            }
            else if(this.currentcursorloc == 4){ //use cheat
                this.cheatmode = true;
                if(this.main.gamescene){
                    this.main.gamescene.player.cash = 10_000_000;
                }
            }
            else if(this.currentcursorloc == 5){ //stats page
                if(this.musicPlayer) this.musicPlayer.stop();
                if(this.main.gamescene){
                    this.main.toSceneStats();
                }
                else{
                    alert('start game before using this page');
                }
            }
            else if(this.currentcursorloc == 6){ //use cheat
                this.godmode = true;
                if(this.main.gamescene){
                    this.main.gamescene.player.enableGodMode();
                }
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