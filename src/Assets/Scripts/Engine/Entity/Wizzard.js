import { SPRITECOLORMATRIX } from "../Sprites/SpriteMap.js";
import * as gf from "../Utils/gf.js";
import Mob from "./Mob.js";
export default class Wizzard extends Mob{
    constructor(scene,center = null){
        super(scene,5,center);
        this.sprite = this.getSprite();
        // this.timesDealtWith = 0;
        // this.personalDifficulity = 1;
    }
    getSprite(){
        var s = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.wizzard,this.scene.scalemultiplier,(c)=>{
            // if(c == '#bf0a0a') return '#76428a';
            // if(c == '#990000') return '#76428a';
            return c;
        });
        s = gf.centerCanvasOn(s,this.scene.tileSize,this.scene.tileSize);
        return s;
    }
    interact(){
        console.log('interacting with player');
        this.giveTrade();
    }
    giveTrade(){
        var cost = 1_000_000;
        var c = confirm(`Hello Robin, I offer you the magic bow for ${cost} $`);
        if(c){
            if(this.scene.player.cash >= cost){
                alert('you have your skills, you dont need a magic bow');
            }
            else{
                alert('you dont have enough cash, try hunting some animals');
            }
        }
    }
    update(time){
        // console.log('update villager');
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            (this.center).x,
            (this.center).y,
        );
    }
}