const SECONDS = 1000;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;
window.addEventListener("load", () => {
    const control = new Control(
        document.getElementById("buttons") as HTMLDivElement,
        document.getElementById("btn-start") as HTMLButtonElement,
        document.getElementById("btn-pause") as HTMLButtonElement,
        document.getElementById("btn-continue") as HTMLButtonElement,
        document.getElementById("btn-cancel") as HTMLButtonElement
    );
    const picker = new Picker(
        document.getElementById("picker-container") as HTMLDivElement,
        document.getElementById("picker-hours") as HTMLInputElement,
        document.getElementById("picker-minutes") as HTMLInputElement,
        document.getElementById("picker-seconds") as HTMLInputElement
    );
    const circularProgress = new CircularProgress(
        document.getElementById("circle") as HTMLElement,
        document.getElementById("circle-value") as HTMLElement
      
    );
    const sound = new Sound(
        document.getElementById("wecker") as HTMLAudioElement
    );
    const timer = new Timer(control, circularProgress, picker, sound);
    control.setTimer(timer)
});
