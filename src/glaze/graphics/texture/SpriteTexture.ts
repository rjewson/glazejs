import { Rectangle } from "../../geom/Rectangle";
import { Vector2 } from "../../geom/Vector2";
import { BaseTexture } from "./BaseTexture";

export class SpriteTexture {
    public baseTexture: BaseTexture;
    public frame: Rectangle;
    public trim: Vector2;
    public pivot: Vector2;
    public noFrame: boolean;
    public uvs: Float32Array;

    constructor(baseTexture: BaseTexture, frame: Rectangle, pivot: Vector2 = null) {
        this.noFrame = false;
        this.baseTexture = baseTexture;

        if (frame == null) {
            this.noFrame = true;
            this.frame = new Rectangle(0, 0, 1, 1);
        } else {
            this.frame = frame;
        }
        this.trim = new Vector2();
        this.pivot = pivot == null ? new Vector2() : pivot;
        this.uvs = new Float32Array(8);
        this.updateUVS();
    }

    public updateUVS() {
        var tw = this.baseTexture.width;
        var th = this.baseTexture.height;

        this.uvs[0] = this.frame.x / tw;
        this.uvs[1] = this.frame.y / th;

        this.uvs[2] = (this.frame.x + this.frame.width) / tw;
        this.uvs[3] = this.frame.y / th;

        this.uvs[4] = (this.frame.x + this.frame.width) / tw;
        this.uvs[5] = (this.frame.y + this.frame.height) / th;

        this.uvs[6] = this.frame.x / tw;
        this.uvs[7] = (this.frame.y + this.frame.height) / th;
    }
}
