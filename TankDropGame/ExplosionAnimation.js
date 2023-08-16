export default class ExplosionAnimation{
    constructor(center,impact = 5,color="red"){
        this.center = center;
        this.impact = impact;
        this.impactc = 0;
        this.color = "red";
    }
    update(time){
        if(this.impactc >= this.impact){
            this.delete = true;
        }
        this.impactc++;
        this.time = time;
    }
    draw(ctx){
        this.center.drawCircle(ctx,this.impactc,this.color); 
    }

}