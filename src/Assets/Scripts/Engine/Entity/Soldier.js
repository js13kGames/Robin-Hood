import Mob from "./Mob.js";

export default class Soldier extends Mob{
    constructor(gamescene,type = 0,center = null){
        super(gamescene,type,center);
    }
    getSprite(){
        var npcman = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.npcman,this.scene.scalemultiplier,(c)=>{
            if(c == '#bf0a0a') return '#76428a';
            if(c == '#990000') return '#76428a';
            return c;
        });
        return npcman;
    }
    draw(ctx){
        super.draw(ctx);
        ctx.drawImage(this.sprites[6],
            (this.center).x + this.sprite.width*.65,// - (this.width)/2,
            (this.center).y + this.sprite.height*.25,// -(this.height)/2
        );
    }
    
}