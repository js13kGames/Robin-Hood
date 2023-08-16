import {makeCanvas,getCtx,getColor} from '../Utils/gf.js';
import Sprite from './Sprite.js';
export default class SpriteEngine{
    getSpriteObject(canvas){
        var _sprite = new Sprite();
        _sprite.canvas = canvas;
        _sprite.width = canvas.width;
        _sprite.height= canvas.height;
        _sprite.colorSet = new Set();

        var context = getCtx(canvas);
        var width = canvas.width;
        var height = canvas.height;
        var imageData = context.getImageData(0, 0, width, height);
        var data = imageData.data;
        var colorMatrix = [];
        for (var i = 0; i < data.length; i += 4) {
            var color = getColor(data[i],data[i + 1],data[i + 2],data[i + 3]);
            _sprite.colorSet.add(color);
            colorMatrix.push(color);
        }
        var matrix = [];
        for(let i = 0 ; i < canvas.height;i++){matrix[i] = [];}
        let c = 0, r = 0;
        for(let z in colorMatrix){
            if(r >= canvas.height) {c++;r = 0;}
            matrix[r][c] = colorMatrix[z];
            r++;
        }
        _sprite.colorMatrix = matrix;
        return _sprite;
    }
    colorsMatrixToSprite(matrix){
        let width = matrix.length;
        let height = Math.max(...matrix.map((row)=> row.length));
        var buffer = makeCanvas(width,height);
        var ctx = getCtx(buffer);
        for(let i in matrix){
            for(let j in matrix[i]){
                ctx.fillStyle = matrix[i][j];
                ctx.fillRect(i,j,1,1);
            }
        }
        return buffer;
    }
    magnify(canvas,scale = 2){
        var buffer = makeCanvas(canvas.width * scale, canvas.height * scale);
        var ctx = getCtx(buffer);
        var matrix = this.getColorsMatrix(canvas);
        for(let i = 0 ; i < canvas.width;i++){
            for(let j = 0 ; j < canvas.height;j++){
                ctx.fillStyle = matrix[i][j];
                ctx.fillRect(i * scale,j * scale,scale,scale);
            }
        }
        return buffer;
    }
    getColorsMatrix(canvas){
        var context = getCtx(canvas);
        var width = canvas.width;
        var height = canvas.height;
        var imageData = context.getImageData(0, 0, width, height);
        var data = imageData.data;
        var colorMatrix = [];
        for (var i = 0; i < data.length; i += 4) {
            colorMatrix.push(
                getColor(
                    data[i],
                    data[i + 1],
                    data[i + 2],
                    data[i + 3]
                    )
                );
        }
        var matrix = [];
        for(let i = 0 ; i < canvas.height;i++){matrix[i] = [];}
        let c = 0, r = 0;
        for(let z in colorMatrix){
            if(r >= canvas.height) {c++;r = 0;}
            matrix[r][c] = colorMatrix[z];
            r++;
        }
        return matrix;
    }
    cloneCanvas(canvas){
        if(!canvas) return null;
        let buffer = makeCanvas(canvas.width,canvas.height);
        let ctx = getCtx(buffer);
        ctx.drawImage(canvas,0,0);
        return buffer;
    }
    crop(canvas,x,y,width,height){
        let buffer = makeCanvas(width,height);
        let context = getCtx(buffer);
        context.drawImage(
            canvas,
            x,
            y,
            width,
            height,
            0,
            0,
            width,
            height);
        return buffer;
    }
    transformCanvasColors(canvas,transformation,scale = 1){
        let matrix = this.getColorsMatrix(canvas);
        var buffer = makeCanvas(canvas.width * scale, canvas.height * scale);
        var ctx = getCtx(buffer);
        for(let i = 0 ; i < canvas.width;i++){
            for(let j = 0 ; j < canvas.height;j++){
                var data = matrix[i][j];
                if(data == null || transformation[data] == "_"){
                    continue;
                }
                ctx.fillStyle = transformation[data] ? transformation[data] : data;
                ctx.fillRect(i * scale,j * scale,scale,scale);
            }
        }
        return buffer;
    }
    rotate(deg){
        
    }
}