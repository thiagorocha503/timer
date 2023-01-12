class Picker {
    private container: HTMLDivElement;
    private _hours: HTMLInputElement;
    private _minutes: HTMLInputElement;
    private _seconds: HTMLInputElement;

    constructor(
        container: HTMLDivElement,
        hours: HTMLInputElement,
        minutes: HTMLInputElement,
        seconds: HTMLInputElement
    ) {
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

    get time(): number {
        let h: number =
            this._hours.value == "" ? 0 : parseInt(this._hours.value);
        let m: number =
            this._minutes.value == "" ? 0 : parseInt(this._minutes.value);
        let s: number =
            this._seconds.value == "" ? 0 : parseInt(this._seconds.value);
        return h * HOURS + m * MINUTES  + s * SECONDS;
    }
}
