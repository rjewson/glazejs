import { Sprite } from "../displaylist/Sprite";
import { Frame } from "../frame/Frame";
import { FrameList } from "../frame/FrameList";

export class Graphics {
    public sprite: Sprite;
    public frameListId: string;
    public initialFrameId: string;
    public frame: Frame;
    public frameList: FrameList;

    constructor(frameListId: string) {
        this.frameListId = frameListId;
        this.initialFrameId = null;
    }

    public setFrame(value: Frame) {
        this.frame = value;
        if (this.sprite != null) {
            this.frame.updateSprite(this.sprite);
        }
    }

    public setFrameId(id: string) {
        this.frame = this.frameList.getFrame(id);
    }
}
