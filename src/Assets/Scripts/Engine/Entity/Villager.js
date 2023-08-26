import * as gf from "../Utils/gf.js";
import Mob from "./Mob.js";

var presetNPC={
    'man':[

    ],
    'girl':[

    ]
};
export default class Villager extends Mob{
    constructor(scene,center = null){
        super(scene,5,center);
        this.timesDealtWith = 0;
        this.personalDifficulity = gf.randInt(2,5);
    }
    interact(){
        console.log('interacting with player');
        this.giveQuest();
    }
    giveQuest(){
        var apples = gf.randInt(this.timesDealtWith + this.scene.difficulity,this.timesDealtWith + this.scene.difficulity + this.personalDifficulity);
        var orange = gf.randInt(this.timesDealtWith + this.scene.difficulity,this.timesDealtWith + this.scene.difficulity + this.personalDifficulity);
        console.log(`quest ${[apples,orange]}`);
        var c = confirm(`Hello Robin, i have a quest for you,\nplease bring me ${apples} apples and ${orange} oranges for ${this.personalDifficulity + this.scene.difficulity} points
        `);
        if(c){
            if(this.scene.player.oranges >= orange && this.scene.player.apples >= apples){
                this.scene.player.oranges -= orange;
                this.scene.player.apples -= apples;
                this.scene.player.points += this.personalDifficulity + this.scene.difficulity;
                this.timesDealtWith++;
            }
            else{
                alert('you dont have enough, trade with merchant in village');
            }
        }
    }
    update(time){
        // console.log('update villager');
    }
    draw(ctx){
        ctx.drawImage(this.sprite,
            (this.center).x,
            (this.center).y,
        );
    }
}