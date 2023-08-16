import Scene from "./Scene.js";
import TileSprite from "../Sprites/TileSprite.js";
import PixelFont from '../Sprites/PixelFont.js';
import * as gf from '../Utils/gf.js';
import MainMenuScene from './MainMenuScene.js';
export default class SceneInstructions extends Scene{
    constructor(main){
        super(main);
        this.sprites = {
            'steel' : TileSprite.getMagnified('steel',1),
            'water' : TileSprite.getMagnified('water',1),
            'grass' : TileSprite.getMagnified('grass',1),
            'player' : TileSprite.getMagnified('player',1),
            'rabbit' : TileSprite.getMagnified('rabbit',1),
            'deer' : TileSprite.getMagnified('deer',1),
            'bear' : TileSprite.getMagnified('bear',1),
            'apple' : TileSprite.getMagnified('apple',1),
            'lemon' : TileSprite.getMagnified('lemon',1),
        }
        this.pixelFont1 = new PixelFont({color:'red',size : 1});
        this.pixelFont2 = new PixelFont({color:'white',size : 2});
        this.pixelFont3 = new PixelFont({color:'white',size : 3});
        this.buffer = this.staticBuffer();
        this.y = 0;
    }
    staticBuffer(){
        var canvas = gf.makeCanvas(this.main.config.width,1200);
        let ctx = gf.getCtx(canvas);
        var liney = 64;
        var offx = 64;
        
        ctx.drawImage(this.pixelFont3.getTextSprite('GAME INSTRUCTIONS',this.sprites.steel),32,liney);
        liney+=80;
        
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";

        ctx.fillText(`you step into the legendary shoes of Robin Hood.`, offx, liney);liney+=20;
        ctx.fillText(`your mission is to make the world a better place.`, offx, liney);liney+=20;
        ctx.fillText(`- explore forest and hunt animals`, offx, liney);liney+=20;
        ctx.fillText(`- do quests and trade with merchants`, offx, liney);liney+=20;
        ctx.fillText(`- spread the wealth to the poor`, offx, liney);liney+=20;
        ctx.fillText(`- improve your stats and defend the village`, offx, liney);liney+=20;

        liney+=20;
        ctx.fillText(`controls`, offx, liney);liney+=20;
        ctx.fillText(`a/left : move left`, offx, liney);liney+=20;
        ctx.fillText(`d/right : move right`, offx, liney);liney+=20;
        ctx.fillText(`w/up : move up`, offx, liney);liney+=20;
        ctx.fillText(`s/down : move down`, offx, liney);liney+=20;
        ctx.fillText(`space : shoot arrow`, offx, liney);liney+=20;
        ctx.fillText(`e : interact with`, offx, liney);liney+=20;
        ctx.fillText(`q : open menu`, offx, liney);liney+=20;
        
        liney+=20;
        ctx.fillStyle = "green";
        ctx.fillText(`game play`, offx, liney);liney+=20;
        ctx.fillStyle = "white";
        ctx.fillText(`hunt animals in forest, rabbit, deer, bear`, offx, liney);liney+=20;
        ctx.drawImage(this.sprites.rabbit,offx,liney + 8);
        ctx.drawImage(this.sprites.deer,offx + 8,liney);
        ctx.drawImage(this.sprites.bear,offx + 8 + 16,liney);

        liney+=40;
        ctx.fillText(`harvest trees to get apples and lemons`, offx, liney);
        ctx.drawImage(this.sprites.apple,offx, liney + 8);
        ctx.drawImage(this.sprites.lemon,offx + 8, liney + 8);
        
        liney+=40;
        ctx.fillText(`things to do in town`, offx, liney);liney+=20;
        ctx.fillText(`- trade hunts with merchants`, offx, liney);liney+=20;
        ctx.fillText(`- give goodies to villagers for free (gain morale)`, offx, liney);liney+=20;
        ctx.fillText(`- take quests from villagers for extra love`, offx, liney);liney+=40;
        
        ctx.fillStyle = "green";
        ctx.fillText(`extra things to do`, offx, liney);liney+=20;
        ctx.fillStyle = "red";
        ctx.fillText(`deep into the jungle lies the old wizzard`, offx, liney);liney+=20;
        ctx.fillText(`find him and buy the magic bow`, offx, liney);liney+=20;
        ctx.fillStyle = "white";
        ctx.fillText(`more instructions can be learned in game`, offx, liney);liney+=20;

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

        ctx.drawImage(this.buffer,0,this.y);
        ctx.fillText("Time " + this.time, 20 , y); y+= h;
    }
    click(e){}
    keydown(e){}
    control(e){
        if(e === 's' || e ==='ArrowDown'){
            this.y -= 32;
        }
        else if(e === 'w' || e === 'ArrowUp'){
            this.y += 32;
        }
        else if(e === 'fire' || e === 'e' || e === 'q' || e === 'a' || e === 'ArrowLeft' || e === 'd' || e === 'ArrowRight' || e === 'space' || e === ' '){
            this.ss(new MainMenuScene(this.main));
        }
    }
    keyup(e){this.control(e.key);}

}