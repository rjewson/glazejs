import { AnimationController } from "./AnimationController";
import { Randomnumber } from "../../util/Random";

export class Animation {
    private x_frameRate: number;
    private x_curFrame: number = 0;
    private x_numFrames: number;
    public delay: number = 0;
    public finished: boolean = true;
    public paused: boolean = true;
    public looped: boolean = true;
    public reversed: boolean = false;

    public flipX: boolean = false;
    public flipY: boolean = false;
    private _frames: Array<number>;
    private _frameTimer: number = 0;

    public parent: AnimationController;
    public name: string;
    private x_curIndex: number = 0;

    constructor(
        Parent: AnimationController,
        Name: string,
        Frames: Array<number>,
        FrameRate: number = 0,
        Looped: boolean = true,
        FlipX: boolean = false,
        FlipY: boolean = false,
    ) {
        this.parent = Parent;
        this.name = Name;
        this.frameRate = FrameRate;
        this._frames = Frames;
        this.looped = Looped;
        this.flipX = FlipX;
        this.flipY = FlipY;
    }

    public play(Force: boolean = false, Reversed: boolean = false, Frame: number = 0): void {
        if (!Force && !this.finished && this.reversed == Reversed) {
            this.paused = false;
            this.finished = false;
            return;
        }

        this.reversed = Reversed;
        this.paused = false;
        this._frameTimer = 0;

        var numFramesMinusOne: number = this.numFrames - 1;

        if (Frame >= 0) {
            // bound frame value
            Frame = Frame > numFramesMinusOne ? numFramesMinusOne : Frame;
            // "reverse" frame value
            Frame = this.reversed ? numFramesMinusOne - Frame : Frame;
        }

        if (
            this.delay <= 0 || // non-positive fps
            (Frame > numFramesMinusOne && !this.reversed) || // normal animation
            (Frame < 0 && this.reversed)
        ) {
            // reversed animation
            this.finished = true;
        } else {
            this.finished = false;
        }

        if (Frame < 0) {
            this.curFrame = Randomnumber(0, numFramesMinusOne);
        } else {
            this.curFrame = Frame;
        }

        if (this.finished) this.parent.fireFinishCallback(name);
    }

    public restart(): void {
        this.play(true, this.reversed);
    }

    public stop(): void {
        this.finished = true;
        this.paused = true;
    }

    public reset(): void {
        this.stop();
        this.curFrame = this.reversed ? this.numFrames - 1 : 0;
    }

    public finish(): void {
        this.stop();
        this.curFrame = this.reversed ? 0 : this.numFrames - 1;
    }

    public pause(): void {
        this.paused = true;
    }

    public resume(): void {
        this.paused = false;
    }

    public reverse(): void {
        this.reversed = !this.reversed;
        if (this.finished) this.play(false, this.reversed);
    }

    public update(elapsed: number): void {
        var lastFrame = this.curFrame;
        if (this.delay > 0 && !this.finished && !this.paused) {
            this._frameTimer += elapsed;
            while (this._frameTimer > this.delay) {
                this._frameTimer -= this.delay;

                if (this.looped) {
                    var numFramesMinusOne: number = this.numFrames - 1;
                    var tempFrame: number = this.reversed ? numFramesMinusOne - this.curFrame : this.curFrame;

                    if (tempFrame == numFramesMinusOne) {
                        this.curFrame = this.reversed ? numFramesMinusOne : 0;
                    } else {
                        this.curFrame = this.reversed ? this.curFrame - 1 : this.curFrame + 1;
                    }
                } else {
                    this.curFrame = this.reversed ? this.curFrame - 1 : this.curFrame + 1;
                }
            }
        }
        // return curFrame!=lastFrame;
    }

    public get frameRate(): number {
        return this.x_frameRate;
    }

    public set frameRate(value: number) {
        this.delay = 0;
        this.x_frameRate = value;
        if (value > 0) {
            this.delay = 1.0 / value;
        }
    }

    public get curIndex(): number {
        return this.x_curIndex;
    }

    public set curIndex(Value: number) {
        this.x_curIndex = Value;

        if (this.parent != null && this.parent._curAnim == this) {
            this.parent.frameIndex = Value;
        }
    }

    public get curFrame(): number {
        return this.x_curFrame;
    }

    public set curFrame(Frame: number) {
        var numFramesMinusOne: number = this.numFrames - 1;
        // "reverse" frame value (if there is such need)
        var tempFrame: number = this.reversed ? numFramesMinusOne - Frame : Frame;

        if (tempFrame >= 0) {
            if (!this.looped && tempFrame > numFramesMinusOne) {
                this.finished = true;
                this.x_curFrame = this.reversed ? 0 : numFramesMinusOne;
            } else {
                this.x_curFrame = Frame;
            }
        } else {
            this.x_curFrame = Randomnumber(0, numFramesMinusOne);
        }

        this.curIndex = this._frames[this.x_curFrame];

        if (this.finished && parent != null) this.parent.fireFinishCallback(name);
    }

    private get numFrames(): number {
        return this._frames.length;
    }

    public clone(Parent: AnimationController): Animation {
        return new Animation(Parent, name, this._frames, this.frameRate, this.looped, this.flipX, this.flipY);
    }
}
