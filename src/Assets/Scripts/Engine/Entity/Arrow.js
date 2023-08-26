import * as gf from '../Utils/gf.js';
import {SPRITECOLORMATRIX} from "../Sprites/SpriteMap.js";
import EObject from './EObject.js';
export default class Arrow extends EObject{
    constructor(e){
        super(e.center);
        this.e = e;
        this.direction = e.direction;
        this.sprites = this.getSprites();
        this.sprite = this.sprites[this.direction];
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.speed = this.width;
        this.distanceToTravel = this.e.attributes.ARCHERY * this.speed/20;
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
            this.life = 0;
        }
    }
    getSprites(){
        if(Arrow.SPRITES) return Arrow.SPRITES;
        var multiplier = this.e.scene.scalemultiplier;
        var size = 16 * multiplier;
        var arrow = gf.colorsMatrixToSprite(SPRITECOLORMATRIX.arrow,multiplier);
        var canvas = gf.centerCanvasOn(arrow,size,size);
        
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
}