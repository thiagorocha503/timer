// declare bootstrap: any =;
// declare var Swal: any;
const DELAY = 50;

class Timer {
    private _control: Control;
    private display: CircularProgress;
    private picker: Picker;
    private interval_id: number = NaN;
    private timeLeft: number = 0;
    private beforeTime: number = 0;
    private sound: Sound;

    constructor(
        control: Control,
        display: CircularProgress,
        picker: Picker,
        sound: Sound
    ) {
        this._control = control;
        this.display = display;
        this.picker = picker;
        this.sound = sound;
        console.log("init");
    }

    get control() {
        return this._control;
    }

    private clock() {
        let now = Date.now();
        let different = now - this.beforeTime;
        if (this.timeLeft - different < 0) {
            clearInterval(this.interval_id);
            this.interval_id = NaN;
            this.timeLeft = 0;
            this.picker.show();
            this.control.start();
            this.display.hide();

            this.sound.play();
            this.timeOut();
            return;
        }
        this.timeLeft -= different;
        this.beforeTime = now;
        this.setTime();
    }
    play() {
        if (this.picker.time == 0) {
            return;
        }
        this.timeLeft = this.picker.time;
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

    public pause() {
        if (!isNaN(this.interval_id)) {
            clearInterval(this.interval_id);
            this.interval_id = NaN;
            this.control.pause();
        }
    }

    public continue() {
        this.control.continue();
        this.beforeTime = Date.now();
        this.interval_id = setInterval(() => {
            this.clock();
        }, DELAY);
    }

    cancel() {
        clearInterval(this.interval_id);
        this.interval_id = NaN;
        this.timeLeft = 0;
        this.setTime();
        this.picker.show();
        this.display.hide();
        this.control.cancel();
    }

    setTime() {
        let hours: number = Math.floor(this.timeLeft / HOURS);
        let minutes: number = Math.floor((this.timeLeft % HOURS) / MINUTES);
        let seconds: number = Math.floor((this.timeLeft % MINUTES) / SECONDS);
        this.display.setTime(hours, minutes, seconds);
        this.display.setCircle( this.timeLeft, this.picker.time)
    }

    timeOut() {
        const modal: bootstrap.Modal = new bootstrap.Modal("#modal", );
        document
            .getElementById("modal")
            ?.addEventListener("hidden.bs.modal", () => {
                this.sound.stop();
            });
        modal.show();
    }
}
