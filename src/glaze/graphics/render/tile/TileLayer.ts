import { Vector2 } from "../../../geom/Vector2";
import { BaseTexture } from "../../texture/BaseTexture";

const ByteToFormat = (size) => [null, null, WebGLRenderingContext.LUMINANCE_ALPHA, WebGLRenderingContext.RGB, WebGLRenderingContext.RGBA][size];
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

    public setTextureFromMap(gl: WebGLRenderingContext, data: Uint8Array, width: number, height: number, format: number = 4 ) {
        if (this.tileDataTexture == null) this.tileDataTexture = gl.createTexture();
        gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.tileDataTexture);
        const type = ByteToFormat(format);
        gl.texImage2D(
            WebGLRenderingContext.TEXTURE_2D,
            0,
            type, //WebGLRenderingContext.RGBA,
            width,
            height,
            0,
            type, //WebGLRenderingContext.RGBA,
            WebGLRenderingContext.UNSIGNED_BYTE,
            data,
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
        this.inverseTileDataTextureSize[0] = 1 / width;
        this.inverseTileDataTextureSize[1] = 1 / height;
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
