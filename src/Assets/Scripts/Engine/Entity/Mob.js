import * as gf from '../Utils/gf.js';
import SpriteMap from "../Sprites/SpriteMap.js";
import Point from '../Utils/Point.js';
const MOBSPECS = [
    {mcd : 50},
    {mcd : 50},
    {mcd : 50},
    {mcd : 50},
    {mcd : 50},
    {mcd : 50},
    {mcd : 50},
]
export default class Mob{

    constructor(gamescene,type = 0){
        this.type = type;
        this.scene = gamescene;
        this.sprites = this.getSprites();
        this.sprite = this.sprites[this.type];
        this.center = gamescene.findAValidSpawnPoint(8,25);
        this.life = 1 + this.type * 2;
        this.moveCountDown = MOBSPECS[this.type].mcd;
    }
    getPossibleNextMove(){
        let possibleMoves = [];
        var step = this.scene.tileSize;
        let x = this.center.x / step;
        let y = this.center.y / step;
        if(this.scene.checkObstacle(x+1,y)){
            possibleMoves.push(new Point())
        }
        if(this.scene.checkObstacle(x+1,y)){
            possibleMoves.push(new Point(x*step+step,y*step))
        }
        if(this.scene.checkObstacle(x-1,y)){
            possibleMoves.push(new Point(x*step-step,y*step))
        }
        if(this.scene.checkObstacle(x,y+1)){
            possibleMoves.push(new Point(x*step,y*step+step))
        }
        if(this.scene.checkObstacle(x,y-1)){
            possibleMoves.push(new Point(x*step,y*step-step))
        }
        // console.log(possibleMoves);
        if(possibleMoves.length > 0){
            var move = possibleMoves[gf.randInt(0,possibleMoves.length)];
            this.center = new Point(move.x,move.y);
        }
    }
    update(time){
        this.time = time;
        this.moveCountDown--;
        // console.log('mob update',this.moveCountDown);
        if(this.moveCountDown<=0){
            this.moveCountDown = MOBSPECS[this.type].mcd;
            this.getPossibleNextMove();
            if(this.center.distanceTo(this.scene.player.center) < this.scene.tileSize*2){
                this.scene.player.life -= this.type+1;
                console.log('attack player');
            }
        }
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