import { Frame } from "./Frame";
import { Animation } from "../animation/Animation";

export class FrameList {
    public frames: Array<Frame>;
    public framesHash: Map<string, Frame>;

    public animationsHash: Map<string, Animation>;

    constructor() {
        this.frames = new Array();
        this.framesHash = new Map();
        this.animationsHash = new Map<string, Animation>();
    }

    public addFrame(frame: Frame) {
        this.frames.push(frame);
        this.framesHash.set(frame.name, frame);
    }

    public getFrame(id: string) {
        return this.framesHash.get(id);
    }

    public addAnimation(animation: Animation) {
        this.animationsHash.set(animation.name, animation);
    }

    public getAnimation(id: string) {
        return this.animationsHash.get(id);
    }

    get numFrames(): number {
        return frames.length;
    }
}
