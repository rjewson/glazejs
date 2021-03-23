import { TypedArray2D } from "../../../ds/TypedArray2D";
import { Vector2 } from "../../../geom/Vector2";
import { BaseTexture } from "../../texture/BaseTexture";

const ByteToFormat = (size) => [null, null, WebGLRenderingContext.LUMINANCE_ALPHA, WebGLRenderingContext.RGB, WebGLRenderingContext.RGBA][size];
export class TileLayer {
    public gl: WebGLRenderingContext;

    public scrollScale: Vector2;

    public tileDataTexture: WebGLTexture;
    public inverseTileDataTextureSize: Float32Array;

    public spriteTexture: WebGLTexture;
    public inverseSpriteTextureSize: Float32Array;

    private writebuffer2: TypedArray2D;

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
        this.scrollScale = new Vector2(1, 1);
        this.inverseTileDataTextureSize = new Float32Array(2);
        this.inverseSpriteTextureSize = new Float32Array(2);
        this.writebuffer2 = new TypedArray2D(3, 3); //Max 3x3 tileset changes
    }

    public setSpriteTexture(spriteTexture: BaseTexture) {
        this.spriteTexture = spriteTexture.texture;
        this.inverseSpriteTextureSize[0] = 1 / spriteTexture.width;
        this.inverseSpriteTextureSize[1] = 1 / spriteTexture.height;
    }

    public setTextureFromMap(data: Uint8Array, width: number, height: number, format: number = 4 ) {
        if (this.tileDataTexture == null) this.tileDataTexture = this.gl.createTexture();
        
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.tileDataTexture);
        const type = ByteToFormat(format);
        this.gl.texImage2D(
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
        this.gl.texParameteri(
            WebGLRenderingContext.TEXTURE_2D,
            WebGLRenderingContext.TEXTURE_MAG_FILTER,
            WebGLRenderingContext.NEAREST,
        );
        this.gl.texParameteri(
            WebGLRenderingContext.TEXTURE_2D,
            WebGLRenderingContext.TEXTURE_MIN_FILTER,
            WebGLRenderingContext.NEAREST,
        );
        this.gl.texParameteri(
            WebGLRenderingContext.TEXTURE_2D,
            WebGLRenderingContext.TEXTURE_WRAP_S,
            WebGLRenderingContext.CLAMP_TO_EDGE,
        );
        this.gl.texParameteri(
            WebGLRenderingContext.TEXTURE_2D,
            WebGLRenderingContext.TEXTURE_WRAP_T,
            WebGLRenderingContext.CLAMP_TO_EDGE,
        );
        this.inverseTileDataTextureSize[0] = 1 / width;
        this.inverseTileDataTextureSize[1] = 1 / height;
    }

    public setTexture(image: HTMLImageElement, repeat: boolean) {
        if (this.tileDataTexture == null) this.tileDataTexture = this.gl.createTexture();
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.tileDataTexture);
        this.gl.texImage2D(
            WebGLRenderingContext.TEXTURE_2D,
            0,
            WebGLRenderingContext.RGBA,
            WebGLRenderingContext.RGBA,
            WebGLRenderingContext.UNSIGNED_BYTE,
            image,
        );
        this.gl.texParameteri(
            WebGLRenderingContext.TEXTURE_2D,
            WebGLRenderingContext.TEXTURE_MAG_FILTER,
            WebGLRenderingContext.NEAREST,
        );
        this.gl.texParameteri(
            WebGLRenderingContext.TEXTURE_2D,
            WebGLRenderingContext.TEXTURE_MIN_FILTER,
            WebGLRenderingContext.NEAREST,
        );
        if (repeat) {
            this.gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_WRAP_S,
                WebGLRenderingContext.REPEAT,
            );
            this.gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_WRAP_T,
                WebGLRenderingContext.REPEAT,
            );
        } else {
            this.gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_WRAP_S,
                WebGLRenderingContext.CLAMP_TO_EDGE,
            );
            this.gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_WRAP_T,
                WebGLRenderingContext.CLAMP_TO_EDGE,
            );
        }

        this.inverseTileDataTextureSize[0] = 1 / image.width;
        this.inverseTileDataTextureSize[1] = 1 / image.height;
    }

    public updateMap(x: number, y: number, data: Array<number>) {

        var startX = data[0];
        var startY = data[1];
        var width = data[2];
        var height = data[3];
        var centerX = data[4];
        var centerY = data[5];
        //var superY = Math.floor(data[6] / 8);
        //var superX = data[6] % 8;
        var superSheet = data[6];
        this.writebuffer2.h = height;
        this.writebuffer2.w = width;

        for (var ypos = 0; ypos < height; ypos++) {
            for (var xpos = 0; xpos < width; xpos++) {
                var _x = startX + xpos;
                var _y = startY + ypos;
                // var value = (superY << 24) | (superX << 16) | (_y << 8) | _x;
                var value = (0 << 24) | (superSheet << 16) | (_y << 8) | _x;
                this.writebuffer2.set(xpos, ypos, value);
            }
        }

        var writeLayer = this.tileDataTexture;
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, writeLayer);
        this.gl.texSubImage2D(
            WebGLRenderingContext.TEXTURE_2D,
            0,
            x - centerX,
            y - centerY,
            width,
            height,
            WebGLRenderingContext.RGBA,
            WebGLRenderingContext.UNSIGNED_BYTE,
            this.writebuffer2.data8,
        );
    }

}
