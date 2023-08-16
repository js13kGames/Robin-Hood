export default class Segment{
    constructor(a,b,color, life = 15){
        this.a = a;
        this.b = b;
        this.color = color;
        this.life = life;
    }
    update(time){
        this.life--;
        if(this.life <= 0) this.delete = true;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}