
import MusicPlayer from './Engine/Utils/MusicPlayer.js';
import SpriteEngine from './Engine/Sprites/SpriteEngine.js';
import SpriteMaker from './Engine/Sprites/SpriteMaker.js';
import * as gf from './Engine/Utils/gf.js';
import PixelFont from './Engine/Sprites/PixelFont.js';
import TileSprite from './Engine/Sprites/TileSprite.js';
import MapGenerator from './Engine/Game/MapGenerator.js';
import Font from './Engine/Sprites/Font.js';
import SpriteMap from './Engine/Sprites/SpriteMap.js';


var sMap = new SpriteMap();
var brick = sMap.get('brick');
var steel = sMap.get('steel');
var grass = sMap.get('grass');
var water = sMap.get('water');

var lines = [
    `███JS13K██████████`,
    `ღ♧♂♀♥♡☜☞☎☏⊙◎`,
    `▨♨◐◑↔↕℡™№◈§ξ∮￥`,
    `￡♠♣●•｡๑∞◦◊▣▤▥▦▩▧`,
    `♬♪♩♭∏۩۞юЮㄨ※彡乀∑⌒@▓`,
    `↑↓←→↘↙ω‰Ωжф`,
    `べあぃ┣┓┏┫▄█▌▒『』〖〗`,
    `◢◣◥◤△▲▼☆★〓▽▂︿`,
    `°ิ.ஐஇ*○▫♦©¤®╠═╝■□`,
    `»«¶†εïз±җ۝ั回≡╚Θˇ˙【】`,
    `►◄░√╮╭╯╰ァじ´¯>-[]<▪`,
    `のCfé㊣凸س(‧')ⓛⓞⓥⓔ`,
    `◇◆їIし#ψ⊕☼O♋㊝✿`,
    `✲☃╬❣➸❝❞﹌✎✟➹❀☂∵∴∷`,
    `♟✖☀☁⊹⊱⋛⋋⋌⋚⊰﹎╱╲`,
    `₪✱㋡ஓ❆━╃╄┛┗`,
    `☄☇∈❤♟✏▶^_◕￼ζ⅝⅞❦☺`,
    `☻▀◙♫‿¨–~ҳ̸ҲsՖศДקツ|`
];
var sss = {}
for(var j in lines){
    for(let k = 0 ; k < lines[j].length;k++){
        sss[lines[j].charAt(k)] = sss[lines[j].charAt(k)] ? sss[lines[j].charAt(k)] +1 : 1 ;
    }
}
console.log(JSON.stringify(sss));


document.body.append(brick);

for(let i = 11 ; i < 12;i++){
    for(var j in lines){
        document.body.append(Font.getSpriteForText(lines[j],8*i,'green',brick));
        // document.body.append(Font.getSpriteForText(lines[j],8*i,'green',grass));
        // document.body.append(Font.getSpriteForText(lines[j],8*i,'green',water));
    }
}
console.log(sMap);

// var mg = new MapGenerator(32);

