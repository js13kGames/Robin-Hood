import Scene from "./Scene.js";
import * as gf from '../Utils/gf.js';
import MusicPlayer from '../Utils/MusicPlayer.js';
import Font from "../Sprites/Font.js";
import {SPRITECOLORMATRIX,SPRITES_1} from '../Sprites/SpriteMap.js';
import PlayerAttribute from "../Model/PlayerAttribute.js";
export default class SceneStats extends Scene{
    constructor(main){
        super(main);
        this.sprites = {
            'steel' :   SPRITES_1.steel,
            'water' :   SPRITES_1.water,
            'grass' :   SPRITES_1.grass,
            'dirt' :    SPRITES_1.dirt,
            'magic' :   SPRITES_1.magic,
            'player' :  SPRITES_1.player,
        }
        this.textx = this.main.config.width < 400 ? 32 : 100;
        
        this.gamescene = this.main.gamescene;
        // this.attributes = new PlayerAttribute();
        this.attributes = this.gamescene.player.attributes;
        console.log(this.gamescene);
        this.cursorLocations = [];
        this.attrStatMenu = this.attributes.getStatMenu();
        for(let i in this.attrStatMenu){
            this.cursorLocations.push({
                x:this.textx,
                y:32*6+ 32*(i),
                k:this.attrStatMenu[i].n,
            });
        }
        console.log(this.attrStatMenu);
        console.log(this.cursorLocations);
        // this.cursorLocations = [
        //     {x:this.textx,y:32*4},// 0 new game
        //     {x:this.textx,y:32*5},// 1 sound
        //     {x:this.textx,y:32*6},// 2 Music
        //     {x:this.textx,y:32*7},// 3 name
        //     {x:this.textx,y:32*8},// 4 instructions
        // ];

        this.currentcursorloc = 0;

    }

    update(time){
        this.time = time;
    }
    getText(text,sprite){
        return Font.get(text,24,'white',sprite || this.sprites.grass)
    }
    draw(ctx){
        let h = 20;
        let y = 20;
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "green";
        ctx.font = "16px Arial";
        var x1 = this.cursorLocations[0];
        var xs = x1.x+20;
        ctx.drawImage( this.getText(`████ STATISTICS ████`),xs, x1.y-64);
        ctx.drawImage( this.getText(`POINTS ${this.gamescene.player.score}`),xs, x1.y-32);


        for(let i in this.cursorLocations){
            var cl = this.cursorLocations[i];
            ctx.drawImage( this.getText(`${cl.k} ${this.attributes.getAttrByName(cl.k)}`),xs, cl.y);
        }
        

        // ctx.drawImage(
        //     Font.get(`█ SOUND : ${(this.sound && this.sound == true ? 'on':'off')}`,24,'green',this.sprites.water),
        //     this.cursorLocations[1].x + 20,
        //     this.cursorLocations[1].y
        // );
        // ctx.drawImage(
        //     Font.get(`█ Music : ${(this.musicPlayer && this.musicPlayer.playing ? 'on':'off')}`,24,'green',this.sprites.water),
        //     this.cursorLocations[2].x + 20,
        //     this.cursorLocations[2].y
        // );
        // ctx.drawImage(
        //     Font.get(`█ NAME : ${this.playername}`,24,'green',this.sprites.water),
        //     this.cursorLocations[3].x + 20,
        //     this.cursorLocations[3].y
        // );
        // ctx.drawImage(
        //     Font.get('█ STATS ㋡',24,'green',this.sprites.dirt,'Roboto'),
        //     this.cursorLocations[4].x + 20,
        //     this.cursorLocations[4].y,
        // );


        ctx.drawImage(this.sprites.player,
            this.cursorLocations[this.currentcursorloc].x,
            this.cursorLocations[this.currentcursorloc].y+4);
        ctx.fillText("Time " + this.time, 20 , y); y+= h;
    }
    click(e){}
    control(e){
        if(e === 'q'){
            this.main.toMainMenuScene();
        }
        else if(e === 's' || e ==='ArrowDown'){
            if(this.currentcursorloc == 0) this.currentcursorloc = this.cursorLocations.length-1;
            else this.currentcursorloc = gf.abs(this.currentcursorloc - 1) % (this.cursorLocations.length);
        }
        else if(e === 'w' || e === 'ArrowUp'){
            this.currentcursorloc = gf.abs(this.currentcursorloc - 1) % (this.cursorLocations.length);
        }
        else if(e == 'd' || e == 'ArrowRight'){

        }
        else if(e === 'a' || e === 'ArrowLeft' || e === 'd' || e === 'ArrowRight' || e === 'space' || e === ' '){
            

            /*if(this.currentcursorloc == 0){ //new game
                this.main.toGameScene();
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
            else if(this.currentcursorloc == 4){ //stats page
                if(this.musicPlayer) this.musicPlayer.stop();
                alert('under construction');
            }
            */
        }
    }
    keydown(e){}
    keyup(e){
        this.control(e.key);
    }
    loadingNewGameScene(){
        
    }
}