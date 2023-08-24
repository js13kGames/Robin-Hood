import * as gf from '../Utils/gf.js';
import {SPRITECOLORMATRIX} from "../Sprites/SpriteMap.js";
import EObject from './EObject.js';
export default class Drop extends EObject{
    constructor(gamescene,center,value = 1,type=0){
        super(center);
        this.scene = gamescene;
        this.value = value;
        this.sprite = this.getCoinSprite();
    }
    update(time){
        this.time = time;
        if(this.center.distanceTo(this.scene.player.center) < this.scene.tileSize*1.5){
            this.scene.player.cash += this.value;
            this.life = 0;
        }
    }
    draw(ctx){
        super.draw(ctx);
    }
    getCoinSprite(){
        if(Drop.CoinSprite) return Drop.CoinSprite;
        var multiplier = this.scene.scalemultiplier;
        var size = this.scene.tileSize; // 16 * multiplier;
        var coin = gf.centerCanvasOn(gf.colorsMatrixToSprite(SPRITECOLORMATRIX.coin,multiplier), size,size,false);
        Drop.CoinSprite = coin;
        return coin;
    }
}