/*
for(var i = 0; i < 10;i++){
    document.body.append(i);
    document.body.append(document.createElement('br'));
}


// var test = MapGenerator.getForestMinimap(32,32);



/*
const spriteNames = Object.keys(TileSprite.TILES);
const sprites = spriteNames.reduce((result, name) => {
    result[name] = TileSprite.getMagnified(name,2);
    return result;
}, {});
for(let i in sprites){document.body.append(sprites[i]);}


/*
var castle = sprites['castle'];
var castleSkeleton = gf.getCanvasSkeleton(castle);
console.log(castleSkeleton);
for(let i in castleSkeleton){
    var skele = castleSkeleton[i];
    var canvas = gf.colorsMatrixToSprite(skele);
    document.body.append(canvas);
    for(let i in sprites){
        var fused = gf.fuseImage(canvas,sprites[i]);
        // document.body.append(fused);
        var combined = gf.combineSprites(castle,fused);
        document.body.append(combined);
    }

    document.body.append(document.createElement('br'));

}

document.body.append(castle);

/*

for(let i in sprites){
    document.body.append(i);
    document.body.append(sprites[i]);
    document.body.append(document.createElement('br'));
}
// document.body.append(document.createElement('hr'));


let img = gf.querySelector('#spriteSheetMain');
// var s = gf.crop(img,0,0,88,32);
var brickSprite = gf.crop(img,88,0,8,8);
// document.body.append(brickSprite);
// document.body.append(s);
// var b64 = SpriteMaker.to64(s);
// PixelFont.B64 = b64;
// console.log(b64);
// console.log(s);

var epf = new PixelFont({
    color:'red',
    size : 4,
    fuseImage : brickSprite
});


// console.log(epf);
document.body.append(document.createElement('hr'));
// document.body.append(epf.canvas);
var helloWorldSprite = epf.getTextSprite('hello world');
// document.body.append(helloWorldSprite);
// document.body.append(gf.mirror(helloWorldSprite));
// document.body.append(gf.mirror(helloWorldSprite,false));

/*

var _se_ = new SpriteEngine();
var ss = _se_.getSpriteObject(s);
console.log(ss);
var k = ss.transformColors({
    "#ffffff":0,
    "#000000":1,
});
console.log(k);
console.log(JSON.stringify(k));
document.body.append(ss.canvas);


/*




var _se_ = new SpriteEngine();


var spritemap = SpriteMaker.getSpriteMap();
document.body.append(spritemap);
var brickSprite = _se_.getSpriteObject(spritemap);
brickSprite.magnify(4);
document.body.append(brickSprite);






var brick1 = SpriteMaker.getSprite('tankR1');
var brickSprite = _se_.getSpriteObject(brick1);


brickSprite.transformColors({
    "#a35f26":"#49270a",
    "#49270a":"#a35f26",
});
// document.body.append(brick1);

for(let i = 0 ; i < 10; i++){
    // document.body.append(`${i}`);
    // document.body.append(gf.rotateCanvasCw(brick1,i));
    // document.body.append(document.createElement('hr'));
}
// for(let i = 0 ; i < angles.length; i++){
//     let deg = angles[i];
//     document.body.append(document.createElement('hr'));
//     document.body.append(deg);
//     document.body.append(gf.rotateCanvas(brick1,deg));
//     // document.body.append(document.createElement('hr'));
// }
// for(let i = 0 ; i < 180; i+= 10){
//     document.body.append(brickSprite.rotate(i));
// }
// document.body.append(brickSprite.magnify(6));
// document.body.append(brickSprite.patternReplicate(20));
// document.body.append(brickSprite.replicateWH(4,3));
// console.log(brickSprite);

const medievalBGM = 'E3E3E3D3E3G3G3E3E3D3E3A3A3G3G3E3E3E3E3D3E3G3G3E3E3D3E3A3A3G3G3E3E3D3E3E3E3D3E3D3D3';
const battleBGM = 'E4E4E4G4G4G4A4A4A4B4B4B4A4A4A4G4G4G4E4E4E4D4D4D4E4E4E4G4G4G4A4A4A4B4B4B4A4A4A4G4G4G4';
const drumPattern = 'E4E4D4E4E4D4E4G4G4A4A4E4E4D4E4E4D4E4G4G4A4A4G4G4E4E4D4E4E4D4E4A4A4';

document.addEventListener('DOMContentLoaded', function () {
    // const musicPlayer = new MusicPlayer(medievalBGM, 120, true, true, 0);
}, false);

document.addEventListener('click', function () {
    // const musicPlayer = new MusicPlayer(medievalBGM, 120, true, true, 0);
    // const musicPlayer2 = new MusicPlayer(battleBGM, 160, true, true, 0);
    const musicPlayer2 = new MusicPlayer(drumPattern, 120, true, true, 0);
}, false);

//*/