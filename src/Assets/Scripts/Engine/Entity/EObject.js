import Point from '../Utils/Point.js';
export default class EObject{
    constructor(center){
        this.center = new Point(center.x,center.y);
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            (this.center).x,
            (this.center).y,
        );
    }
}