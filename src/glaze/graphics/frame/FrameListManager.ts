import { Vector2 } from "../../geom/Vector2";
import { TextureManager } from "../texture/TextureManager";
import { FrameList } from "./FrameList";
import { Frame } from "./Frame";
import { Animation } from "../animation/Animaton";

interface JSONFrames {
    id: string;
    name: string;
    scale: Vector2;
}

interface JSONAnimation {
    frames: Array<number>;
    fps: number;
    looped: boolean;
    flipX: boolean;
    flipY: boolean;
}

interface JSONFrameList {
    frames: Array<JSONFrames>;
    animations: Map<string, JSONAnimation>;
}

interface JSONFrameConfig {
    items: Map<string, JSONFrameList>;
}

export class FrameListManager {
    public textureManager: TextureManager;
    public frameLists: Map<string, FrameList>;

    constructor(textureManager: TextureManager) {
        this.textureManager = textureManager;
        this.frameLists = new Map();
    }

    public getFrameList(id: string) {
        return this.frameLists.get(id);
    }

    public ParseFrameListJSON(frameListConfig: any) {
        if (typeof frameListConfig !== "string") return;

        var frameListConfigData: JSONFrameConfig = JSON.parse(frameListConfig);

        Object.keys(frameListConfigData).forEach(itemName => {
            var frameList = new FrameList();
            this.frameLists.set(itemName, frameList);
            const framelistItem: JSONFrameList = frameListConfigData[itemName];
            if (framelistItem.frames != null) {
                framelistItem.frames.forEach(frame => {
                    frameList.addFrame(new Frame(frame.id, this.textureManager.textures.get(frame.name), frame.scale));
                });
                if (framelistItem.animations != null) {
                    Object.keys(framelistItem.animations).forEach(animationName => {
                        var animation: JSONAnimation = framelistItem.animations[animationName];
                        frameList.addAnimation(
                            new Animation(
                                animationName,
                                animation.frames.map(frameIndex=>frameList.frames[frameIndex]),
                                animation.fps,
                                animation.looped,
                                animation.flipX,
                                animation.flipY,
                            ),
                        );
                    });
                }
            }
        });
    }
}
