import * as gf from '../Utils/gf.js';
import {SPRITECOLORMATRIX} from "../Sprites/SpriteMap.js";
import Point from '../Utils/Point.js';
const MOBSPECS = [
    // m movement, h life, atk attack
    {m : 25, h:1 , atk : 1,}, // name:'rabbit'
    {m : 25, h:5 , atk : 4,}, // name:'wolf'
    {m : 25, h:8 , atk : 10,}, // name:'deer'
    {m : 25, h:9 , atk : 20,}, // name:'bear'
    {m : 25, h:9 , atk : 15,}, // name:'npcman'
    {m : 25, h:9 , atk : 10,}, // name:'npcgirl'
];
export default class Mob{
    constructor(gamescene,type = 0,center = null){
        this.type = type;
        this.scene = gamescene;
        this.sprites = this.getSprites();
        this.sprite = this.sprites[this.type];
        this.center = center || gamescene.findAValidSpawnPoint(8,25);
        this.life = MOBSPECS[this.type].h;
        this.maxLife = MOBSPECS[this.type].h;
        this.moveCountDown = MOBSPECS[this.type].m;
        this.pathToGo=[];
    }
    // activate(){
    //     this.active = true;
    // }
    moveTowardPlayer(){
        var tt = this.scene.tileSize;
        const path = this.scene.pathFinder.findPath(
            this.center.x/tt,
            this.center.y/tt,
            this.scene.player.center.x/tt,
            this.scene.player.center.y/tt,
        );
        if(path && path.length >= 2){
            this.center = new Point(path[1][0] * tt,path[1][1] * tt);
        }
    }
    // getPossibleNextMove(){
    //     var tt = this.scene.tileSize;
    //     if(this.pathToGo.length > 0){
    //         var pt = this.pathToGo.shift();
    //         this.center = new Point(pt[0] * tt,pt[1] * tt);
    //         return;
    //     }
    //     else{
    //         const path = this.scene.pathFinder.findPath(
    //             this.center.x/tt,
    //             this.center.y/tt,
    //             this.scene.player.center.x/tt,
    //             this.scene.player.center.y/tt,
    //         );
    //         if(path && path.length >= 0){
    //             this.pathToGo = path;
    //         }
    //     }
    // }
    update(time){
        this.time = time;
        this.moveCountDown--;
        if(this.moveCountDown<=0){
            this.moveCountDown = MOBSPECS[this.type].m - this.scene.difficulity;
            this.moveTowardPlayer();
            if(this.center.distanceTo(this.scene.player.center) < this.scene.tileSize*1.5){
                this.scene.player.life -= this.type+1;
                this.scene.player.showDamageEffect = 3;
            }
        }
    }
    getHealthBar(ctx2){
        if(this.life == this.maxLife) return;
        var canvas = gf.makeCanvas(this.sprite.width,3);
        var ctx = gf.getCtx(canvas);
        ctx.fillStyle = 'green';
        var barw = this.sprite.width * (this.life / this.maxLife);
        ctx.fillRect(0,0,barw,3);
        ctx2.drawImage(canvas,this.center.x,this.center.y,);
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            (this.center).x,
            (this.center).y,
        );
        this.getHealthBar(ctx);
    }
    getSprites(){
        if(Mob.SPRITES) return Mob.SPRITES;
        var multiplier = this.scene.scalemultiplier;
        var size = this.scene.tileSize; // 16 * multiplier;
        var rabbit = gf.centerCanvasOn(gf.colorsMatrixToSprite(SPRITECOLORMATRIX.rabbit,multiplier), size,size,false);
        var wolf = gf.centerCanvasOn(gf.colorsMatrixToSprite(SPRITECOLORMATRIX.wolf,multiplier), size,size,false);
        var deer = gf.centerCanvasOn(gf.colorsMatrixToSprite(SPRITECOLORMATRIX.deer,multiplier), size,size,false);
        var bear = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.bear,multiplier);
        var npcman = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.npcman,multiplier);
        var npcgirl = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.npcgirl,multiplier);
        var sword = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.sword,multiplier);
        this.w = size;
        this.h = size;
        var sprites = [
            rabbit,//0
            wolf,//1
            deer,//2
            bear,//3
            npcman,//4
            npcgirl,//5
            sword//6
        ];
        Mob.SPRITES = sprites;
        return Mob.SPRITES;
    }
}