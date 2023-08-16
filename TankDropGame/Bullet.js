import SpriteMaker from  '../GE/SpriteMaker.js';
import Segment from '../src/Assets/Scripts/Engine/Geometry/Segment.js';
import ExplosionAnimation from './ExplosionAnimation.js';
export default class Bullet{
    constructor(e,customrotation = 0, destination = null){
        this.e = e;
        this.type = 'Bullet';
        this.power = e.specs.power;
        this.range = e.specs.range;
        this.center = e.center.clone();
        this.rotation = customrotation || (e.rotation - Math.PI / 2);
        this.destination = destination || e.center.moveAngleClone(this.rotation, this.range *32);
        this.distance = 0;
        this.speed = 4;
        this.life = 1;
        this.sprite = this.getSprite();
        this.e.e.Objects.push(new Segment(this.center,this.destination), "yellow", true );
        console.log(this,this.destination);
    }
    getSprite(){
        // if(Bullet.STATICSPRITE) return SpriteMaker.clone(Bullet.STATICSPRITE);
        let sprite = SpriteMaker.getSprite(`b01`);
        sprite = SpriteMaker.transformCanvasColors(sprite,{"#ffffff":"_",
            "#cfcfcf": `hsl(${Math.random()}, 100%, 50%)`,
        });
        this.width = sprite.width;
        this.height = sprite.height;
        Bullet.STATICSPRITE = SpriteMaker.clone(sprite);
        return Bullet.STATICSPRITE;
    }
    draw(ctx){
        ctx.save(); // Save the current state of the context
        ctx.translate(this.center.x, this.center.y); // Move the context to the center of the triangle
        ctx.rotate(this.rotation + Math.PI / 2); // Rotate the context by the specified angle (in radians)
        ctx.translate(-this.center.x, -this.center.y); // Move the context back to the original position
        ctx.drawImage(this.sprite,
            this.center.x - this.width/2, 
            this.center.y - this.height/2);
        ctx.restore();
        // this.center.drawCircle(ctx,4,"red");
    }
    update(time){
        this.center.movetoward(this.destination , this.speed);
        this.distance = this.distance + this.speed;
        this.e.e.Objects.forEach(e => {
            if(e == this || e == this.e) return;
            else if(this.center.distanceTo(e.center) <= this.power*3){
                this.life = 0;
                this.delete = true;
                e.life -= this.power;
                this.e.e.Objects.push(new ExplosionAnimation(this.center,this.power * 5),"green");
            }
        });
        // this.e.e.Objects.push(new ExplosionAnimation(this.center,this.power * 2));
        if(this.distance > this.range * 32){
            this.life = 0;
            this.delete = true;
            this.e.e.Objects.push(new ExplosionAnimation(this.center,this.power * 5));
        }
    }
}