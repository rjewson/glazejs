import { DisplayObjectContainer } from "./DisplayObjectContainer";
import { Vector2 } from "../../geom/Vector2";
import { Texture } from "../texture/Texture";

export class Sprite extends DisplayObjectContainer {
    public anchor: Vector2;
    public texture: Texture;
    public blendEquation: number;
    public blendFuncS: number;
    public blendFuncD: number;

    public transformedVerts: Float32Array;

    constructor() {
        super();
        this.renderable = true;
        this.anchor = new Vector2();
        this.transformedVerts = new Float32Array(8);
        this.blendEquation = WebGLRenderingContext.FUNC_ADD;
        this.blendFuncS = WebGLRenderingContext.SRC_ALPHA;
        this.blendFuncD = WebGLRenderingContext.ONE_MINUS_SRC_ALPHA;
    }

    public calcExtents() {
        const width = this.texture.frame.width;
        const height = this.texture.frame.height;

        const aX = this.anchor.x;
        const aY = this.anchor.y;
        const w0 = width * (1 - aX);
        const w1 = width * -aX;

        const h0 = height * (1 - aY);
        const h1 = height * -aY;

        const a = this.worldTransform[0];
        const b = this.worldTransform[3];
        const c = this.worldTransform[1];
        const d = this.worldTransform[4];
        const tx = this.worldTransform[2];
        const ty = this.worldTransform[5];

        this.transformedVerts[0] = a * w1 + c * h1 + tx;
        this.transformedVerts[1] = d * h1 + b * w1 + ty;

        this.transformedVerts[2] = a * w0 + c * h1 + tx;
        this.transformedVerts[3] = d * h1 + b * w0 + ty;

        this.transformedVerts[4] = a * w0 + c * h0 + tx;
        this.transformedVerts[5] = d * h0 + b * w0 + ty;

        this.transformedVerts[6] = a * w1 + c * h0 + tx;
        this.transformedVerts[7] = d * h0 + b * w1 + ty;

        // for (var i = 0; i < 4; i++) {
        //     this.aabb.addPoint(this.transformedVerts[i * 2], this.transformedVerts[i * 2 + 1]);
        // }
        // this.aabb.addPoint(this.transformedVerts[0], this.transformedVerts[1]);
        // this.aabb.addPoint(this.transformedVerts[2], this.transformedVerts[3]);
        // this.aabb.addPoint(this.transformedVerts[4], this.transformedVerts[5]);
        // this.aabb.addPoint(this.transformedVerts[6], this.transformedVerts[7]);
    }
}
