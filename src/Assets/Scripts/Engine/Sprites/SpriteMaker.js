import {makeCanvas,getDiagonal, getCtx} from '../Utils/gf.js';
var spriteMap = [
    {x:88, y: 0, n:"brick",w:8, h:8},
    {x:96, y: 0, n:"grass",w:8, h:8},
    {x:104, y: 0, n:"dirt",w:8, h:8},
    {x:88, y: 8, n:"water",w:8, h:8},
    {x:96, y: 8, n:"stone",w:8, h:8},

    {x:128, y:0, n:"castle",w:32, h:32},
    
    {y:64, x:32*0, n:"tank01",w:32, h:32},
    {y:64, x:32*1, n:"tank02",w:32, h:32},
    {y:64, x:32*2, n:"tank03",w:32, h:32},
    {y:64, x:32*3, n:"tank04",w:32, h:32},
    {y:64, x:32*4, n:"tank05",w:32, h:32},
    {y:64, x:32*5, n:"tank06",w:32, h:32},

    {y:96, x:32*0, n:"tank11",w:32, h:32},
    {y:96, x:32*1, n:"tank12",w:32, h:32},
    {y:96, x:32*2, n:"tank13",w:32, h:32},
    {y:96, x:32*3, n:"tank14",w:32, h:32},
    {y:96, x:32*4, n:"tank15",w:32, h:32},
    {y:96, x:32*5, n:"tank16",w:32, h:32},

    {y:128, x:32*0, n:"tankR1",w:32, h:32},
    {y:128, x:32*1, n:"tankR2",w:32, h:32},
    {y:128, x:32*2, n:"tankR3",w:32, h:32},
    {y:128, x:32*3, n:"tankR4",w:32, h:32},
    {y:128, x:32*4, n:"tankR5",w:32, h:32},
    {y:128, x:32*5, n:"tankR6",w:32, h:32},

    {x:88, y: 16, n:"b01",w:8, h:8},
    {x:88, y: 24, n:"b02",w:8, h:8},
    {x:96, y: 16, n:"b03",w:8, h:16},
    {x:104, y: 16, n:"b04",w:16, h:16},

    {x:16*0, y: 32, n:"menu",w:16, h:16},
    {x:16*1, y: 32, n:"store",w:16, h:16},
    {x:16*2, y: 32, n:"home",w:16, h:16},
    {x:16*3, y: 32, n:"attack",w:16, h:16},
    {x:16*4, y: 32, n:"next",w:16, h:16},
    {x:16*5, y: 32, n:"move",w:16, h:16},
    {x:16*6, y: 32, n:"rotate",w:16, h:16},
    {x:16*7, y: 32, n:"end",w:16, h:16},
    {x:16*8, y: 32, n:"build",w:16, h:16},
    {x:16*9, y: 32, n:"upgrade",w:16, h:16},
    {x:16*10, y: 32, n:"sheild",w:16, h:16},
    {x:16*11, y: 32, n:"sell",w:16, h:16},

];
export default class SpriteMaker{
    constructor(){}
    //old
    static getSpriteMap(){
        let img = document.querySelector('#spriteSheetMain');
        return SpriteMaker.crop(img,0,0,img.width,img.height);

    }
    static getSpriteFromDef(def){
        let img = document.querySelector('#spriteSheetMain');
        return SpriteMaker.crop(img,def.x,def.y,def.w,def.h);
    }
    static getSprite(name){
        let def = spriteMap.find(x=>x.n == name);
        if(def.c) return def.c;
        def.c = this.getSpriteFromDef(def);
        return def.c;
    }
    static getSpritePNG(name){
        let c = this.getSprite(name);
        return this.MakePng(c);
    }
    static getSpriteMagnified(name,scale){
        let s = this.getSprite(name);
        return this.magnify(s,scale);
    }
    static getAllSprites(cb){
        let sprites = [];
        for(let i in spriteMap){
            let s = spriteMap[i];
            let c = this.getSpritePNG(s.n);
            c.setAttribute('name',s.n);
            sprites.push(c);
        }
        SpriteMaker.Sprites = sprites;
        if(cb) cb(sprites);
        return sprites;
    }
    static getcolor(r, g, b, a) {
        if(r+g+b+a == 0){
            return null;
        }
        else if(r+g+b == 0){
            return '#000000';
        }
        else if (r > 255 || g > 255 || b > 255){
            return '#000000';
        }
        return '#' + ((r << 16) | (g << 8) | b).toString(16).slice(-6);
    }
    
