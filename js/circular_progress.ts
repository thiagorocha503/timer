function leftPad(n: number, lenght: number, pad: string = "0"): string {
    return String(pad.repeat(lenght) + n).slice(lenght * -1);
}
class CircularProgress {
    private circle: HTMLElement;
    private value: HTMLElement;

    constructor(circle: HTMLElement, value: HTMLElement) {
        this.circle = circle;
        this.value = value;
        this.circle.style.display = "none";
    }
    public setTime(hours: number, minutes: number, seconds: number) {
        this.value.innerHTML = `${leftPad(hours, 2)}:${leftPad(
            minutes,
            2
        )}:${leftPad(seconds, 2)}`;
    }
    public setCircle(percent: number, total: number) {
        if (percent > total || percent < 0) {
            return;
        }
        /*
        total -- 360deg
        percent    x
            total * x = percent * 360
            x = (percent * 360)/ total
        */
        const deg = ((percent * 360) / total).toFixed(1);
        console.log(percent, total)
        console.log(deg)
        this.circle.style.background = `conic-gradient(var(--bs-blue) ${deg}deg, grey 0deg)`;
    }

    

    hide() {
        this.circle.style.display = "none";
    }
    show() {
        this.circle.style.display = "block";
    }
}
