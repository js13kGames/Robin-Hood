import Mob from "./Mob.js";

export default class Soldier extends Mob{
    constructor(gamescene,type = 0,center = null){
        super(gamescene,type,center);
    }
    draw(ctx){
        super.draw(ctx);
        ctx.drawImage(this.sprites[6],
            (this.center).x + this.sprite.width*.65,
            (this.center).y + this.sprite.height*.25,
        );
    }
}