export default class MusicPlayer {
    constructor(notes, tempo = 300,  autostart=true, pitch = true, loop=3) {
        this.notes = notes;
        this.tempo = tempo;
        this.loop = loop;
        this.pitch = pitch;
        this.playing = false;
        this.audioContext = new AudioContext();
        this.originalNotes = this.notes;
        if (autostart) {this.start();}
    }
    getPossibleNotes(){
        return ['A','B','C','D','E'];
    }
    getPossibleNotesPitch(){
        return [1,2,3,4,5,6,7];
    }
    toggle(){
        if(this.playing) this.stop();
        else this.start();
    }
    start() {this.playing = true;this.playNextNote();}
    stop() {this.playing = false;}
	reset(){this.notes = this.originalNotes;}
    getNoteFrequencyByLetter(letter){
        switch(letter){
            case 'A': return 440.00;
            case 'B': return 493.88;
            case 'C': return 261.63;
            case 'D': return 293.66;
            case 'E': return 329.63;
            case 'F': return 349.23;
            case 'G': return 392.00; 
        };
        return 440.00;
    }
    getFrequency(note) {
        var freq = this.getNoteFrequencyByLetter(note[0]);
		return (note.length>1) ? freq * Math.pow(2, note[1] / 12) : freq;
    }
    playNextNote() {
        if (!this.playing) return;
        if (this.notes.length === 0 && this.loop > 0) {
            this.notes = this.originalNotes;
            this.loop--;
        }
        
        if (this.notes.length === 0) return this.stop();
        
        const note = this.notes[0];
        let pitch = 1;

        if (this.pitch) {
            pitch = this.notes[1];
            this.notes = this.notes.slice(2);
        } else {
            this.notes = this.notes.slice(1);
        }

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(this.getFrequency(note), this.audioContext.currentTime);
        oscillator.start();

        // Use exponential ramp for smoother transitions
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(1, this.audioContext.currentTime + 0.02);
        
        setTimeout(() => {
            // Use exponential ramp for smoother transitions when stopping
            gainNode.gain.setValueAtTime(1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.02);

            oscillator.stop(this.audioContext.currentTime + 0.02);
            this.playNextNote();
        }, 60 / this.tempo * 1000);
    }
}
