import { SPRITECOLORMATRIX } from "../Sprites/SpriteMap.js";
import * as gf from "../Utils/gf.js";
import Mob from "./Mob.js";
export default class Wizzard extends Mob{
    constructor(scene,center = null){
        super(scene,5,center);
        this.sprite = this.getSprite();
    }
    getSprite(){
        var s = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.wizzard,this.scene.scalemultiplier,(c)=>{
            return c;
        });
        s = gf.centerCanvasOn(s,this.scene.tileSize,this.scene.tileSize);
        return s;
    }
    interact(){
        this.giveTrade();
    }
    giveTrade(){
        var cost = 1_000_000;
        var c = confirm(`magic bow ${cost} $`);
        if(c){
            if(this.scene.player.cash >= cost){
                alert('you have your skills, you dont need a magic bow');
            }
            else{
                alert('insufficient cash');
            }
        }
    }
    update(time){
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            (this.center).x,
            (this.center).y,
        );
    }
}