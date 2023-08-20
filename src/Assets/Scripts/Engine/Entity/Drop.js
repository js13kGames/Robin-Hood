import * as gf from '../Utils/gf.js';
import SpriteMap from "../Sprites/SpriteMap.js";
import Point from '../Utils/Point.js';
export default class Drop{
    constructor(gamescene,center,type=0){
        this.scene = gamescene;
        this.sprites = this.getSprites();
        this.sprite = this.sprites[type];
        this.center = new Point(center.x,center.y);
    }
    obtain(player){
        
    }
    getSprites(){
        if(Drop.SPRITES) return Drop.SPRITES;
        var multiplier = this.scene.scalemultiplier;
        var size = this.scene.tileSize; // 16 * multiplier;
        var coin = gf.centerCanvasOn(SpriteMap.getByNameMagnified('coin',multiplier), size,size,false);
        this.w = size;
        this.h = size;
        var sprites = [
            coin,
        ];
        Drop.SPRITES = sprites;
        return Drop.SPRITES;
    }
}