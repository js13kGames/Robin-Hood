import Point from './Point.js';
import * as gf from './gf.js';

export default class Camera{
    constructor(game,w,h,ox,oy){
        this.game = game;
        this.center = new Point(0,0);
        this.h = h;
        this.w = w;
        this.ox = ox;
        this.oy = oy;
    }
    fixToCords(point){
        this.center = new Point(point.x,point.y);
    }
    mapToPoint(point){
        this.center = point;
    }
    move(dir){
        this.center.move(dir,32);
    }
    getCanvas(canvasToCrop){
        var cxy = {
            x:this.center.x-this.w/2,
            y:this.center.y-this.h/2
        }
        var sx = cxy.x < 0 ? 0 : cxy.x;
        var sy = cxy.y < 0 ? 0 : cxy.y;

        var crop = gf.crop(canvasToCrop,
            sx,sy,
            this.w,this.h
        );
        return crop;

        var canvas = gf.makeCanvas(this.w,this.h);
        var ctx = gf.getCtx(canvas);
        this.draw(ctx,canvasToCrop);
        return canvas;
    }
    draw(ctx,canvasToCrop){
        let buffer = canvasToCrop;
        let sx,sy,sWidth,sHeight,dx,dy,dWidth,dHeight;
        sx=sy=sWidth=sHeight=dx=dy=dWidth=dHeight = 0;
        let edge = {
            x : this.center.x - (this.w / 2),
            y : this.center.y - (this.h / 2),
        }
        sx = edge.x;
        sy = edge.y;
        if(sx <= 0) {
            sx = 0;
            this.center.x = sx + this.w / 2;
        }
        if(sy <= 0) {
            sy = 0;
            this.center.y = sy + this.h/2;
        }
        if(sx + this.w > buffer.width){
            sx = buffer.width - this.w;
            this.center.x = sx + this.w / 2;
        }
        if(sy + this.h > buffer.height){
            sy = buffer.height - this.h;
            this.center.y = sy + this.h/2;
        }
        dx = this.ox;
        dy = this.oy;
        sWidth  = dWidth = this.w;
        sHeight = dHeight = this.h;
        ctx.drawImage(buffer, 
            sx, 
            sy, 
            sWidth, 
            sHeight, 
            dx, 
            dy, 
            dWidth, 
            dHeight);
            
    }
    getFxy(x,y){
        let fx = x + this.center.x - this.w / 2 - this.ox ;
        let fy = y + this.center.y - this.h / 2 - this.oy ;
        fx = Math.floor(fx/32) * 32 + 16;
        fy = Math.floor(fy/32) * 32 + 16;
        return new Point(fx,fy);
    }
}