import Scene from "./Scene.js";
import TileSprite from "../Sprites/TileSprite.js";
import PixelFont from '../Sprites/PixelFont.js';
import Tree from "../Sprites/Tree.js";
import * as gf from '../Utils/gf.js';
export default class LoadingScene extends Scene{
    constructor(main){
        super(main);
        this.buffer = gf.makeCanvas(this.main.config.width,this.main.config.height);

        var sprites = {
            'brick1' : TileSprite.getMagnified('brick',1),
            'steel' : TileSprite.getMagnified('steel',1),
            'water' : TileSprite.getMagnified('water',1),
            'apple' : TileSprite.getMagnified('apple',1),
            'grass' : TileSprite.getMagnified('grass',1),
            'water2' : TileSprite.getMagnified('water',2),
            'dirt2' : TileSprite.getMagnified('dirt',2),
            'grass2' : TileSprite.getMagnified('grass',2),
            'castle3' : TileSprite.getMagnified('castle',3),
            'player2' : TileSprite.getMagnified('player',2),
            'bear3' : TileSprite.getMagnified('bear',3),
            'deer2' : TileSprite.getMagnified('deer',2),
            'rabbit2' : TileSprite.getMagnified('rabbit',2),
        }
        var pixelFont1 = new PixelFont({color:'red',size : 2});
        var pixelFont = new PixelFont({color:'red',size : 4});

        this.treetiny = Tree.get(1);
        this.treeshort = Tree.get(2);
        this.tree = Tree.getB(2);

        this.TextSprites = {
            'JS' : pixelFont.getTextSprite('JS',sprites.brick1),
            '13K' : pixelFont.getTextSprite('13K',sprites.steel),
            '2023' : pixelFont.getTextSprite('2023',sprites.water),
            '13' : pixelFont.getTextSprite('13',sprites.steel),
            'TH' : pixelFont1.getTextSprite('TH',sprites.steel),
            'CENTURY' : pixelFont.getTextSprite('CENTURY',sprites.apple),
            'ROBIN HOOD' : pixelFont.getTextSprite('ROBIN HOOD',sprites.grass),
        }
        this.water_row = gf.Lightify(gf.repeatCanvas(sprites.water,4, this.main.config.width/sprites.water.width),0.6);
        this.dirt_row = gf.Lightify(gf.repeatCanvas(sprites.dirt2,2,36),0.4);
        this.grass_row = gf.Lightify(gf.repeatCanvas(sprites.grass2,12,36),0.4);

        this.castle = sprites.castle3;
        this.player = sprites.player2;
        this.bear = sprites.bear3;
        this.deer = sprites.deer2;
        this.rabbit = sprites.rabbit2;

        this.buffer = this.getBuffer();
        this.loading = 0;
    }
    async prepareCanvas(){
        
    }
    update(time){
        this.time = time;
        this.loading++;
    }
    getBuffer(){
        let canvas = gf.makeCanvas(600,600);
        let ctx = gf.getCtx(canvas);

        ctx.drawImage(this.water_row,0,32*6);
        ctx.drawImage(this.dirt_row,0,32*7);
        ctx.drawImage(this.dirt_row,0,32*8);
        ctx.drawImage(this.dirt_row,0,32*15);
        ctx.drawImage(this.dirt_row,0,32*16);
        ctx.drawImage(this.dirt_row,0,32*17);
        ctx.drawImage(this.grass_row,0,32*9);

        var textx = 32*4;
        var texty = 32*3;
        
        ctx.drawImage(this.TextSprites['JS'],textx,texty);
        ctx.drawImage(this.TextSprites['13K'],textx + this.TextSprites['JS'].width,texty);
        ctx.drawImage(this.TextSprites['2023'],textx + 32+this.TextSprites['JS'].width + this.TextSprites['13K'].width ,texty);
        ctx.drawImage(this.TextSprites['13'],textx ,texty + 32);
        ctx.drawImage(this.TextSprites['TH'],textx +64,texty + 32);
        ctx.drawImage(this.TextSprites['CENTURY'],textx +32*3,texty + 32);
        ctx.drawImage(this.TextSprites['ROBIN HOOD'],textx,texty + 64);

        return canvas;
    }
    draw(ctx){
        let h = 20;
        let y = 20;
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(this.buffer,0,0);
        // ctx.drawImage(this.water_row,0,64);
        ctx.fillStyle = "green";
        ctx.font = "16px Arial";
        ctx.fillText("Time " + this.time, 20 , y); y+= h;
        ctx.fillText("use any key to load menu ", 20 , y); y+= h;
        ctx.fillText("last edit : 2023-08-20 6:00 PM ", 20 , y); y+= h;
        ctx.drawImage(this.castle,32*1  ,32*8);
        ctx.drawImage(this.player,32*4,32*11);
    
    }
    goToMainMenuScene(){
        if(this.loading > 100){
            this.main.toMainMenuScene();
        };
        this.loading=100;
    }
    control(e){
        this.goToMainMenuScene();
    }
    click(e){
        this.goToMainMenuScene();
    }
    keydown(e){
        this.goToMainMenuScene();
    }
    keyup(e){
        this.goToMainMenuScene();
    }
}