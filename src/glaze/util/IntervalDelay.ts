export class IntervalDelay {
    public current: number;
    public intervalTime: number;
    public intervals: number;

    constructor(intervalTime: number = 0) {
        this.reset(intervalTime);
    }

    public reset(intervalTime: number = 0) {
        this.current = 0;
        this.intervalTime = intervalTime;
        this.intervals = 0;
    }

    public tick(delta: number): boolean {
        this.current += delta;
        if (this.current > this.intervalTime) {
            this.current = 0;
            this.intervals++;
            return true;
        }
        return false;
    }
}
