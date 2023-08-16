
import SpriteMaker  from '../GE/SpriteMaker.js';
import {DIRECTION, max, rand, randInt}  from '../GE/gf.js';
import Point        from '../GE/Point.js';
import {TankSpecs}  from './Data.js';
import Circle from '../src/Assets/Scripts/Engine/Geometry/Circle.js'
import Line from '../src/Assets/Scripts/Engine/Geometry/Line.js'
import Segment from '../src/Assets/Scripts/Engine/Geometry/Segment.js'
import Bullet from './Bullet.js';
 
var tankBaseColors = ['#cfcfcf','#a9a9a9','#6a6a6a'];
export default class Tank{
    constructor(e,level = 1, pos = null , color = "#ffffff", automate = true){
        this.e = e;
        this.level = level;
        this.specs = TankSpecs['t' + level];
        this.life = this.specs.life;
        this.color = color;
        this.sprite = this.getSprite(level);
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.moves  = 0;
        this.attacks  = 0;
        this.rotation = 0;
        this.dir = DIRECTION.UP;
        this.center = this.destination = this.latestDestination = new Point(pos.x,pos.y);
        this.attackRange = new Circle(this.center,this.specs.range * 32,true,"red");
        this.attackLine = null;
        this.attackLines = [];
        this.automate = automate;
        for(let i = 0 ;i < 8;i++){
            // let r = Math.PI * i / 4;
            // this.e.Objects.push(new Circle(this.center.moveAngleClone(r,128),5,true,'blue',i));
            // this.e.Objects.push(new Circle(this.center.moveAngleClone(r,64),5,true,'pink',i));
        }
    }
    getSprite(level = 1){
        let sprite = SpriteMaker.getSprite(`tank0${level}`);
        sprite = SpriteMaker.transformCanvasColors(sprite,{"#ffffff":"_",
            "#cfcfcf": `hsl(${Math.random() * 60 }, 100%, 50%)`,
            "#a9a9a9": `hsl(${Math.random() * 60 }, 100%, 50%)`,
            "#6a6a6a": `hsl(${Math.random() * 60 }, 100%, 50%)`,
        });
        return sprite;
    }
    update(time){
        if(!this.dt) this.dt = 0;
        this.dt++;
        if(this.destination && !this.destination.is(this.center)){
            this.rotation = this.center.getAngleTo(this.destination);
            this.center.movetowardGrid(this.destination,4);
        }
        else{
            this.destination = this.center;
        }
        if(this.dt >= 33 && this.automate){
            this.dt = 0;
            // this.rotation += Math.PI / 180 * 90;
            this.makeAction();
        }
        this.time = time;
        if(this.life < 1){
            this.delete = true;
        }
    }
    makeAction(){
        if(Math.random() > 0.99) this.fire();
        let targets = this.findTarget();
        if(targets.length > 0){
            targets.sort((a, b) => a.d - b.d);
            let closest = targets[0];
            this.rotation = this.center.getAngleTo(closest.o.center);
            //this.attackLine = new Segment(this.center,closest.o.center,'blue');
            this.fire(closest.o.center);
        }
        else{
            let move = this.getNearByTiles();
            if(move.length > 0)
                this.destination = move[randInt(0,move.length)];
        }
    }
    findTarget(){
        let targets = [];
        this.e.getObjects().forEach(o=>{
            if(o == this) return;
            if(o instanceof Tank){
                let d = o.center.distanceTo(this.center);
                if(d <= this.e.main.config.tile * this.specs.range){
                    targets.push({
                        o:o,d:d
                    });
                }
            }
        });
        return targets;
    }
    getNearByTiles(){
        var u = this.center.moveClone(DIRECTION.UP,    this.e.main.config.tile);
        var d = this.center.moveClone(DIRECTION.DOWN,  this.e.main.config.tile);
        var l = this.center.moveClone(DIRECTION.LEFT,  this.e.main.config.tile);
        var r = this.center.moveClone(DIRECTION.RIGHT, this.e.main.config.tile);
        var NearByTiles = [u,d,l,r];
        NearByTiles = NearByTiles.filter(x=>this.validPoint(x));
        return NearByTiles;
    }
    DrawNearByTiles(ctx,origin = null,depth=0,maxdepth = 2){
        if(origin == null){
            origin = this.center;
        }
        var u = origin.moveClone(DIRECTION.UP,    this.e.main.config.tile);
        var d = origin.moveClone(DIRECTION.DOWN,  this.e.main.config.tile);
        var l = origin.moveClone(DIRECTION.LEFT,  this.e.main.config.tile);
        var r = origin.moveClone(DIRECTION.RIGHT, this.e.main.config.tile);
        var list = [u,d,l,r].filter(x=>this.validPoint(x));
        list.forEach(o=>{
            o.draw(ctx,'green');
            if(depth < maxdepth) this.DrawNearByTiles(ctx,o,depth+1,maxdepth);
        })
    }
    attackNearBy(start = null,depth = 0,maxdepth = 2){
        if(start == null){
            start = this.center;
        }
        var u = start.moveClone(DIRECTION.UP,    this.e.main.config.tile);
        var d = start.moveClone(DIRECTION.DOWN,  this.e.main.config.tile);
        var l = start.moveClone(DIRECTION.LEFT,  this.e.main.config.tile);
        var r = start.moveClone(DIRECTION.RIGHT, this.e.main.config.tile);
        [u,d,l,r].forEach(o=>{
            let t = this.e.getObjects().filter(x=> x.center && x.center.is(o));
        });
    }
    fire(target){
        let b = new Bullet(this,0,target);
        this.e.Objects.push(b);
    }
    moveToward(point){
        this.destination = point;
    }
    draw(ctx){
        // ctx.drawImage(this.rotateCW(this.sprite,this.rotation),
        //     this.center.x - this.width/2, 
        //     this.center.y - this.height/2);
        ctx.save(); // Save the current state of the context
        ctx.translate(this.center.x, this.center.y); // Move the context to the center of the triangle
        ctx.rotate(this.rotation); // Rotate the context by the specified angle (in radians)
        ctx.translate(-this.center.x, -this.center.y); // Move the context back to the original position
        ctx.drawImage(this.sprite,
            this.center.x - this.width/2, 
            this.center.y - this.height/2);
        this.attackRange.draw(ctx);
        // this.DrawNearByTiles(ctx);
        
        ctx.restore();
        
        if(this.destination && !this.destination.is(this.center)){
            this.destination.draw(ctx,"red");
        }
        if(this.attackLine) this.attackLine.draw(ctx);
    }
    validPoint(point){
        if(point.x <= this.e.main.config.tile ) {return false;}
        if(point.y <= this.e.main.config.tile * 2) {return false;}
        
        if(point.x >= this.e.main.config.tile * 7 ) {return false;}
        if(point.y >= this.e.main.config.tile * 14 ) {return false;}
        let nottaken = true;
        this.e.getObjects().forEach(o=>{
            if(o == this) return;
            if(o instanceof Tank){
                let d = o.center.distanceTo(point);
                if(d <= this.e.main.config.tile){
                    nottaken = true;
                }
            }
        });
        return nottaken;
    }
}