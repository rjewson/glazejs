import { AnimationController } from "../animation/AnimationController";
import { FrameList } from "../frame/FrameList";

export class GraphicsAnimation {
    public frameListId: string;
    public animationId: string;

    public animationController: AnimationController;
    public frameList:FrameList;

    constructor(frameListId: string, animationId: string) {
        this.frameListId = frameListId;
        this.animationId = animationId;
    }
}
