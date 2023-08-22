export default class HealthBar{
    constructor(e){
        this.e =e;
    }
    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.e.center.x,this.e.center.y,this.e.width,20);
        ctx.fillStyle = 'red';
        ctx.fillRect(this.e.center.x,this.e.center.y,this.e.width * this.e.life / this.e.maxLife,20);
    }
}