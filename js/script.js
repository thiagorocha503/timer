"use strict";
class Control {
    constructor(container, start, pause, _continue, cancel) {
        this.container = container;
        this._start = start;
        this._pause = pause;
        this._continue = _continue;
        this._cancel = cancel;
        this._reset();
        this._start.style.display = "block";
        this._start.onclick = () => {
            var _a;
            console.log("play");
            (_a = this.timer) === null || _a === void 0 ? void 0 : _a.play();
        };
        this._pause.onclick = () => {
            var _a;
            (_a = this.timer) === null || _a === void 0 ? void 0 : _a.pause();
        };
        this._cancel.onclick = () => {
            var _a;
            (_a = this.timer) === null || _a === void 0 ? void 0 : _a.cancel();
        };
        this._continue.onclick = () => {
            var _a;
            (_a = this.timer) === null || _a === void 0 ? void 0 : _a.continue();
        };
    }
    _reset() {
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
    setTimer(timer) {
        this.timer = timer;
    }
}
function leftPad(n, lenght, pad = "0") {
    return String(pad.repeat(lenght) + n).slice(lenght * -1);
}
class Display {
    constructor(display) {
        this.display = display;
        this.display.style.display = "none";
    }
    setTime(hours, minutes, seconds) {
        this.display.innerHTML = `${leftPad(hours, 2)}:${leftPad(minutes, 2)}:${leftPad(seconds, 2)}`;
    }
    hide() {
        this.display.style.display = "none";
    }
    show() {
        this.display.style.display = "block";
    }
}
class Picker {
    constructor(container, hours, minutes, seconds) {
        this.container = container;
        this._hours = hours;
        this._minutes = minutes;
        this._seconds = seconds;
    }
    hide() {
        this.container.style.display = "none";
    }
    show() {
        this.container.style.display = "block";
    }
    get time() {
        let h = this._hours.value == "" ? 0 : parseInt(this._hours.value);
        let m = this._minutes.value == "" ? 0 : parseInt(this._minutes.value);
        let s = this._seconds.value == "" ? 0 : parseInt(this._seconds.value);
        return h * HOURS + m * MINUTES + s * SECONDS;
    }
}
const SECONDS = 1000;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;
window.addEventListener("load", () => {
    const control = new Control(document.getElementById("buttons"), document.getElementById("btn-start"), document.getElementById("btn-pause"), document.getElementById("btn-continue"), document.getElementById("btn-cancel"));
    const picker = new Picker(document.getElementById("picker-container"), document.getElementById("picker-hours"), document.getElementById("picker-minutes"), document.getElementById("picker-seconds"));
    const display = new Display(document.getElementById("timer"));
    const sound = new Sound(document.getElementById("wecker"));
    const timer = new Timer(control, display, picker, sound);
    control.setTimer(timer);
});
// declare var Swal: any;
class Sound {
    constructor(wecker) {
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
// declare bootstrap: any =;
// declare var Swal: any;
const DELAY = 500;
class Timer {
    constructor(control, display, picker, sound) {
        this.interval_id = NaN;
        this.time = 0;
        this.beforeTime = 0;
        this._control = control;
        this.display = display;
        this.picker = picker;
        this.sound = sound;
        console.log("init");
    }
    get control() {
        return this._control;
    }
    clock() {
        let now = Date.now();
        let different = now - this.beforeTime;
        if (this.time - different < 0) {
            clearInterval(this.interval_id);
            this.interval_id = NaN;
            this.time = 0;
            this.picker.show();
            this.control.start();
            this.display.hide();
            this.sound.play();
            this.timeOut();
            return;
        }
        this.time -= different;
        this.beforeTime = now;
        this.setTime();
    }
    play() {
        if (this.picker.time == 0) {
            return;
        }
        this.time = this.picker.time;
        if (isNaN(this.interval_id)) {
            this.picker.hide();
            this.setTime();
            this.display.show();
            this.beforeTime = Date.now();
            this.control.play();
            this.interval_id = setInterval(() => {
                this.clock();
            }, DELAY);
        }
    }
    pause() {
        if (!isNaN(this.interval_id)) {
            clearInterval(this.interval_id);
            this.interval_id = NaN;
            this.control.pause();
        }
    }
    continue() {
        this.control.continue();
        this.beforeTime = Date.now();
        this.interval_id = setInterval(() => {
            this.clock();
        }, DELAY);
    }
    cancel() {
        clearInterval(this.interval_id);
        this.interval_id = NaN;
        this.time = 0;
        this.setTime();
        this.picker.show();
        this.display.hide();
        this.control.cancel();
    }
    setTime() {
        let hours = Math.floor(this.time / HOURS);
        let minutes = Math.floor((this.time % HOURS) / MINUTES);
        let seconds = Math.floor((this.time % MINUTES) / SECONDS);
        this.display.setTime(hours, minutes, seconds);
    }
    timeOut() {
        var _a;
        const modal = new bootstrap.Modal("#modal");
        (_a = document
            .getElementById("modal")) === null || _a === void 0 ? void 0 : _a.addEventListener("hidden.bs.modal", () => {
            this.sound.stop();
        });
        modal.show();
    }
}
