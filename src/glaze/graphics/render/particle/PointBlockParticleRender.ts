import { IRenderer } from "../RenderEngine";
import { Vector2 } from "../../../geom/Vector2";
import { ShaderWrapper } from "../util/ShaderWrapper";
import { Stage } from "../../displaylist/Stage";
import { Camera } from "../../displaylist/Camera";
import { AABB2 } from "../../../geom/AABB2";
import { CompileProgram } from "../util/WebGLShaderUtil";
import vertexShader from "./shaders/BlockParticle.vert.glsl";
import fragmentShader from "./shaders/BlockParticle.frag.glsl";

export class PointBlockParticleRender implements IRenderer {
    public gl: WebGLRenderingContext;

    public projection: Vector2;

    public pointSpriteShader: ShaderWrapper;

    public dataBuffer: WebGLBuffer;
    public data: Float32Array;
    public data8: Uint8ClampedArray;

    public stage: Stage;
    public camera: Camera;
    public texture: WebGLTexture;

    public indexRun: number;

    public maxSprites: number;

    private arrayBuffer: ArrayBuffer;

    constructor(size: number) {
        this.maxSprites = size;
    }

    public Init(gl: WebGLRenderingContext, camera: Camera) {
        this.gl = gl;
        this.camera = camera;
        this.projection = new Vector2();
        this.pointSpriteShader = new ShaderWrapper(gl, CompileProgram(gl, vertexShader, fragmentShader));
        this.dataBuffer = this.gl.createBuffer();
        this.arrayBuffer = new ArrayBuffer(20 * 4 * this.maxSprites);
        this.data = new Float32Array(this.arrayBuffer);
        this.data8 = new Uint8ClampedArray(this.arrayBuffer);
        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        this.gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, this.data, WebGLRenderingContext.DYNAMIC_DRAW);
        this.ResetBatch();
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
        x: number,
        y: number,
        size: number,
        alpha: number,
        red: number,
        green: number,
        blue: number
    ) {
        var index = this.indexRun * 4;
        this.data[index + 0] = x; //Math.floor(x);// + camera.position.x);
        this.data[index + 1] = y; //Math.floor(y);// + camera.position.y);
        this.data[index + 2] = size;
        index *= 4;
        this.data8[index + 12] = red;
        this.data8[index + 13] = green;
        this.data8[index + 14] = blue;
        this.data8[index + 15] = alpha;
        this.indexRun++;
    }

    public Render(clip: AABB2) {
        if (this.indexRun == 0) return;

        this.gl.useProgram(this.pointSpriteShader.program);
        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        // this.gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER,data,WebGLRenderingContext.DYNAMIC_DRAW);
        this.gl.bufferSubData(WebGLRenderingContext.ARRAY_BUFFER, 0, this.data);

        this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.position);
        this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.size);
        this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.colour);

        this.gl.vertexAttribPointer(
            this.pointSpriteShader.attribute.position,
            2,
            WebGLRenderingContext.FLOAT,
            false,
            16,
            0
        );
        this.gl.vertexAttribPointer(
            this.pointSpriteShader.attribute.size,
            1,
            WebGLRenderingContext.FLOAT,
            false,
            16,
            8
        );
        this.gl.vertexAttribPointer(
            this.pointSpriteShader.attribute.colour,
            4,
            WebGLRenderingContext.UNSIGNED_BYTE,
            true,
            16,
            12
        );
        this.gl.uniform2f(
            this.pointSpriteShader.uniform.cameraPosition,
            this.camera.position.x,
            this.camera.position.y
        );

        this.gl.uniform2f(this.pointSpriteShader.uniform.projectionVector, this.projection.x, this.projection.y);

        this.gl.drawArrays(WebGLRenderingContext.POINTS, 0, this.indexRun);
    }

    // static SPRITE_VERTEX_SHADER: string = `
    //     precision mediump float;
    //     uniform vec2 projectionVector;
    //     uniform vec2 cameraPosition;

    //     attribute vec2 position;
    //     attribute float size;
    //     attribute vec4 colour;
    //     varying vec4 vColor;
    //     void main() {
    //         gl_PointSize = size;
    //         vColor = colour;
    //         gl_Position = vec4( (cameraPosition.x + position.x) / projectionVector.x -1.0, (cameraPosition.y + position.y) / -projectionVector.y + 1.0 , 0.0, 1.0);
    //     }
    // `;

    // static SPRITE_FRAGMENT_SHADER: string = `
    //     precision mediump float;

    //     varying vec4 vColor;
    //     void main() {
    //         gl_FragColor = vColor;
    //     }
    // `;
}
