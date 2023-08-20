export default class PlayerAttribute{
    constructor(){
        this.ARCHERY = 4;
        this.HEALTH = 1;
        this.POWER = 1;
        this.SPEED = 8;
        this.STELTH = 1;
        this.LUCK = 1;
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