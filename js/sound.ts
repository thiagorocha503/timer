// declare var Swal: any;

class Sound {
    private _wecker: HTMLAudioElement;

    constructor(wecker: HTMLAudioElement) {
        this._wecker = wecker;
    }

    play() {
        this._wecker.currentTime = 0;
        this._wecker.play();
        this._wecker.loop = true;
    }

    stop() {
        this._wecker.pause();
    }


   
}
