import Game from "./Engine/Game/Game.js";
import * as gf from './Engine/Utils/gf.js';

const config = {
    container : `.canvas_container`,
    tile:32,
    aspect:1,
    framerate:1/30,
    width : parseInt(window.innerWidth/32)*32,
    height : parseInt(window.innerHeight/32)*32,
    assets:"Assets",
    spritesheet: gf.querySelector('#spriteSheetMain'),
}
class GameZ extends Game{
    constructor(config){
        super(config);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    if(window.game) return;
    window.game = new GameZ(config);
}, false);