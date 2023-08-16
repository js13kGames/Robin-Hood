const events = [
    'click',
    'dblclick',
    'mousedown',
    'mouseup',
    'mousemove',
    'mouseover',
    'mouseout',
    'mouseenter',
    'mouseleave',
    'contextmenu',
    'keydown',
    'keyup',
    'keypress',
    'focus',
    'blur',
    'input',
    'change',
    'submit',
    'reset',
    'select',
    'drag',
    'dragstart',
    'dragend',
    'dragenter',
    'dragover',
    'dragleave',
    'drop',
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
    'pointerdown',
    'pointerup',
    'pointermove',
    'pointerover',
    'pointerout',
    'pointerenter',
    'pointerleave',
    'gotpointercapture',
    'lostpointercapture',
    'wheel',
    'resize',
    'scroll',
    'load',
    'unload',
    'beforeunload',
];
export default class EventManager{
    constructor(target){
		this.target = target;
        this.subscribers = [];
        if(!target.addEventListener) return false;
        ['click','keydown','keyup','mousemove'].forEach(eventName => {
            // console.log('event listner for ' + eventName);
            target.addEventListener(eventName,event => {
                this.fireEvent({ 
                    name    : eventName,
                    event   : event
                });
            });
        });
        return true;
    }
    sub(e){
        this.subscribers.push(e);
    }
    clear() {this.subscribers = [];}
	fireEvent(event) {
		var subscribers = this.subscribers;
        // console.log('fire event', subscribers);
		for (var i in subscribers) {
			if(subscribers[i].notify) subscribers[i].notify(event);
		}
	}
}