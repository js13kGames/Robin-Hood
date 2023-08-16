export default class Line{
    constructor(center,length = 32, color="red"){
        this.center = center;
        this.length = length;
        this.color = color;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.center.x, this.center.y);
        ctx.lineTo(this.center.x, this.center.y - this.length);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

}