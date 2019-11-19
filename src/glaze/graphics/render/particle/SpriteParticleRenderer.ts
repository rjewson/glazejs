import vertexShader from "./shaders/SpriteParticle.vert.glsl";
import fragmentShader from "./shaders/SpriteParticle.frag.glsl";
import { Camera } from "../../displaylist/Camera";
import { Vector2 } from "../../../geom/Vector2";
import { ShaderWrapper } from "../util/ShaderWrapper";
import { Stage } from "../../displaylist/Stage";
import { Texture } from "../../texture/Texture";
import { AABB2 } from "../../../geom/AABB2";
import { IRenderer } from "../RenderEngine";
import { CompileProgram } from "../util/WebGLShaderUtil";

export class SpriteParticleRenderer implements IRenderer {
    public gl: WebGLRenderingContext;

    public projection: Vector2;

    public pointSpriteShader: ShaderWrapper;

    public dataBuffer: WebGLBuffer;
    public data: Float32Array;
    public data8: Uint8ClampedArray;

    public stage: Stage;
    public camera: Camera;
    public texture: WebGLTexture;

    public tileSize: number;
    public texTilesWide: number;
    public texTilesHigh: number;
    public invTexTilesWide: number;
    public invTexTilesHigh: number;

    public indexRun: number;
    public maxSprites: number;

    private arrayBuffer: ArrayBuffer;

    public constructor(size: number) {
        this.maxSprites = size;
    }

    public Init(gl: WebGLRenderingContext, camera: Camera) {
        this.gl = gl;
        this.camera = camera;
        this.projection = new Vector2();
        this.pointSpriteShader = new ShaderWrapper(this.gl, CompileProgram(gl, vertexShader, fragmentShader));
        this.dataBuffer = gl.createBuffer();
        this.arrayBuffer = new ArrayBuffer(20 * 4 * this.maxSprites);
        this.data = new Float32Array(this.arrayBuffer);
        this.data8 = new Uint8ClampedArray(this.arrayBuffer);
        gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, this.data, WebGLRenderingContext.DYNAMIC_DRAW);
        this.ResetBatch();
    }

    public SetSpriteSheet(texture: WebGLTexture, spriteSize: number, spritesWide: number, spritesHigh: number) {
        this.texture = texture;
        this.tileSize = spriteSize;
        this.texTilesWide = spritesWide;
        this.texTilesHigh = spritesHigh;
        this.invTexTilesWide = 1 / this.texTilesWide;
        this.invTexTilesHigh = 1 / this.texTilesHigh;
    }

    public Resize(width: number, height: number) {
        this.projection.x = width / 2;
        this.projection.y = height / 2;
    }

    public AddStage(stage: Stage) {
        this.stage = stage;
    }

    public ResetBatch() {
        this.indexRun = 0;
    }

    public AddSpriteToBatch(
        spriteX: number,
        spriteY: number,
        width: number,
        height: number,
        x: number,
        y: number,
        size: number,
        alpha: number,
        flipX: number,
        flipY: number,
        nop: number
    ) {
        var index = this.indexRun * 7;
        this.data[index + 0] = Math.floor(x + this.camera.position.x);
        this.data[index + 1] = Math.floor(y + this.camera.position.y);
        this.data[index + 2] = size;
        this.data[index + 3] = spriteX + width * Math.min(flipX, 0) * -1;
        this.data[index + 4] = spriteY + height * Math.min(flipY, 0) * -1;
        this.data[index + 5] = width * flipX;
        this.data[index + 6] = height * flipY;
        // index *= 7;
        // data8[index+28] = 1;
        // data8[index+29] = 1;
        // data8[index+30] = 1;
        // data8[index+31] = 1;
        this.indexRun++;
    }

    public Render(clip: AABB2) {
        if (this.indexRun == 0) return;
        this.gl.enable(WebGLRenderingContext.BLEND);
        this.gl.blendFunc(WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE_MINUS_SRC_ALPHA);

        this.gl.useProgram(this.pointSpriteShader.program);

        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        this.gl.bufferSubData(WebGLRenderingContext.ARRAY_BUFFER, 0, this.data);

        this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.position);
        this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.size);
        this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.tilePosition);
        this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.tileDimension);
        // this.gl.enableVertexAttribArray(pointSpriteShader.attribute.colour);

        this.gl.vertexAttribPointer(
            this.pointSpriteShader.attribute.position,
            2,
            WebGLRenderingContext.FLOAT,
            false,
            28,
            0
        );
        this.gl.vertexAttribPointer(
            this.pointSpriteShader.attribute.size,
            1,
            WebGLRenderingContext.FLOAT,
            false,
            28,
            8
        );
        this.gl.vertexAttribPointer(
            this.pointSpriteShader.attribute.tilePosition,
            2,
            WebGLRenderingContext.FLOAT,
            false,
            28,
            12
        );
        this.gl.vertexAttribPointer(
            this.pointSpriteShader.attribute.tileDimension,
            2,
            WebGLRenderingContext.FLOAT,
            false,
            28,
            20
        );
        // gl.vertexAttribPointer(untyped pointSpriteShader.attribute.colour, 4, WebGLRenderingContext.UNSIGNED_BYTE, false, 28, 28);

        this.gl.uniform2f(this.pointSpriteShader.uniform.projectionVector, this.projection.x, this.projection.y);
        // gl.uniform2f(untyped pointSpriteShader.uniform.flip,1,1);

        this.gl.activeTexture(WebGLRenderingContext.TEXTURE0);
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.texture);
        this.gl.drawArrays(WebGLRenderingContext.POINTS, 0, this.indexRun);
    }
}
