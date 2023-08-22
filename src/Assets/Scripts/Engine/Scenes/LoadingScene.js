import Scene from "./Scene.js";
import TileSprite from "../Sprites/TileSprite.js";
import Tree from "../Sprites/Tree.js";
import * as gf from '../Utils/gf.js';
import Font from "../Sprites/Font.js";
export default class LoadingScene extends Scene{
    constructor(main){
        super(main);
        this.buffer = gf.makeCanvas(this.main.config.width,this.main.config.height);

        var sprites = {
            'magic' : TileSprite.getMagnified('magic',1),
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
        }

        this.treetiny = Tree.get(1);
        this.treeshort = Tree.get(2);
        this.tree = Tree.getB(2);

        this.TextSprites = {
            'JS' : Font.getSpriteForText('JS',40,'green',sprites.brick1),
            '13K' : Font.getSpriteForText('13K',40,'green',sprites.steel),
            '2023' : Font.getSpriteForText('2023',40,'green',sprites.water),
            '13' : Font.getSpriteForText('13',40,'green',sprites.steel),
            'TH' : Font.getSpriteForText('TH',20,'green',sprites.brick1),
            'CENTURY' : Font.getSpriteForText('CENTURY`S',40,'green',sprites.magic),
            'ROBIN HOOD' : Font.getSpriteForText('➹ROBIN HOOD➹',40,'green',sprites.grass),
        }
        this.water_row = gf.Lightify(gf.repeatCanvas(sprites.water,4, this.main.config.width/8),0.6);
        this.dirt_row = gf.Lightify(gf.repeatCanvas(sprites.dirt2,2,this.main.config.width/8),0.4);
        this.grass_row = gf.Lightify(gf.repeatCanvas(sprites.grass2,12,this.main.config.width/8),0.4);
        
        this.castle = sprites.castle3;
        this.player = sprites.player2;

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
        let canvas = gf.makeCanvas(this.main.config.width,this.main.config.height);
        let ctx = gf.getCtx(canvas);

        ctx.drawImage(this.water_row,0,32*6);
        ctx.drawImage(this.dirt_row,0,32*7);
        ctx.drawImage(this.dirt_row,0,32*8);
        ctx.drawImage(this.dirt_row,0,32*15);
        ctx.drawImage(this.dirt_row,0,32*16);
        ctx.drawImage(this.dirt_row,0,32*17);
        ctx.drawImage(this.grass_row,0,32*9);

        var textx = 32*4;
        if(this.main.config.width < 400){
            textx = 16;
        }
        var texty = 75;
        // ctx.drawImage(this.TextSprites['JS'],textx,texty);
        // ctx.drawImage(this.TextSprites['13K'],textx + 40+5,texty);
        // ctx.drawImage(this.TextSprites['2023'],textx + 150 ,texty);

        ctx.drawImage(this.TextSprites['13'],textx ,texty + 40);
        ctx.drawImage(this.TextSprites['TH'],textx +43,texty + 40);
        ctx.drawImage(this.TextSprites['CENTURY'],textx +80,texty + 40);
        ctx.drawImage(this.TextSprites['ROBIN HOOD'],textx,texty + 80);

        return canvas;
    }
    draw(ctx){
        let h = 20;
        let y = 20;
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(this.buffer,0,0);
        ctx.fillStyle = "green";
        ctx.font = "16px Arial";
        ctx.fillText("Time " + this.time, 20 , y); y+= h;
        ctx.fillText("use any key to load menu ", 20 , y); y+= h;
        ctx.fillText("last edit : 2023-08-23 2:00 AM ", 20 , y); y+= h;
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