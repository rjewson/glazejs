import { FrameList } from "../frame/FrameList";
import { Animation } from "./Animation";
import { Randomnumber } from "../../util/Random";
import { Frame } from "../frame/Frame";
import { Sprite } from "../displaylist/Sprite";

export class AnimationController {
    public x_frameIndex: number = -1;
    public x_frameName: string;
    public x_paused: boolean;
    public callback: (s: string, i: number, ii: number) => void;
    public finishCallback: (s: string) => void;
    private _frames: FrameList;
    public _curAnim: Animation; // FIXME because of parent
    private _animations: Map<string, Animation>;

    constructor(Frames: FrameList) {
        this._frames = Frames;
        this._animations = new Map<string, Animation>();
    }

    public update(elapsed: number): void {
        if (this._curAnim != null) {
            this._curAnim.update(elapsed);
        }
    }

    public add(
        Name: string,
        Frames: Array<number>,
        FrameRate: number = 30,
        Looped: boolean = true,
        FlipX: boolean = false,
        FlipY: boolean = false,
    ): void {
        // Check this._animations frames
        var framesToAdd: Array<number> = Frames;
        var numFrames: number = framesToAdd.length - 1;
        var i: number = numFrames;
        while (i >= 0) {
            if (framesToAdd[i] >= this.frames) {
                // Splicing original Frames array could lead to unexpected results
                // So we are cloning it (only once) and will use its copy
                if (framesToAdd == Frames) {
                    framesToAdd = [...Frames];
                }

                framesToAdd.splice(i, 1);
            }
            i--;
        }

        if (framesToAdd.length > 0) {
            var anim = new Animation(this, Name, framesToAdd, FrameRate, Looped, FlipX, FlipY);
            this._animations.set(Name, anim);
        }
    }

    public addAnimation(anim: Animation) {
        this._animations.set(anim.name, anim);
    }

    public remove(Name: string): void {
        var anim: Animation = this._animations.get(Name);
        if (anim != null) {
            this._animations.delete(Name);
        }
    }

    public play(AnimName: string, Force: boolean = false, Reversed: boolean = false, Frame: number = 0): void {
        if (AnimName == null) {
            if (this._curAnim != null) {
                this._curAnim.stop();
            }
            this._curAnim = null;
        }

        if (AnimName == null || this._animations.get(AnimName) == null) {
            return;
        }

        var oldFlipX: boolean = false;
        var oldFlipY: boolean = false;

        if (this._curAnim != null && AnimName != this._curAnim.name) {
            oldFlipX = this._curAnim.flipX;
            oldFlipY = this._curAnim.flipY;
            this._curAnim.stop();
        }
        this._curAnim = this._animations.get(AnimName);
        this._curAnim.play(Force, Reversed, Frame);

        if (oldFlipX != this._curAnim.flipX || oldFlipY != this._curAnim.flipY) {
            //_sprite.dirty = true;
        }
    }

    public reset(): void {
        if (this._curAnim != null) {
            this._curAnim.reset();
        }
    }

    public finish(): void {
        if (this._curAnim != null) {
            this._curAnim.finish();
        }
    }

    public stop(): void {
        if (this._curAnim != null) {
            this._curAnim.stop();
        }
    }

    public pause(): void {
        if (this._curAnim != null) {
            this._curAnim.pause();
        }
    }

    public resume(): void {
        if (this._curAnim != null) {
            this._curAnim.resume();
        }
    }

    public reverse(): void {
        if (this._curAnim != null) {
            this._curAnim.reverse();
        }
    }

    public getByName(Name: string): Animation {
        return this._animations.get(Name);
    }

    public randomFrame(): void {
        if (this._curAnim != null) {
            this._curAnim.stop();
            this._curAnim = null;
        }
        this.frameIndex = Randomnumber(0, this.frames - 1);
    }

    public fireCallback(): void {
        if (this.callback != null) {
            var name: string = this._curAnim != null ? this._curAnim.name : null;
            var number: number = this._curAnim != null ? this._curAnim.curFrame : this.frameIndex;
            this.callback(name, number, this.frameIndex);
        }
    }

    public fireFinishCallback(name: string = null): void {
        if (this.finishCallback != null) {
            this.finishCallback(name);
        }
    }

    public get frameIndex() {
        return this.x_frameIndex;
    }

    public set frameIndex(Frame: number) {
        if (this._frames != null) {
            Frame = Frame % this.frames;
            //_sprite.frame = _frames.frames[Frame];
            this.x_frameIndex = Frame;
            this.fireCallback();
        }
    }

    private get frameName(): string {
        return "todo"; //_sprite.frame.name;
    }

    private set frameName(Value: string) {
        if (this._frames != null && this._frames.framesHash.has(Value)) {
            if (this._curAnim != null) {
                this._curAnim.stop();
                this._curAnim = null;
            }

            var frame = this._frames.framesHash.get(Value);
            if (frame != null) {
                this.frameIndex = this.getFrameIndex(frame);
            }
        }

        this.x_frameName = Value;
    }

    private get name(): string {
        var animName: string = null;
        if (this._curAnim != null) {
            animName = this._curAnim.name;
        }
        return animName;
    }

    private set_name(AnimName: string) {
        this.play(AnimName);
    }

    public get curAnim(): Animation {
        return this._curAnim;
    }

    public set curAnim(Anim: Animation) {
        if (Anim != this._curAnim) {
            if (this._curAnim != null) {
                this._curAnim.stop();
            }

            if (Anim != null) {
                Anim.play();
            }
        }
        this._curAnim = Anim;
    }

    private get paused(): boolean {
        if (this._curAnim != null) {
            return this._curAnim.paused;
        }
        return false;
    }

    private set paused(Value: boolean) {
        if (this._curAnim != null) {
            if (Value) {
                this._curAnim.pause();
            } else {
                this._curAnim.resume();
            }
        }
    }

    private get finished(): boolean {
        if (this._curAnim != null) {
            return this._curAnim.finished;
        }
        return true;
    }

    private set finished(Value: boolean) {
        if (Value == true && this._curAnim != null) {
            this._curAnim.finish();
        }
    }

    private get frames(): number {
        return this._frames.numFrames;
    }

    public getFrameIndex(Frame: Frame): number {
        return this._frames.frames.indexOf(Frame);
    }

    public getFrame(): Frame {
        return this._frames.frames[this.frameIndex];
    }

    public updateSprite(sprite: Sprite) {
        var frame = this.getFrame();

        sprite.texture = frame.texture;
        sprite.pivot.x = sprite.texture.frame.width * sprite.texture.pivot.x;
        sprite.pivot.y = (sprite.texture.frame.height + 2) * sprite.texture.pivot.y;
        sprite.scale.x = frame.scale.x; // * _curAnim.flipX ? -1:1;
        if (this.curAnim.flipX) sprite.scale.x *= -1;
        sprite.scale.y = frame.scale.y; //* _curAnim.flipY ? -1:1;
        if (this.curAnim.flipY) sprite.scale.y *= -1;
    }
}
