export default class Timer {
    constructor(deltatime = 1/60, t, autostart=false) {
        this.at = 0;
        this.lt = null;
        this.dt = deltatime;
        this.t = t;
        if(autostart) this.start();
        this.p = this.s = false;
    }
    fireOnce(){this.queue();this.s = true;}
    up(t){
        if (this.lt) {this.at += (t - this.lt) / 1000 ;
            if (this.at > 1) {this.at = 1;}
            while (this.at > this.dt) {this.t.update(Math.floor(t/1000));this.at -= this.dt;break;}
        }
        this.lt = t;
        if(!this.s){this.queue();}
    }
    togglePause(){this.p = !this.p;}
    queue() {requestAnimationFrame((t) => {this.up(t);})}
    start() {this.s = false;this.queue();}
    stop(){this.s = true;}
}