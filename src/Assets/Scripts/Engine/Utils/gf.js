const PI = Math.PI;
const getDomElements = (selector, container = document) => container.querySelectorAll(selector);
const querySelector = (selector, container = document) => container.querySelector(selector);
const abs = (a)=> a < 0 ? -a : a;
const min = (a, b)=> a < b ?  a : b;
const max = (a, b)=> a > b ?  a : b;
const sign = (a)=> a < 0 ? -1 : 1;
const mod = (a, b=1)=> ((a % b) + b) % b;
const clamp = (v, min=0, max=1)=> v < min ? min : v > max ? max : v;
const percent = (v, min=0, max=1)=> max-min ? clamp((v-min) / (max-min)) : 0;
const lerp = (p, min=0, max=1)=> min + clamp(p) * (max-min);
const smoothStep = (p)=> p * p * (3 - 2 * p);
const nearestPowerOfTwo = (v)=> 2**Math.ceil(Math.log2(v));
const isOverlapping = (pA, sA, pB, sB)=> abs(pA.x - pB.x)*2 < sA.x + sB.x & abs(pA.y - pB.y)*2 < sA.y + sB.y;
const wave = (frequency=1, amplitude=1, t=time)=> amplitude/2 * (1 - Math.cos(t*frequency*2*PI));
const formatTime = (t)=> (t/60|0)+':'+(t%60<10?'0':'')+(t%60|0);
const rand = (a=1, b=0)=> b + (a-b)*Math.random();
const randInt = (a=1, b=0)=> rand(a,b)|0;
const randSign = ()=> (rand(2)|0) * 2 - 1;
const randInCircle = (radius=1, minRadius=0)=> radius > 0 ? randVector(radius * rand(minRadius / radius, 1)**.5) : new Vector2;
const makeCanvas = (w=0,h=0) => {
    let c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
}
const getCtx = (canvas) => {
    return canvas.getContext('2d');
}
const drawOnCanvas = (canvas,img,x=0,y=0)=>{
    getCtx(canvas).drawImage(img,x,y);
}
const loadImage = (url,attr,callback)=>{
    var img = new Image();
    img.src = url;
    if(attr) {
        for(let i in attr){
            img[i] = attr[i];
        }
    }
    img.addEventListener('load',()=>{
        callback(img);
    });
}
const getDiagonal = (w,h)=>{
    return Math.sqrt(w*w+h*h);
}
const getColor = (r, g, b, a)=> {
    if(r+g+b+a == 0){
        return null;
    }
    else if(r+g+b == 0){
        return '#000000';
    }
    else if (r > 255 || g > 255 || b > 255){
        return '#000000';
    }
    return '#' + ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
    // return '#' + ((r << 16) | (g << 8) | b).toString(16).slice(-6);
}
const rotateCanvas = (canvas, rotation, diagonal = true) => {
    let width, height;

    if(diagonal && rotation % (Math.PI / 4) != 0) {
        const diagonal = getDiagonal(canvas.width, canvas.height);
        width = height = diagonal;
    } else {
        width = canvas.width;
        height = canvas.height;
    }

    const buffer = makeCanvas(width, height);
    const ctx = getCtx(buffer);
    const center = { x: width / 2, y: height / 2 };

    // Improve scaling quality
    ctx.imageSmoothingQuality = "high";

    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(rotation);
    // Use the drawImage function with source and destination rectangles
    ctx.drawImage(
        canvas,
        0, 0, canvas.width, canvas.height, // Source rectangle (entire canvas)
        -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height // Destination rectangle
    );

    ctx.restore();
    return buffer;
};
const rotateCanvasCw = (canvas,times,diagonal = true) => {
    times = times % 8;
    return rotateCanvas(canvas, times * PI/4, diagonal);
}
const crop = (canvas,x,y,width,height)=>{
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
const colorsMatrixToSprite = (matrix,scale = 1,deform = null)=>{
    let height = matrix.length;
    let width = Math.max(...matrix.map((row)=> row.length));
    var buffer = makeCanvas(width * scale,height* scale);
    var ctx = getCtx(buffer);
    for(let i = 0 ; i < height;i++){
        for(let j = 0 ; j < width;j++){
            var color = matrix[i][j];
            if(deform) color = deform(color);
            if(!color || color == '') continue;
            ctx.fillStyle = color;
            ctx.fillRect(j*scale,i*scale,scale,scale);
        }
    }
    return buffer;
}
const getColorMatrix = (canvas,changefct)=>{
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
    for(let i = 0 ; i < colorMatrix.length;i++){
        if(c >= canvas.width){r++;c=0}
        matrix[r][c] = colorMatrix[i];

        // if(r >= canvas.height) {c++;r = 0;}
        // matrix[r][c] = colorMatrix[i];
        
        
        if(changefct) matrix[r][c] = changefct(matrix[r][c]);
        // r++;
        c++;
    }
    return matrix;
}
function fuseColor(canvas,color,composite = 'source-atop'){
    let buffer = makeCanvas(canvas.width,canvas.height);
    let ctx = getCtx(buffer);
    ctx.drawImage(canvas,0,0);
    ctx.globalCompositeOperation = composite;
    ctx.fillStyle = color;
    ctx.fillRect(0,0,buffer.width,buffer.height);
    return buffer;
}
const fuseImage = (canvas,canvas2,composite = 'source-atop')=>{
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
const fuseImageReplace = (canvas,canvas2,composite = 'source-atop')=>{
    var colorMatrix = getColorMatrix(canvas);
    let buffer = makeCanvas(canvas.width*canvas2.width,canvas.height * canvas2.height);
    let ctx = getCtx(buffer);
    for(let i = 0 ; i < canvas.height;i++){
        for(let j = 0 ; j < canvas.width;j++){
            if(colorMatrix[i][j]?.length > 0){
                ctx.drawImage(canvas2,
                    i * canvas2.width,
                    j * canvas2.height);
            }
        }
    }
    return buffer;
}
const getDirection = (rotation)=>{
    if(rotation < 0) rotation = Math.abs(rotation);
    rotation = rotation % 7;
    switch(rotation){
        case 0 : return DIRECTION.UP;
        case 1 : return DIRECTION.UPRIGHT;
        case 2 : return DIRECTION.RIGHT;
        case 3 : return DIRECTION.DOWNRIGHT;
        case 4 : return DIRECTION.DOWN;
        case 5 : return DIRECTION.DOWNLEFT;
        case 6 : return DIRECTION.LEFT;
        case 7 : return DIRECTION.UPLEFT;
    }
}
const getEventXY = (e)=>{
    let x = 0, y = 0;
    x = e.offsetX;
    y = e.offsetY;
    return {x:x,y:y};
}
const normalizeXY = (co,config)=>{
    let tile = config.tile;
    co.x = parseInt(co.x / tile) * tile;  
    co.y = parseInt(co.y / tile) * tile;
    return co;
}
const normalizeXYTile = (co,config)=>{
    let tile = config.tile;
    co.x = parseInt(co.x / tile) * tile + config.tile/2;  
    co.y = parseInt(co.y / tile) * tile + config.tile/2;
    return co;
}
const getRandomColor = ()=>{
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color; 
}
const DIRECTION = {
    UP              : 0, //Symbol("UP"),             //Rotation 0
    UPRIGHT         : 1, //Symbol("UPRIGHT"),        //Rotation 1
    RIGHT           : 2, //Symbol("RIGHT"),          //Rotation 2
    DOWNRIGHT       : 3, //Symbol("DOWNRIGHT"),      //Rotation 3
    DOWN            : 4, //Symbol("DOWN"),           //Rotation 4
    DOWNLEFT        : 5, //Symbol("DOWNLEFT"),       //Rotation 5
    LEFT            : 6, //Symbol("LEFT"),           //Rotation 6       
    UPLEFT          : 7, //Symbol("UPLEFT"),         //Rotation 7
}
const cloneCanvas = (canvas) =>{
    if(!canvas) return null;
    let buffer = makeCanvas(canvas.width,canvas.height);
    let ctx = getCtx(buffer);
    ctx.drawImage(canvas,0,0);
    return buffer;
}
const mirror = (canvas,hor = true) =>{
    let buffer = makeCanvas(canvas.width,canvas.height);
    let context = getCtx(buffer);
    context.save();
    if(hor){
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
const getCanvasSkeleton = (canvas,ismatrix)=>{
    var matrix = ismatrix ? canvas : getColorMatrix(canvas);
    const flattenedArray = matrix.flat();
    const uniqueValues = [...new Set(flattenedArray)];
    const uniqueMatrices = {};
    for (const value of uniqueValues) {
        uniqueMatrices[value] = [];
        for (let i = 0; i < matrix.length; i++) {
            uniqueMatrices[value].push([]);
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === value) {
                    uniqueMatrices[value][i][j] = '#000000';
                } else {
                    uniqueMatrices[value][i][j] = null; // or any other placeholder
                }
            }
        }
    }
    delete(uniqueMatrices[null]);
    return uniqueMatrices;
}
const combineSprites = (sprites)=>{
    var canvas = makeCanvas(sprites[0].width,sprites[0].height);
    var ctx = getCtx(canvas);
    for(let i in sprites){
        ctx.drawImage(sprites[i],0,0);
    }
    return canvas;
}
function getGrid(canvas1,canvas2){
    let buffer = makeCanvas(canvas1.width + canvas2.width,canvas1.height + canvas2.height);
    let ctx = getCtx(buffer);
    ctx.drawImage(canvas1,0,0);
    ctx.drawImage(canvas1,canvas1.width,canvas2.height);
    ctx.drawImage(canvas2,canvas1.width,0);
    ctx.drawImage(canvas2,0,canvas1.height);
    return buffer;
}
function getGridMatt(s1,s2,r,c, compose = 1){
    if(compose > 1){
        s1 = repeatCanvas(s1,compose);
        s2 = repeatCanvas(s2,compose);
    }
    let g = getGrid(s1,s2);
    var canvas = makeCanvas(g.width * c, g.height * r);
    var ctx = getCtx(canvas);
    for(let i = 0 ; i < r; i++){
        for(let j = 0; j < c;j++){
            ctx.drawImage(g,i*g.height,j*g.width);
        }
    }
    return canvas;
}
function repeatCanvas(canvas,r,c=0){
    if(c==0) c=r;
    var buffer = makeCanvas(canvas.width * c, canvas.height*r);
        var ctx = getCtx(buffer);
        for(let i = 0 ; i < r;i++){
            for(let j = 0 ; j < c;j++){
                ctx.drawImage(canvas, j*canvas.width, i*canvas.height);
            }
        }
        return buffer;
}
const getGrind = (s1,s2,w,h)=>{

}
function Lightify(canvas,opacity){
    let buffer = makeCanvas(canvas.width,canvas.height);
    let ctx = getCtx(buffer);
    ctx.globalAlpha = opacity;
    ctx.drawImage(canvas,0,0);
    ctx.globalAlpha = 1;
    return buffer;
}
function concatCanvas(c1,c2){
    var canvas = makeCanvas(c1.width + c2.width,max(c1.height,c2.height));
    var ctx = getCtx(canvas);
    ctx.drawImage(c1,0,0);
    ctx.drawImage(c2,c1.width,0);
    return canvas;
}
function getCustomCanvas4(s1,s2,s3,s4){
    var canvas = makeCanvas(s1.width*2,s1.height*2);
    var ctx = getCtx(canvas);
    ctx.drawImage(s1,0,0);
    ctx.drawImage(s2,s1.width,0);
    ctx.drawImage(s3,0,s1.height);
    ctx.drawImage(s4,s1.width,s1.height);
    return canvas;
}
function centerCanvasOn(img,w,h,bg = false){
    var canvas = makeCanvas(w,h);
    var ctx = getCtx(canvas);
    if(bg) ctx.fillRect(0,0,w,h);
    ctx.drawImage(img, 
        w / 2 - img.width/2 ,
        h / 2 - img.height/2 );
    return canvas;
}
function getNumAsText(n){
    if(n > 1000000000) return parseInt(n/1000000) + 'B';
    if(n > 1000000) return parseInt(n/1000000) + 'M';
    if(n > 1000) return parseInt(n/1000) + 'K';
    return n;
}
function initColorMatrix(x,y,w,h){
    let spritesheet = querySelector('#spriteSheetMain');
    var sprite = crop(spritesheet,x * 8, y * 8,w *8 ,h *8);
    var colorMatrix = getColorMatrix(sprite,(e)=>{
        if(e === "#ffffff") return '';
        return e;
    });
    return colorMatrix;
}
function getColoredTile(color,w=1,h=1,r=1,c=1){
    var canvas = makeCanvas(w * r,h * c);
    var ctx = getCtx(canvas);
    ctx.fillStyle = color;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    return canvas;
}
export {
    getColoredTile,
    initColorMatrix,
    fuseColor,
    concatCanvas,
    getNumAsText,
    centerCanvasOn,
    getCustomCanvas4,
    getGrid,
    repeatCanvas,
    fuseImageReplace,
    Lightify,
    getGridMatt,
    combineSprites,
    getCanvasSkeleton,
    mirror,
    fuseImage,
    getColorMatrix,
    colorsMatrixToSprite,
    crop,
    getDomElements,
    querySelector,
    makeCanvas,
    getDiagonal,
    getColor,
    rotateCanvas,
    rotateCanvasCw,
    getCtx,
    drawOnCanvas,
    loadImage,
    abs,
    min,
    max,
    sign,
    mod,
    clamp,
    percent,
    lerp,
    smoothStep,
    nearestPowerOfTwo,
    isOverlapping,
    wave,
    formatTime,
    rand,
    randInt,
    randSign,
    randInCircle,
    DIRECTION,
    getDirection,
    getEventXY,
    normalizeXY,
    getRandomColor,
    normalizeXYTile,
    cloneCanvas
};