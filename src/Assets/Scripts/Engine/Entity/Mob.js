import * as gf from '../Utils/gf.js';
import SpriteMap from "../Sprites/SpriteMap.js";
import Point from '../Utils/Point.js';
export default class Mob{

    constructor(gamescene){
        this.scene = gamescene;
        this.sprites = this.getSprites();
        this.sprite = this.sprites[0];
        this.center = gamescene.findAValidSpawnPoint(4,8);
        console.log('mob created at ',this.center);
        this.life = 1;
    }
    update(time){
        this.time = time;
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            (this.center).x,// - (this.width)/2,
            (this.center).y,// -(this.height)/2
        );
    }
    getSprites(){
        if(Mob.SPRITES) return Mob.SPRITES;
        var multiplier = this.scene.scalemultiplier;
        var size = this.scene.tileSize; // 16 * multiplier;

        var rabbit = gf.centerCanvasOn(SpriteMap.getByNameMagnified('rabbit',multiplier), size,size,false);
        var wolf = gf.centerCanvasOn(SpriteMap.getByNameMagnified('wolf',multiplier), size,size,false);
        var deer = gf.centerCanvasOn(SpriteMap.getByNameMagnified('deer',multiplier), size,size,false);
        var bear = gf.centerCanvasOn(SpriteMap.getByNameMagnified('bear',multiplier), size,size,false);
        var bear2 = SpriteMap.getByNameMagnified('bear',multiplier);
        var npcman = SpriteMap.getByNameMagnified('npcman',multiplier);
        var npcgirl = SpriteMap.getByNameMagnified('npcgirl',multiplier);

        document.body.append(rabbit);
        document.body.append(wolf);
        document.body.append(deer);
        document.body.append(bear);
        document.body.append(bear2);
        document.body.append(bear2);
        document.body.append(npcman);
        document.body.append(npcgirl);

        this.w = size;
        this.h = size;
        var sprites = [
            rabbit,
            wolf,
            deer,
            bear,
            bear2,
            bear2,
            npcman,
            npcgirl
        ];
        Mob.SPRITES = sprites;
        return Mob.SPRITES;
    }
}