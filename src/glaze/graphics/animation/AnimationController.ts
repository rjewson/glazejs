import { Animation } from "./Animaton";
import { Frame } from "../frame/Frame";

export class AnimationController {

    public animation:Animation;
    public frameIndex:number;
    public accumulatedTime:number;

    constructor(animation:Animation) {
        this.animation = animation;
        this.frameIndex = 0;
        this.accumulatedTime = 0;
    }

    public update(dt:number):Frame {
        this.accumulatedTime += dt;
        if (this.accumulatedTime>this.animation.msPerFrame) {
            this.frameIndex = ++this.frameIndex % this.animation.length;
            this.accumulatedTime = 0;
        }
        return this.animation.frames[this.frameIndex];
    }

}