import * as gf from '../Utils/gf.js';
export default class Mob{

    constructor(gamescene){
        this.scene = gamescene;

    }
    update(time){

    }
    draw(ctx){

    }
    getSprites(){
        if(Mob.SPRITES) return Mob.SPRITES;
        var multiplier = this.e.scene.scalemultiplier;
        var size = 16 * multiplier;
        var Mob = SpriteMap.getByNameMagnified('Mob',multiplier);
        
        var canvas = gf.makeCanvas(size,size);
        var ctx = gf.getCtx(canvas);
        ctx.fillRect(0,0,size,size);
        ctx.drawImage(Mob, 
            canvas.width / 2 - Mob.width/2 ,
            canvas.height / 2 - Mob.height/2 );
        var r = gf.rotateCanvasCw(canvas,0);
        var d = gf.rotateCanvasCw(canvas,2);
        var l = gf.rotateCanvasCw(canvas,4);
        var u = gf.rotateCanvasCw(canvas,6);

        this.w = r.width;
        this.h = r.height;
        var sprites = [
            u,        //UP
            u,        //UPRIGHT
            r,       //RIGHT
            r,        //DOWNRIGHT
            d,        //DOWN
            d,        //DOWNLEFT
            l,        //LEFT
            u,        //UPLEFT
        ];
        Mob.SPRITES = sprites;
        return Mob.SPRITES;
    }
}