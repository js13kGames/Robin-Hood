import * as gf from "../Utils/gf.js";

var presetNPC={

};


export default class Villager{
    constructor(){
        this.name = 'Villager';
        this._health = 10;
        this.gender = gf.randInt(0,1) ? 'M':'F';



    }
}