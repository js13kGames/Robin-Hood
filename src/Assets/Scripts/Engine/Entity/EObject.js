import Point from '../Utils/Point.js';
export default class EObject{
    constructor(center){
        this.center = new Point(center.x,center.y);
        this.life = 1;
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            (this.center).x,
            (this.center).y,
        );
    }
}