import SpriteMaker from "../GE/SpriteMaker.js";
var bricklevel1 = ['#a35f26','#49270a'];
var bricklevel2 = ['#7f7f7f','#000000'];
var defaultSprite = Brick.getSprite(4);
export default class Brick{
    constructor(pos, w=4, e=null){
        this.center = pos;
        this.life = 1;
        this.level = 1;
        this.w = w;
        this.sprite = this.getSprite(w);
        if(e) this.e = e;
    }
    upgrade(){
        if(this.level > 2) return;
        this.level = 2;
        var sprite  = SpriteMaker.getSprite('bricks');
        SpriteMaker.transformCanvasColors(sprite,{
            '#a35f26':"#7f7f7f",
            '#49270a':"#000000"
        })
        return SpriteMaker.replicate(sprite,m,m);
    }
    changeColor(color){
        var sprite  = SpriteMaker.getSprite('bricks');
        SpriteMaker.transformCanvasColors(sprite,{
            '#a35f26':color,
            '#49270a':"#000000"
        })
        return SpriteMaker.replicate(sprite,this.w,this.w);
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            this.center.x - this.sprite.width / 2, 
            this.center.y - this.sprite.width / 2
        );
    }
    static getSprite(m=1){
        var sprite  = SpriteMaker.getSprite('bricks');
        return SpriteMaker.replicate(sprite,m,m);
    }
}