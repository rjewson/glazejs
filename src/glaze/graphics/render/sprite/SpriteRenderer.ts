import { IRenderer } from "../RenderEngine";
import { Stage } from "../../displaylist/Stage";
import { Camera } from "../../displaylist/Camera";
import { Vector2 } from "../../../geom/Vector2";
import { AABB2 } from "../../../geom/AABB2";
import * as WebGLShaderUtils from "../util/WebGLShaderUtil";
import { ShaderWrapper } from "../util/ShaderWrapper";
import { WebGLBatch } from "./SpriteBatch";

import vertexShader from "./shaders/sprite.vert.glsl";
import fragmentShader from "./shaders/sprite.frag.glsl";

export class SpriteRenderer implements IRenderer {
    public gl: WebGLRenderingContext;
    public stage: Stage;
    public camera: Camera;

    public projection: Vector2;
    public spriteShader: ShaderWrapper;

    public spriteBatch: WebGLBatch;

    constructor() {}

    public Init(gl: WebGLRenderingContext, camera: Camera) {
        this.gl = gl;
        this.camera = camera;
        this.projection = new Vector2();
        this.spriteShader = new ShaderWrapper(gl, WebGLShaderUtils.CompileProgram(gl, vertexShader, fragmentShader));
        this.spriteBatch = new WebGLBatch(gl);
        this.spriteBatch.ResizeBatch(1000);
    }

    public Resize(width: number, height: number) {
        this.projection.x = width / 2;
        this.projection.y = height / 2;
    }

    public AddStage(stage: Stage) {
        this.stage = stage;
    }

    public Render(clip: AABB2) {
        this.stage.updateTransform();
        this.gl.useProgram(this.spriteShader.program);
        this.gl.uniform2f(this.spriteShader.uniform.projectionVector, this.projection.x, this.projection.y);
        this.gl.enableVertexAttribArray(this.spriteShader.attribute.aVertexPosition);
        this.gl.enableVertexAttribArray(this.spriteShader.attribute.aTextureCoord);
        this.gl.enableVertexAttribArray(this.spriteShader.attribute.aColor);
        this.gl.vertexAttribPointer(
            this.spriteShader.attribute.aVertexPosition,
            2,
            WebGLRenderingContext.FLOAT,
            false,
            20,
            0
        );
        this.gl.vertexAttribPointer(
            this.spriteShader.attribute.aTextureCoord,
            2,
            WebGLRenderingContext.FLOAT,
            false,
            20,
            8
        );
        this.gl.vertexAttribPointer(this.spriteShader.attribute.aColor, 1, WebGLRenderingContext.FLOAT, false, 20, 16);
        this.spriteBatch.Render(this.spriteShader, this.stage, this.camera.viewPortAABB);
    }
}
