import { Sprite } from "../displaylist/Sprite";
import { Frame } from "../frame/Frame";
import { FrameList } from "../frame/FrameList";

export class Graphics {
    public sprite: Sprite;
    public frameListId: string;
    public initialFrameId: string;
    public frame: Frame;
    public frameList: FrameList;

    constructor(frameListId: string, initialFrameId:string=null) {
        this.frameListId = frameListId;
        this.initialFrameId = initialFrameId;
    }

    public setFrame(value: Frame) {
        this.frame = value;
        if (this.sprite != null) {
            this.frame.updateSprite(this.sprite);
        }
    }

    public setFrameId(id: string) {
        // this.frame = this.frameList.getFrame(id);
        this.setFrame(this.frameList.getFrame(id));
    }
}
