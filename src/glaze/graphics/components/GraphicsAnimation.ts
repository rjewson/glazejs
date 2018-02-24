import { AnimationController } from "../animation/AnimationController";
import { FrameList } from "../frame/FrameList";

export class GraphicsAnimation {
    public frameListId: string;
    public animationId: string;
    public dirty:boolean;

    public animationController: AnimationController;
    public frameList:FrameList;

    constructor(frameListId: string, animationId: string) {
        this.frameListId = frameListId;
        this.play(animationId);
    }

    public play(animationId: string) {
        if (this.animationId === animationId) return;
        this.animationId = animationId;
        this.dirty = true;
    }

}
