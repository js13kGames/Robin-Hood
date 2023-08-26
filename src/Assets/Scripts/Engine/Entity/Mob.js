import * as gf from '../Utils/gf.js';
import {SPRITECOLORMATRIX} from "../Sprites/SpriteMap.js";
import Point from '../Utils/Point.js';
const MOBSPECS = [
    {mcd : 25,attack : 1, life:1,name:'rabbit'},
    {mcd : 25,attack : 4, life:5,name:'wolf'},
    {mcd : 25,attack : 10, life:8,name:'deer'},
    {mcd : 25,attack : 20, life:10,name:'bear'},
    {mcd : 25,attack : 15, life:10,name:'npcman'},
    {mcd : 25,attack : 10, life:10,name:'npcgirl'},
];
export default class Mob{
    constructor(gamescene,type = 0,center = null){
        this.type = type;
        this.scene = gamescene;
        this.sprites = this.getSprites();
        this.sprite = this.sprites[this.type];
        this.center = center || gamescene.findAValidSpawnPoint(8,25);
        this.life = MOBSPECS[this.type].life;
        this.maxLife = MOBSPECS[this.type].life;
        this.moveCountDown = MOBSPECS[this.type].mcd;
        this.pathToGo=[];
    }
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
        else{
            console.log('no visible path to player');
        }
    }
    getPossibleNextMove(){
        var tt = this.scene.tileSize;
        if(this.pathToGo.length > 0){
            var pt = this.pathToGo.shift();
            this.center = new Point(pt[0] * tt,pt[1] * tt);
            return;
        }
        else{
            const path = this.scene.pathFinder.findPath(
                this.center.x/tt,
                this.center.y/tt,
                this.scene.player.center.x/tt,
                this.scene.player.center.y/tt,
            );
            if(path && path.length >= 0){
                // console.log('calculate new path',this);
                this.pathToGo = path;
            }
        }
    }
    update(time){
        this.time = time;
        this.moveCountDown--;
        if(this.moveCountDown<=0){
            this.moveCountDown = MOBSPECS[this.type].mcd - this.scene.difficulity;
            this.moveTowardPlayer();
            if(this.center.distanceTo(this.scene.player.center) < this.scene.tileSize*2){
                this.scene.player.life -= this.type+1;
                this.scene.player.showDamageEffect = 10;
            }
        }
    }
    getHealthBar(){
        var canvas = gf.makeCanvas(this.sprite.width,3);
        var ctx = gf.getCtx(canvas);
        // ctx.fillStyle = 'white';
        // ctx.fillRect(0,0,this.sprite.width,3);
        ctx.fillStyle = 'green';
        var barw = this.sprite.width * (this.life / this.maxLife);
        // console.log(barw);
        ctx.fillRect(0,0,barw,3);
        return canvas;
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            (this.center).x,
            (this.center).y,
        );
        if(this.life < this.maxLife){
            ctx.drawImage(this.getHealthBar(),
                (this.center).x,
                (this.center).y,
            );
        }
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
            rabbit,
            wolf,
            deer,
            bear,
            npcman,
            npcgirl,
            sword
        ];
        Mob.SPRITES = sprites;
        return Mob.SPRITES;
    }
}