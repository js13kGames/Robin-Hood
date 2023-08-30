export default class PlayerAttribute{
    constructor(level){
        this.ARCHERY = 6;
        this.HEALTH = 1;
        this.POWER = 1;
        this.SPEED = 10;
        this.STELTH = 1;
        this.LUCK = 1;
    }
    enableGodMode(){
        this.ARCHERY = 15;
        this.HEALTH = 15;
        this.POWER = 15;
        this.SPEED = 15;
        this.STELTH = 15;
        this.LUCK = 15;
    }
    static clone(obj){
        var newAttr = new PlayerAttribute();
        newAttr.ARCHERY = obj.ARCHERY;
        newAttr.HEALTH = obj.HEALTH;
        newAttr.POWER = obj.POWER;
        newAttr.SPEED = obj.SPEED;
        newAttr.STELTH = obj.STELTH;
        newAttr.LUCK = obj.LUCK;
    }
    getAttributeClasses(){
        return [
            {n:'ARCHERY', s: this.ARCHERY ,c : this.getAttributeClass(this.ARCHERY) },
            {n:'HEALTH', s: this.HEALTH ,c : this.getAttributeClass(this.HEALTH) },
            {n:'POWER', s: this.POWER ,c : this.getAttributeClass(this.POWER) },
            {n:'SPEED', s: this.SPEED ,c : this.getAttributeClass(this.SPEED) },
            {n:'STELTH', s: this.STELTH ,c : this.getAttributeClass(this.STELTH) },
            {n:'LUCK', s: this.LUCK ,c : this.getAttributeClass(this.LUCK) },
        ];
    }
    getAttrByName(n){
        switch(n){
            case 'ARCHERY':return this.ARCHERY;
            case 'HEALTH':return this.HEALTH;
            case 'POWER':return this.POWER;
            case 'SPEED':return this.SPEED;
            case 'STELTH':return this.STELTH;
            case 'LUCK':return this.LUCK;
            default : return 0;
        }
    }
    editAttrByName(n,v){
        switch(n){
            case 'ARCHERY':this.ARCHERY = v; return true;
            case 'HEALTH':this.HEALTH = v; return true;
            case 'POWER':this.POWER = v; return true;
            case 'SPEED':this.SPEED = v; return true;
            case 'STELTH':this.STELTH = v; return true;
            case 'LUCK':this.LUCK = v; return true;
            default : return false;
        }
    }
    getStatMenu(){
        return [
            {n:'HEALTH', v : this.HEALTH },
            {n:'POWER', v : this.POWER },
            {n:'ARCHERY', v : this.ARCHERY },
            {n:'SPEED', v : this.SPEED },
            {n:'STELTH', v : this.STELTH },
            {n:'LUCK', v : this.LUCK },
        ]
    }
    static getAttributeClass(score){
        if(score < 10) return 'G';
        if(score < 20) return 'F';
        if(score < 30) return 'E';
        if(score < 40) return 'D';
        if(score < 50) return 'C';
        if(score < 60) return 'B';
        if(score < 99) return 'A';
        return 'S';
    }
    static getClassMultiplier(name){
        switch(name.toUpperCase()){
            case 'G': return 1;
            case 'F': return 5;
            case 'E': return 10;
            case 'D': return 20;
            case 'C': return 50;
            case 'B': return 100;
            case 'A': return 1000;
            case 'S': return Infinity;
        }
    }
}