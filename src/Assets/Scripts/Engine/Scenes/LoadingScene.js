import Scene from "./Scene.js";
import TileSprite from "../Sprites/TileSprite.js";
import Tree from "../Sprites/Tree.js";
import * as gf from '../Utils/gf.js';
import Font from "../Sprites/Font.js";
import SpriteMap from "../Sprites/SpriteMap.js";
import Castle from "../Entity/Castle.js";
export default class LoadingScene extends Scene{
    constructor(main){
        super(main);
        this.buffer = gf.makeCanvas(this.main.config.width,this.main.config.height);
        this.main.spriteMap = new SpriteMap();
        var grass = this.main.spriteMap.getMagnified('grass',1);
        var dirt =  this.main.spriteMap.getMagnified('dirt',1);
        var steel = this.main.spriteMap.getMagnified('steel',1);
        var g1 = gf.getGrid(dirt,grass);
        var g2 = gf.getGrid(steel,dirt);

        this.castleObj = new Castle(this);
        this.castle = this.castleObj.brick;


        this.player = this.main.spriteMap.getMagnified('player',2);
        this.gmat = gf.getGridMatt(g1,g2,this.main.canvas.width/8,this.main.canvas.height/8);
        this.gmat = gf.Lightify(this.gmat,.2);
        this.log = this.getLogo();
        this.buffer = this.getBuffer();
        this.loading = -20;

        this.intro = this.getIntro();
    }
    getLogo(){
        var canvas = gf.makeCanvas(400,200);
        var ctx = gf.getCtx(canvas);
        
        var grass = this.main.spriteMap.getMagnified('grass',1);
        var dirt =  this.main.spriteMap.getMagnified('dirt',1);
        var water = this.main.spriteMap.getMagnified('water',1);
        var steel = this.main.spriteMap.getMagnified('steel',1);
        var g1 = gf.getGrid(dirt,grass);
        var g2 = gf.getGrid(steel,steel);
        var g3 = gf.getGrid(grass,water);
        var g4 = gf.getGrid(water,dirt);
        this.TextSprites = [
            Font.getSpriteForText('13th CENTURY™',20,'green',g4,'Arial Black'),
            Font.getSpriteForText('ROBIN➸HOOD ',40,'green',g1,'Arial Black'),
            Font.getSpriteForText('THE➸OUTLAW ',28,'green',g2,'Arial Black'),
            Font.getSpriteForText('★1370s∵∴∵∴∵∴∵∴∵∴∵∴∵2023★',15,'green',g3,'Arial Black'),
        ];
        ctx.drawImage(gf.fuseColor(this.TextSprites[0],'white') ,0,1);
        ctx.drawImage(this.TextSprites[0],1,1);
        ctx.drawImage(gf.fuseColor(this.TextSprites[1],'red') ,1,18);
        ctx.drawImage(this.TextSprites[1],0,17);
        ctx.drawImage(gf.fuseColor(this.TextSprites[2],'white') ,85,53);
        ctx.drawImage(this.TextSprites[2],85,52);
        ctx.drawImage(this.TextSprites[3],82,82);
        return canvas;
    }
    getIntro(){
        var instructions = [
            `you step into the legendary shoes of Robin Hood.`,
            `your mission is to make the world a better place.`,
            `- explore forest and hunt animals`,
            `- do quests and trade with merchants`,
            `- spread the wealth to the poor`,
            `- improve your stats and defend the village`,
            `controls`,
            `a/left : move left`,
            `d/right : move right`,
            `w/up : move up`,
            `s/down : move down`,
            `space : shoot arrow`,
            `e : interact with`,
            `q : open menu`,
            `game play`,
            `hunt animals in forest, rabbit, wolf, deer,and bear`,
            `harvest trees to get apples and lemons`,
            `things to do in town`,
            `- trade hunts with merchants`,
            `- give goodies to villagers for free (gain morale)`,
            `- take quests from villagers for extra love`,
            `extra things to do`,
            `deep into the jungle lies the old wizzard`,
            `find him and buy the magic bow`,
            `more instructions can be learned in game`,
        ];
        var canvas = gf.makeCanvas(360,500);
        let ctx = gf.getCtx(canvas);
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        for(let i = 0 ; i< instructions.length;i++){
            ctx.fillText(instructions[i],0,25*i+20);
        }
        return canvas;
    }
    async prepareCanvas(){
        
    }
    update(time){
        this.time = time;
        this.loading += 0.8;
    }
    getBuffer(){
        let canvas = gf.makeCanvas(this.main.config.width,this.main.config.height);
        let ctx = gf.getCtx(canvas);
        ctx.drawImage(this.gmat,0,0);
        var textx = this.main.config.width < 400 ? 16 : 32*4;
        ctx.drawImage(this.log,textx,74);
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
        // ctx.fillText("last edit : 2023-08-23 2:00 AM ", 20 , y); y+= h;
        // ctx.drawImage(this.castle,32*1  ,32*8);
        
        ctx.drawImage(this.castleObj.dirt,  16 + 36 * 0  ,32*6);
        ctx.drawImage(this.castleObj.grass, 16 + 36 * 2  ,32*6);
        ctx.drawImage(this.castleObj.water, 16 + 36 * 4  ,32*6);
        ctx.drawImage(this.castleObj.brick, 16 + 36 * 6  ,32*6);
        ctx.drawImage(this.castleObj.steel, 16 + 36 * 8  ,32*6);
        ctx.drawImage(this.castleObj.magic, 16 + 36 * 10 ,32*6);
        ctx.drawImage(this.player,16,32*10);
        ctx.drawImage( gf.crop(this.intro,0,this.loading % this.intro.height,this.intro.width,200),64,32*10);
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