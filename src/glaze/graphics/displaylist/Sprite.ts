import { DisplayObjectContainer } from "./DisplayObjectContainer";
import { Vector2 } from "../../geom/Vector2";
import { Texture } from "../texture/Texture";

export class Sprite extends DisplayObjectContainer {
   
    public anchor: Vector2;
    public texture: Texture;
    public blendMode: number;

    public transformedVerts: Float32Array;

    constructor() {
        super();
        this.renderable = true;
        this.anchor = new Vector2();
        this.transformedVerts = new Float32Array(8);
    }

    public calcExtents() {
        var width = this.texture.frame.width;
        var height = this.texture.frame.height;

        var aX = this.anchor.x;
        var aY = this.anchor.y;
        var w0 = width * (1 - aX);
        var w1 = width * -aX;

        var h0 = height * (1 - aY);
        var h1 = height * -aY;

        var a = this.worldTransform[0];
        var b = this.worldTransform[3];
        var c = this.worldTransform[1];
        var d = this.worldTransform[4];
        var tx = this.worldTransform[2];
        var ty = this.worldTransform[5];

        this.transformedVerts[0] = a * w1 + c * h1 + tx;
        this.transformedVerts[1] = d * h1 + b * w1 + ty;

        this.transformedVerts[2] = a * w0 + c * h1 + tx;
        this.transformedVerts[3] = d * h1 + b * w0 + ty;

        this.transformedVerts[4] = a * w0 + c * h0 + tx;
        this.transformedVerts[5] = d * h0 + b * w0 + ty;

        this.transformedVerts[6] = a * w1 + c * h0 + tx;
        this.transformedVerts[7] = d * h0 + b * w1 + ty;

        for (var i = 0; i < 4; i++) {
            this.aabb.addPoint(this.transformedVerts[i * 2], this.transformedVerts[i * 2 + 1]);
        }
    }
}
