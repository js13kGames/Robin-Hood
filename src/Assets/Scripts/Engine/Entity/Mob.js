import * as gf from '../Utils/gf.js';
import SpriteMap from "../Sprites/SpriteMap.js";
import Point from '../Utils/Point.js';
export default class Mob{

    constructor(gamescene,type = 0){
        this.scene = gamescene;
        this.sprites = this.getSprites();
        this.sprite = this.sprites[type];
        this.center = gamescene.findAValidSpawnPoint(10,20);
        this.life = 1 + type * 2;
    }
    getPossibleNextMove(){
        let possibleMoves = [];
        let x = this.center.x / this.scene.tileSize;
        let y = this.center.y / this.scene.tileSize;

        let r = this.scene.map;

        

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
        var bear = SpriteMap.getByNameMagnified('bear',multiplier);
        var npcman = SpriteMap.getByNameMagnified('npcman',multiplier);
        var npcgirl = SpriteMap.getByNameMagnified('npcgirl',multiplier);

        // document.body.append(rabbit);
        // document.body.append(wolf);
        // document.body.append(deer);
        // document.body.append(bear);
        // document.body.append(bear2);
        // document.body.append(bear2);
        // document.body.append(npcman);
        // document.body.append(npcgirl);

        this.w = size;
        this.h = size;
        var sprites = [
            rabbit,
            wolf,
            deer,
            bear,
            npcman,
            npcgirl
        ];
        Mob.SPRITES = sprites;
        return Mob.SPRITES;
    }
}