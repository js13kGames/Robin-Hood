import * as gf from '../Utils/gf.js';
import SpriteMap from "../Sprites/SpriteMap.js";
import EObject from './EObject.js';
export default class Drop extends EObject{
    constructor(gamescene,center,type=0){
        super(center);
        this.scene = gamescene;
        this.sprites = this.getSprites();
        this.sprite = this.sprites[type];
        document.body.append(this.sprite);
    }
    obtain(player){
        
    }
    getSprites(){
        if(Drop.SPRITES) return Drop.SPRITES;
        var multiplier = this.scene.scalemultiplier;
        var size = this.scene.tileSize; // 16 * multiplier;
        var coin = gf.centerCanvasOn(SpriteMap.getByNameMagnified('coin',multiplier), size,size,false);
        document.body.append(coin);
        this.w = size;
        this.h = size;
        var sprites = [
            coin,
        ];
        Drop.SPRITES = sprites;
        return Drop.SPRITES;
    }
}