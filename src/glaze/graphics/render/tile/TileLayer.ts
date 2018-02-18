import { Vector2 } from "../../../geom/Vector2";
import { BaseTexture } from "../../texture/BaseTexture";
import { TypedArray2D } from "../../../ds/TypedArray2D";

export class TileLayer {
    public scrollScale: Vector2;

    public tileDataTexture: WebGLTexture;
    public inverseTileDataTextureSize: Float32Array;

    public spriteTexture: WebGLTexture;
    public inverseSpriteTextureSize: Float32Array;

    constructor() {
        this.scrollScale = new Vector2(1, 1);
        this.inverseTileDataTextureSize = new Float32Array(2);
        this.inverseSpriteTextureSize = new Float32Array(2);
    }

    public setSpriteTexture(spriteTexture: BaseTexture) {
        this.spriteTexture = spriteTexture.texture;
        this.inverseSpriteTextureSize[0] = 1 / spriteTexture.width;
        this.inverseSpriteTextureSize[1] = 1 / spriteTexture.height;
    }

    public setTextureFromMap(gl: WebGLRenderingContext, data: TypedArray2D) {
        if (this.tileDataTexture == null) this.tileDataTexture = gl.createTexture();
        gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.tileDataTexture);
        gl.texImage2D(
            WebGLRenderingContext.TEXTURE_2D,
            0,
            WebGLRenderingContext.RGBA,
            data.w,
            data.h,
            0,
            WebGLRenderingContext.RGBA,
            WebGLRenderingContext.UNSIGNED_BYTE,
            data.data8,
        );
        gl.texParameteri(
            WebGLRenderingContext.TEXTURE_2D,
            WebGLRenderingContext.TEXTURE_MAG_FILTER,
            WebGLRenderingContext.NEAREST,
        );
        gl.texParameteri(
            WebGLRenderingContext.TEXTURE_2D,
            WebGLRenderingContext.TEXTURE_MIN_FILTER,
            WebGLRenderingContext.NEAREST,
        );
        gl.texParameteri(
            WebGLRenderingContext.TEXTURE_2D,
            WebGLRenderingContext.TEXTURE_WRAP_S,
            WebGLRenderingContext.CLAMP_TO_EDGE,
        );
        gl.texParameteri(
            WebGLRenderingContext.TEXTURE_2D,
            WebGLRenderingContext.TEXTURE_WRAP_T,
            WebGLRenderingContext.CLAMP_TO_EDGE,
        );
        this.inverseTileDataTextureSize[0] = 1 / data.w;
        this.inverseTileDataTextureSize[1] = 1 / data.h;
    }

    public setTexture(gl: WebGLRenderingContext, image: HTMLImageElement, repeat: boolean) {
        if (this.tileDataTexture == null) this.tileDataTexture = gl.createTexture();
        gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.tileDataTexture);
        gl.texImage2D(
            WebGLRenderingContext.TEXTURE_2D,
            0,
            WebGLRenderingContext.RGBA,
            WebGLRenderingContext.RGBA,
            WebGLRenderingContext.UNSIGNED_BYTE,
            image,
        );
        gl.texParameteri(
            WebGLRenderingContext.TEXTURE_2D,
            WebGLRenderingContext.TEXTURE_MAG_FILTER,
            WebGLRenderingContext.NEAREST,
        );
        gl.texParameteri(
            WebGLRenderingContext.TEXTURE_2D,
            WebGLRenderingContext.TEXTURE_MIN_FILTER,
            WebGLRenderingContext.NEAREST,
        );
        if (repeat) {
            gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_WRAP_S,
                WebGLRenderingContext.REPEAT,
            );
            gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_WRAP_T,
                WebGLRenderingContext.REPEAT,
            );
        } else {
            gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_WRAP_S,
                WebGLRenderingContext.CLAMP_TO_EDGE,
            );
            gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_WRAP_T,
                WebGLRenderingContext.CLAMP_TO_EDGE,
            );
        }

        this.inverseTileDataTextureSize[0] = 1 / image.width;
        this.inverseTileDataTextureSize[1] = 1 / image.height;
    }
}
