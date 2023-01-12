function leftPad(n: number, lenght: number, pad: string = "0"): string {
    return String(pad.repeat(lenght) + n).slice(lenght * -1);
}
class Display {
    private display: HTMLParagraphElement;

    constructor(display: HTMLParagraphElement) {
        this.display = display;
        this.display.style.display = "none";
    }

    public setTime(hours: number, minutes: number, seconds: number) {
        this.display.innerHTML = `${leftPad(hours, 2)}:${leftPad(
            minutes,
            2
        )}:${leftPad(seconds, 2)}`;
    }

    hide() {
        this.display.style.display = "none";
    }
    show() {
        this.display.style.display = "block";
    }
}
