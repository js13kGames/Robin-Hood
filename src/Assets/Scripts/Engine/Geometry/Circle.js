export default class Circle{
    constructor(center,radius,outline = true,color="red",innerText = ''){
        this.center = center;
        this.radius = radius;
        this.outline = outline;
        this.color = color;
        this.innerText = innerText;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(
            this.center.x,
            this.center.y,
            this.radius,
            0,
            Math.PI * 2,
            false
        );
        if(this.innerText != ''){
            ctx.fillStyle = `hsl(${Math.random() * 60}, 100%, 50%)`;
            ctx.fillText(this.innerText, this.center.x , this.center.y);
        }
        if (this.outline) {
            ctx.strokeStyle = this.color;
            ctx.stroke();
        } else {
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
}