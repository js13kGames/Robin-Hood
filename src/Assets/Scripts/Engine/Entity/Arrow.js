import SpriteMap from "../Sprites/SpriteMap.js";
import * as gf from '../Utils/gf.js';
import Point from '../Utils/Point.js';
export default class Arrow{
    constructor(e){
        this.e = e;
        this.direction = e.direction;
        this.sprites = this.getSprites();
        this.sprite = this.sprites[this.direction];
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.center = new Point(
            e.center.x,// - e.width/2 +this.width, 
            e.center.y,// - e.height/2+this.height
            );
        console.log(this.width);
        this.speed = this.width/4;
        this.distanceToTravel = this.e.attributes.ARCHERY * this.speed;
        // this.center.move(this.direction,this.width/2);
        this.movement = 0;
        this.life = 1;
    }
    update(time){
        this.time = time;
        this.movement++;
        if(this.movement < this.distanceToTravel){
            this.center.move(this.direction,this.speed);
            this.e.applyArrowEffect(this);
        }
        else{
            console.log('dead ', this);
            this.life = 0;
        }
    }
    getSprites(){
        if(Arrow.SPRITES) return Arrow.SPRITES;
        var multiplier = this.e.scene.scalemultiplier;
        var size = 16 * multiplier;
        var arrow = SpriteMap.getByNameMagnified('arrow',multiplier);
        var canvas = gf.makeCanvas(size,size);
        var ctx = gf.getCtx(canvas);
        ctx.fillRect(0,0,size,size);
        ctx.drawImage(arrow, 
            canvas.width / 2 - arrow.width/2 ,
            canvas.height / 2 - arrow.height/2 );
        var r = gf.rotateCanvasCw(canvas,0);
        var d = gf.rotateCanvasCw(canvas,2);
        var l = gf.rotateCanvasCw(canvas,4);
        var u = gf.rotateCanvasCw(canvas,6);

        // document.body.append(r);
        // document.body.append(d);
        // document.body.append(l);
        // document.body.append(u);
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
        Arrow.SPRITES = sprites;
        return Arrow.SPRITES;
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            (this.center).x,// - (this.width)/2,
            (this.center).y,// -(this.height)/2
        );
    }
}