    static getColorsMatrix(canvas,keeprotate = false){
        var context = canvas.getContext("2d");
        var width = canvas.width;
        var height = canvas.height;
        var imageData = context.getImageData(0, 0, width, height);
        var data = imageData.data;
        var colorMatrix = [];
        for (var i = 0; i < data.length; i += 4) {
            colorMatrix.push(
                SpriteMaker.getcolor(
                    data[i],
                    data[i + 1],
                    data[i + 2],
                    data[i + 3]
                    )
                );
        }
        var matrix = [];
        let r = 0; let c = 0;
        for(let i = 0 ; i < colorMatrix.length;i++){
            if(!matrix[r]) matrix[r] = [];
            matrix[r][c] = colorMatrix[i];
            if(c >= canvas.height-1){c = 0 ;r++;}
            else{c++;}
        }
        // matrix.reverse();
        // return matrix;
        return keeprotate ? matrix : SpriteMaker.rotateMatrix(matrix,canvas.height,canvas.width);
    }
    static rotateMatrix(matrix,height,width){
        // Create a new matrix with rotated dimensions
        var rotatedMatrix = [];
        var rotatedWidth = height; // New width after rotation
        var rotatedHeight = width; // New height after rotation
        for (let x = 0; x < rotatedWidth; x++) {
            rotatedMatrix[x] = [];
            for (let y = 0; y < rotatedHeight; y++) {
            rotatedMatrix[x][y] = matrix[rotatedHeight - y - 1][x]; // Rotate the pixel values
            }
        }
        return rotatedMatrix;
    }
    static getColorsMap(canvas,ommitcolor){
        let map = [];
        let ctx = canvas.getContext('2d',{willReadFrequently: true});
        ctx.canvas.willReadFrequently = true;
        for(let i = 0; i < canvas.height; i++){
            map[i]=[];
            for(let j = 0 ; j < canvas.width; j++){
                map[i][j]=null;
            }
        }
        for(let i = 0; i < canvas.height; i++){
            map[i]=[];
            for(let j = 0 ; j < canvas.width; j++){
                let data = ctx.getImageData(j,i,1,1).data;
                if(data == ommitcolor) continue;
                data = SpriteMaker.getcolor(data[0],data[1],data[2],data[3]);
                map[j][i] = data;
            }
        }
        return map;
    }
    static transformCanvasColors(canvas,transformation){
        if(!canvas) return null;
        canvas = this.clone(canvas);
        canvas.willReadFrequently = true;
        let scale = 1;
        let ctx = canvas.getContext('2d',{willReadFrequently: true});
        ctx.canvas.willReadFrequently = true;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if(!imageData) {
            console.log('return same canvas');
            return canvas;
        }
        const canvas2 = makeCanvas(canvas.width * scale,canvas.height * scale);
        let ctx2 = getCtx(canvas2);
        let ofx = 0, ofy = -scale;
        for(let i = 0; i < canvas.height; i++){
            ofx = -scale;
            ofy += scale;
            for(let j = 0 ; j < canvas.width; j++){
                ofx += scale;
                let data = ctx.getImageData(j,i,1,1)?.data;
                if(!data) continue;
                data = SpriteMaker.getcolor(data[0],data[1],data[2],data[3]);
                if(data == null || transformation[data] == "_"){
                    continue;
                }
                ctx2.fillStyle = transformation[data] ? transformation[data] : data;
                ctx2.fillRect(ofx, ofy,scale,scale);
            }
        }
        return canvas2;
    }
    magnify(canvas,scale = 2){
        var buffer = makeCanvas(canvas.width * scale, canvas.height * scale);
        var ctx = buffer.getContext('2d');
        var matrix = SpriteMaker.getColorsMatrix(canvas);
        for(let i = 0 ; i < canvas.width;i++){
            for(let j = 0 ; j < canvas.height;j++){
                ctx.fillStyle = matrix[i][j];
                ctx.fillRect(i * scale,j * scale,scale,scale);
            }
        }
        return buffer;
    }
    static to64(c){
        return c.toDataURL();
    }
    static screenshot(canvas){
        var imgURL = canvas.toDataURL('image/jpeg');
        var dlLink = document.createElement('a');
        dlLink.download = 'screenshot.jpeg';
        dlLink.href = imgURL;
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    }
    static crop(canvas,x,y,width,height){
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
    static pxielToCanvas(blueprint,canvasTransformations, width, height){
        let ctx = getCtx(blueprint);
        let canvas2 = makeCanvas(blueprint.width * width,blueprint.height * height);
        let ctx2 = getCtx(canvas2);
        let ofx = 0, ofy = Math.min(-height,blueprint.height);
        for(let i = 0; i < blueprint.height; i++){
            ofx = -width;
            ofy += height;
            for(let j = 0 ; j < blueprint.width; j++){
                ofx += width;
                let data = ctx.getImageData(j,i,1,1).data;
                data = SpriteMaker.getcolor(data[0],data[1],data[2],data[3]);
                if(data == null){
                    continue;
                }
                let transformatedCanvas = canvasTransformations[data];
                if(transformatedCanvas && transformatedCanvas.length > 1){
                    transformatedCanvas = transformatedCanvas[randInt(0,transformatedCanvas.length)];
                }
                if(transformatedCanvas && transformatedCanvas != '_'){
                    ctx2.drawImage(transformatedCanvas,ofx, ofy, width, height);
                }
            }
        }
        return canvas2;
    }
    static MakePng(canvas){
        return SpriteMaker.transformCanvasColors(this.clone(canvas),{"#ffffff":"_"});
    }
    static clone(canvas){
        if(!canvas) return null;
        let buffer = makeCanvas(canvas.width,canvas.height);
        let ctx = getCtx(buffer);
        ctx.drawImage(canvas,0,0);
        return buffer;
    }
    static replicate(canvas,tw,th){
        if(!canvas) return null;
        let buffer = makeCanvas(canvas.width * tw,canvas.height * th);
        let ctx = getCtx(buffer);
        for(let i = 0 ; i < tw;i++){
            for(let j = 0 ; j < th; j++){
                ctx.drawImage(canvas,
                    i * canvas.width,
                    j * canvas.height,
                );
            }
        }
        return buffer;
    }
    static fuseColor(canvas,color,composite = 'source-atop'){
        let buffer = makeCanvas(canvas.width,canvas.height);
        let ctx = getCtx(buffer);
        ctx.drawImage(canvas,0,0);
        ctx.globalCompositeOperation = composite;
        ctx.fillStyle = color;
        ctx.fillRect(0,0,buffer.width,buffer.height);
        return buffer;
    }
    static fuseImage(canvas,canvas2,composite = 'source-atop'){
        let buffer = makeCanvas(canvas.width,canvas.height);
        let ctx = getCtx(buffer);
        ctx.drawImage(canvas,0,0);
        ctx.globalCompositeOperation = composite;
        for(let i = 0 ; i < canvas.width/canvas2.width;i++){
            for(let j = 0 ; j < canvas.height/canvas2.height;j++){
                ctx.drawImage(canvas2,
                    i * canvas2.width,
                    j * canvas2.height);
            }
        }
        return buffer;
    }
    static getGrid(canvas1,canvas2){
        let buffer = makeCanvas(canvas1.width + canvas2.width,canvas1.height + canvas2.height);
        let ctx = getCtx(buffer);
        ctx.drawImage(canvas1,0,0);
        ctx.drawImage(canvas1,canvas1.width,canvas2.height);
        ctx.drawImage(canvas2,canvas1.width,0);
        ctx.drawImage(canvas2,0,canvas1.height);
        return buffer;
    }
    static Lightify(canvas,opacity){
        let buffer = makeCanvas(canvas.width,canvas.height);
        let ctx = getCtx(buffer);
        ctx.globalAlpha = opacity;
        ctx.drawImage(canvas,0,0);
        ctx.globalAlpha = 1;
        return buffer;
    }
    static rotateCW(image,times = 2,passed = 0){
        if(times <= 0 || times >= 8) {
            document.body.append(image);
            return image;
        }
        if(times >= 8) times -= 8;
        if(times < 0) times += 8;
        if(passed==0 && times%2 != 0){
            image = this.prepForRotate(image);
        }
        let buffer = makeCanvas(image.width,image.height);
        let context = getCtx(buffer);
        if(times % 2 == 0){
            context.setTransform(0,1,-1,0,image.width,0);
            context.drawImage(image,0,0);
            context.setTransform(1,0,0,1,0,0);
            return this.rotateCW(buffer,times-2,passed+2);
        }
        else{
            context.rotate(Math.PI/4);
            context.drawImage(image,image.width/4,-image.height/2);
            return this.rotateCW(buffer,times-1,passed++);
        }
    }
    static prepForRotate(image){
        let d = getDiagonal(image.width,image.height)
        let buffer = makeCanvas(d,d);
        let context = getCtx(buffer);
        context.drawImage(image,
            (d - image.width) /2,
            (d - image.height) /2
        );
        return buffer;
    }
    static mirror(canvas,h = true){
        let buffer = makeCanvas(canvas.width,canvas.height);
        let context = getCtx(buffer);
        context.save();
        if(h){
            context.scale(-1, 1);
            context.drawImage(canvas, 0, 0, canvas.width*-1, canvas.height);
        }
        else{
            context.scale(1, -1);
            context.drawImage(canvas, 0, 0, canvas.width, canvas.height*-1);
        }
        context.restore();
        return buffer;
    }
    static flip(canvas){
        let buffer = makeCanvas(canvas.width*4,canvas.height*4);
        let context = getCtx(buffer);
        context.scale(-1,1);
        context.translate(canvas.width,canvas.height);
        context.drawImage(canvas,0,0);
        document.body.append(buffer);
    }
    //new

}