import { makeCanvas } from "../GE/gf.js";
import { getCtx } from "../Utils/gf.js";
export default class Grid{
    static getGridBase(w,h,step,emphcenter = false, gridcolor='#343434'){
        let canvas = makeCanvas(w,h);
        let ctx = getCtx(canvas);
		// Set up the grid parameters
		var width = canvas.width;
		var height = canvas.height;
		// Draw the horizontal lines
		ctx.beginPath();
		for (var y = 0; y <= height; y += step) {
			ctx.moveTo(0, y);
			ctx.lineTo(width, y);
		}
		ctx.strokeStyle = gridcolor;
		ctx.stroke();
		// Draw the vertical lines
		ctx.beginPath();
		for (var x = 0; x <= width; x += step) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
		}
		ctx.stroke();
		// Draw the x and y axes
        if(emphcenter){
            ctx.beginPath();
            ctx.moveTo(0, height / 2);
            ctx.lineTo(width, height / 2);
            ctx.moveTo(width / 2, 0);
            ctx.lineTo(width / 2, height);
            ctx.strokeStyle = "white";
            ctx.stroke();
        }
        return canvas;
    }
}