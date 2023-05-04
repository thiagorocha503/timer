class Control {
    private timer?: Timer;
    private container: HTMLDivElement;
    private _start: HTMLButtonElement;
    private _pause: HTMLButtonElement;
    private _continue: HTMLButtonElement;
    private _cancel: HTMLButtonElement;

    constructor(
        container: HTMLDivElement,
        start: HTMLButtonElement,
        pause: HTMLButtonElement,
        _continue: HTMLButtonElement,
        cancel: HTMLButtonElement
    ) {
        this.container = container;
        this._start = start;
        this._pause = pause;
        this._continue = _continue;
        this._cancel = cancel;

        this._reset();
        this._start.style.display = "block";

        this._start.onclick = () => {
            this.timer?.play();
        };
        this._pause.onclick = () => {
            this.timer?.pause();
        };
        this._cancel.onclick = () => {
            this.timer?.cancel();
        };
        this._continue.onclick = () => {
            this.timer?.continue();
        };
    }

    private _reset() {
        this._start.style.display = "none";
        this._pause.style.display = "none";
        this._continue.style.display = "none";
        this._cancel.style.display = "none";
    }

    start() {
        this._reset();
        this._start.style.display = "block";
    }
    pause() {
        this._reset();
        this._continue.style.display = "block";
        this._cancel.style.display = "block";
    }

    play() {
        this._reset();
        this._pause.style.display = "block";
        this._cancel.style.display = "block";
    }

    continue() {
        this._reset();
        this._pause.style.display = "block";
        this._cancel.style.display = "block";
    }

    cancel() {
        this._reset();
        this._start.style.display = "block";
    }

    setTimer(timer: Timer) {
        this.timer = timer;
    }

}
