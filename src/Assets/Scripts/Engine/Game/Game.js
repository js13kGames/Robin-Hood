import Timer from "../Utils/Timer.js";
import LoadingScene from "../Scenes/LoadingScene.js";
import EventManager from '../Event/EventManager.js';
import * as gf from '../Utils/gf.js';
export default class Game{
    constructor(config){
        this.config = config;
        this.container = document.querySelector(config.container);
        this.canvas = Object.assign(document.createElement('canvas'), {
            width:config.width,
            height:config.height,
            className: 'gamecanvas'});
        this.container.appendChild(this.canvas);
        this.eventManager = new EventManager(document);
        this.toLoadingScene();
        this.Timer = new Timer(config.framerate, this, true);
        this.enablePhoneControls();
    }
    update(time) {
        if(this.Timer.p == false){
            this.time = time;
            this.framesPassedTillNow++;
            this.timeHMS = this.timeInHourFormat(time);
            if(this.scene){
                try{
                    this.scene.update(time);
                    this.scene.draw(this.canvas.getContext('2d'));
                }
                catch(e){
                    console.log(e);
                    //alert('game crashed');
                    this.Timer.stop();
                }
            }
            else{
                this.Timer.stop();
            }
        }
    }
    timeInHourFormat(seconds){
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        minutes = Math.floor(minutes % 60);
        seconds = Math.floor(seconds % 60);
        return `${hours < 10 ? '0' : ''}${hours}:`+
        `${minutes < 10 ? '0' : ''}${minutes}:`+
        `${seconds < 10 ? '0' : ''}${seconds}`;
    }
    toLoadingScene() {
        this.scene = new LoadingScene(this);
        this.eventManager.sub(this.scene);
	}
    toScene(scene){
        this.scene = scene;
        this.eventManager.clear();
        this.eventManager.sub(this.scene);
    }
    enablePhoneControls(){
        var table = Object.assign(document.createElement('div'), {className: 'controls_container'});
        table.innerHTML = `<table><tr><td>q</td><td>w</td><td>e</td><td class="padding"></td><td>space</td> </tr><tr><td>a</td><td>s</td><td>d</td><td class="padding"></td> <td>e</td> </tr></table>`;
        this.container.appendChild(table);
        var controltds = gf.getDomElements('.controls_container td');
        for(let i = 0 ; i < controltds.length;i++){
            controltds[i].addEventListener('click',event => {
                this.eventManager.fireEvent({ 
                    name    : 'control',
                    event   : {key:controltds[i].innerText}
                });
            });
        }
    }
}