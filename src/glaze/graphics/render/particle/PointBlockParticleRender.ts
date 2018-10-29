import { IRenderer } from "../RenderEngine";
import { Vector2 } from "../../../geom/Vector2";
import { ShaderWrapper } from "../util/ShaderWrapper";
import { Stage } from "../../displaylist/Stage";
import { Camera } from "../../displaylist/Camera";
import { AABB2 } from "../../../geom/AABB2";
import { CompileProgram } from "../util/WebGLShaderUtil";

export class PointBlockParticleRender implements IRenderer {
    public gl: WebGL2RenderingContext;

    public projection: Vector2;

    public pointSpriteShader: ShaderWrapper;

    public dataBuffer: WebGLBuffer;
    private arrayBuffer: ArrayBuffer;
    public data: Float32Array;
    public data8: Uint8ClampedArray;

    public stage: Stage;
    public camera: Camera;
    public texture: WebGLTexture;

    public indexRun: number;

    public first: boolean = true;
    public maxSprites: number;

    constructor(size: number) {
        this.maxSprites = size;
    }

    public Init(gl: WebGL2RenderingContext, camera: Camera) {
        this.gl = gl;
        this.camera = camera;
        this.projection = new Vector2();
        this.pointSpriteShader = new ShaderWrapper(
            gl,
            CompileProgram(
                gl,
                PointBlockParticleRender.SPRITE_VERTEX_SHADER,
                PointBlockParticleRender.SPRITE_FRAGMENT_SHADER
            )
        );
        this.dataBuffer = this.gl.createBuffer();
        this.arrayBuffer = new ArrayBuffer(20 * this.maxSprites);
        this.data = new Float32Array(this.arrayBuffer);
        this.data8 = new Uint8ClampedArray(this.arrayBuffer);
        this.gl.bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, this.dataBuffer);
        this.gl.bufferData(WebGL2RenderingContext.ARRAY_BUFFER, this.data, WebGL2RenderingContext.STREAM_DRAW);
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
        // this.gl.enable(WebGL2RenderingContext.BLEND);
        // this.gl.blendFunc(WebGL2RenderingContext.SRC_ALPHA, WebGL2RenderingContext.ONE_MINUS_SRC_ALPHA);

        this.gl.useProgram(this.pointSpriteShader.program);
        this.gl.bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, this.dataBuffer);
        // this.gl.bufferData(WebGL2RenderingContext.ARRAY_BUFFER,data,WebGL2RenderingContext.DYNAMIC_DRAW);
        this.gl.bufferSubData(WebGL2RenderingContext.ARRAY_BUFFER, 0, this.data, 0, this.indexRun * 4);

        this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.position);
        this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.size);
        this.gl.enableVertexAttribArray(this.pointSpriteShader.attribute.colour);

        this.gl.vertexAttribPointer(
            this.pointSpriteShader.attribute.position,
            2,
            WebGL2RenderingContext.FLOAT,
            false,
            16,
            0
        );
        this.gl.vertexAttribPointer(
            this.pointSpriteShader.attribute.size,
            1,
            WebGL2RenderingContext.FLOAT,
            false,
            16,
            8
        );
        this.gl.vertexAttribPointer(
            this.pointSpriteShader.attribute.colour,
            4,
            WebGL2RenderingContext.UNSIGNED_BYTE,
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

        this.gl.drawArrays(WebGL2RenderingContext.POINTS, 0, this.indexRun);
    }

    static SPRITE_VERTEX_SHADER: string = `
        precision mediump float;
        uniform vec2 projectionVector;
        uniform vec2 cameraPosition;

        attribute vec2 position;
        attribute float size;
        attribute vec4 colour;
        varying vec4 vColor;
        void main() {
            gl_PointSize = size;
            vColor = colour;
            gl_Position = vec4( (cameraPosition.x + position.x) / projectionVector.x -1.0, (cameraPosition.y + position.y) / -projectionVector.y + 1.0 , 0.0, 1.0);            
        }
    `;

    static SPRITE_FRAGMENT_SHADER: string = `
        precision mediump float;

        varying vec4 vColor;
        void main() {
            gl_FragColor = vColor;
        }
    `;
}
