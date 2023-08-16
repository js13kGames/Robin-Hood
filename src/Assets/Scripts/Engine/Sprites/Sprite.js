import {makeCanvas,getCtx,getColor, cloneCanvas,getDiagonal} from '../Utils/gf.js';
export default class Sprite{
    constructor(canvas,colorMatrix,colorSet){
        this.canvas = canvas;
        this.colorMatrix = colorMatrix;
        this.colorSet = colorSet;
        this.magnified = [];
        this.splicedByColor = {};
    }
    init(){

    }
    setColorMatrix(v){this.colorMatrix = v;}
    getColorMatrix(){return this.colorMatrix;}
    setColorSet(v){this.colorSet = v;}
    getColorSet(){return this.colorSet;}
    getCanvas(){return this.canvas;}
    setCanvas(v){this.canvas = v;}
    magnify(scale = 2){
        if(this.magnified[scale]) return this.magnified[scale];
        var buffer = makeCanvas(this.width * scale, this.height * scale);
        var ctx = getCtx(buffer);
        var matrix = this.colorMatrix;
        for(let i = 0 ; i < this.width;i++){
            for(let j = 0 ; j < this.height;j++){
                ctx.fillStyle = matrix[i][j];
                ctx.fillRect(i * scale,j * scale,scale,scale);
            }
        }
        this.magnified[scale] = buffer;
        return buffer;
    }
    transformColors(transformations){
        const deepClonedMatrix = JSON.parse(JSON.stringify(this.colorMatrix));
        var matrix = deepClonedMatrix;
        for(let i = 0 ; i < this.height;i++){
            for(let j = 0 ; j < this.width;j++){
                var d = matrix[i][j];
                if(d && transformations[d] && transformations[d] == '_'){
                    matrix[i][j] = 0;
                }
                else if(d && transformations[d]!=undefined && transformations[d] != '_'){
                    matrix[i][j] = transformations[d]
                }
                else{
                    matrix[i][j] = d;
                }
            }
        }
        return matrix;
    }
    clone(){
        var that = new Sprite();
        other.canvas = cloneCanvas(this.canvas);
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
    patternReplicate(times){
        return this.replicateWH(times,times);
    }
    replicateWH(w,h){
        let canvas = makeCanvas(this.width * w, this.height * h);
        var ctx = getCtx(canvas);
        for(let i = 0 ; i < w;i++){
            for(let j = 0 ; j < h;j++){
                ctx.drawImage
                ctx.drawImage(this.canvas,
                    i * this.width,
                    j * this.height,
                );
            }
        }
        return canvas;
    }
    //
    prepForRotate(image){
        let d = getDiagonal(image.width,image.height)
        let buffer = makeCanvas(d,d);
        let context = getCtx(buffer);
        context.drawImage(image,
            (d - image.width) /2,
            (d - image.height) /2
        );
        return buffer;
    }
    rotate(deg){
        
    }
}