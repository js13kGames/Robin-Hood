export default class VertixPoint{
    constructor(x,y,speed = 4,color = "white"){
        this.x =x;
        this.y = y;
        this.speed = speed;
        this.color = color;
    }
    distanceto(another){
        let x1 = this.x;
        let y1 = this.y;
        let x2 = another.x;
        let y2 = another.y;
        if(x1 == x2 && y1 == y2) return 0;
        else if(x1 == x2) return Math.abs(y1-y2);
        else if(y1 == y2) return Math.abs(x1-x2);
        else{
            let distance = 0;
            distance += Math.pow((x1 - x2), 2);
            distance += Math.pow((y1 - y2), 2);
            distance = Math.sqrt(distance);
            return distance;
        }
    }
    movetoward(obj){
        let dx = obj.x - this.x;
        let dy = obj.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let vx = dx / distance;
        let vy = dy / distance;
        this.x += vx * this.speed;
        this.y += vy * this.speed;
    }
    movetoward2(obj){
        // console.log('move to',obj);
        if(this.x > obj.x) {
            this.x -= this.speed;
        }
        else if(this.x < obj.x) {
            this.x += this.speed;
        }
        if(this.y > obj.y) {
            this.y -= this.speed;
        }
        else if(this.y < obj.y) {
            this.y += this.speed;
        }
    }
    draw(ctx){
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x - 2,this.y - 2,4,4);
        this.drawCircle(ctx,3,this.color);
    }
    drawCircle(ctx,radius = 4,color = "green"){
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            radius,
            0,
            Math.PI * 2);
        ctx.fill();
			//ctx.stroke();
    }
}