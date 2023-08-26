import { SPRITECOLORMATRIX } from "../Sprites/SpriteMap.js";
import * as gf from "../Utils/gf.js";
import Mob from "./Mob.js";
export default class Merchant extends Mob{
    constructor(scene,center = null){
        super(scene,5,center);
        this.sprite = this.getSprite();
        this.timesDealtWith = 0;
        this.personalDifficulity = 1;
    }
    getSprite(){
        var npcman = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.npcman,this.scene.scalemultiplier,(c)=>{
            if(c == '#bf0a0a') return '#76428a';
            if(c == '#990000') return '#76428a';
            return c;
        });
        return npcman;
    }
    interact(){
        console.log('interacting with player');
        this.giveTrade();
    }
    giveTrade(){
        var s = this.scene.difficulity;
        var e = this.timesDealtWith + this.scene.difficulity;
        var apples = gf.randInt(s,e);
        var orange = gf.randInt(s,e);
        var cost = (this.scene.difficulity) * (apples+orange);
        var c = confirm(`Hello Robin, trade offer,\n${apples} apples and ${orange} oranges for ${cost} $`);
        if(c){
            if(this.scene.player.cash >= cost){
                this.scene.player.oranges += orange;
                this.scene.player.apples += apples;
                this.scene.player.cash -= cost;
                this.timesDealtWith++;
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