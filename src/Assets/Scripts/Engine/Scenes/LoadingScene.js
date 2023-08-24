import Scene from "./Scene.js";
import * as gf from '../Utils/gf.js';
import {colorsMatrixToSprite} from '../Utils/gf.js';
import Font from "../Sprites/Font.js";
import Castle from "../Entity/Castle.js";
import {SPRITECOLORMATRIX,SPRITES_1} from '../Sprites/SpriteMap.js';
export default class LoadingScene extends Scene{
    constructor(main){
        super(main);

        var grass = SPRITES_1.grass;
        var dirt =  SPRITES_1.dirt;
        var steel = SPRITES_1.steel;

        var g1 = gf.getGrid(dirt,grass);
        var g2 = gf.getGrid(steel,dirt);

        this.castleObj = new Castle(this);

        this.player = colorsMatrixToSprite(SPRITECOLORMATRIX.player,2); 
        

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
        var grass = SPRITES_1.grass;
        var dirt =  SPRITES_1.dirt;
        var water = SPRITES_1.water;
        var steel = SPRITES_1.steel;
        var g1 = gf.getGrid(dirt,grass);
        var g2 = gf.getGrid(steel,steel);
        var g3 = gf.getGrid(grass,water);
        var g4 = gf.getGrid(water,dirt);
        this.TextSprites = [
            Font.get('13th CENTURY™',20,'green',g4,'Arial Black'),
            Font.get('ROBIN➸HOOD ',40,'green',g1,'Arial Black'),
            Font.get('THE➸OUTLAW ',28,'green',g2,'Arial Black'),
            Font.get('★1370s∵∴∵∴∵∴∵∴∵∴∵∴∵2023★',15,'green',g3,'Arial Black'),
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
            `a w s d / arrows for movement`,
            `e interact, q menue, space fire`,
            `explore forest hunt animal`,
            `trade with merchants`,
            `- give goodies to villagers for free (gain morale)`,
            `- take quests from villagers for extra love`,
            `find old wizzard for a magic bow`,
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