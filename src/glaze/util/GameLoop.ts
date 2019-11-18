const MIN_DELTA: number = 1000 / 60 + 1e-8;

export class GameLoop {
    public isRunning: boolean;
    public animationStartTimestamp: number;
    public prevAnimationTime: number;
    public delta: number;
    public updateFunc: (dt: number, timestamp: number) => void;
    private rafID: number;

    constructor() {
        this.isRunning = false;
        this.update = this.update.bind(this);
    }

    public update(timestamp: number) {
        this.delta = this.prevAnimationTime == 0 ? MIN_DELTA : timestamp - this.prevAnimationTime;
        this.prevAnimationTime = timestamp;
        if (this.updateFunc != null) {
            this.updateFunc(MIN_DELTA, Math.floor(timestamp));
        }
        this.rafID = window.requestAnimationFrame(this.update);
    }

    public start() {
        if (this.isRunning == true) return;
        this.isRunning = true;
        this.prevAnimationTime = 0;
        this.rafID = window.requestAnimationFrame(this.update);
    }

    public stop() {
        if (this.isRunning == false) return;
        this.isRunning = false;
        window.cancelAnimationFrame(this.rafID);
    }
}
