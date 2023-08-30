import * as gf from "../Utils/gf.js";
import Mob from "./Mob.js";
export default class Villager extends Mob{
    constructor(scene,center = null){
        super(scene,5,center);
        this.timesDealtWith = 0;
        this.personalDifficulity = gf.randInt(2,5);
    }
    interact(){
        this.giveQuest();
    }
    giveQuest(){
        var randInc = gf.randInt(0,this.timesDealtWith);
        var apples = gf.randInt(randInc + this.scene.difficulity,randInc + this.scene.difficulity + this.personalDifficulity);
        var orange = gf.randInt(randInc + this.scene.difficulity,randInc + this.scene.difficulity + this.personalDifficulity);
        var pt = (this.personalDifficulity + this.scene.difficulity) * this.scene.player.attributes.LUCK;
        var c = confirm(`Quest\n ${apples} apples and ${orange} oranges for ${pt} points`);
        if(c){
            if(this.scene.player.oranges >= orange && this.scene.player.apples >= apples){
                this.scene.player.oranges -= orange;
                this.scene.player.apples -= apples;
                this.scene.player.points += pt;
                this.timesDealtWith++;
            }
            else{
                alert('insufficient materials');
            }
        }
    }
    update(time){
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            (this.center).x,
            (this.center).y,
        );
    }
}