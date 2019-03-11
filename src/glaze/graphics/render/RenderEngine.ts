import { Stage } from "../displaylist/Stage";
import { Camera } from "../displaylist/Camera";
import { AABB2 } from "../../geom/AABB2";

export interface IRenderer {
    Init(gl: WebGLRenderingContext, camera: Camera): void;
    Resize(width: number, height: number): void;
    Render(clip: AABB2): void;
}

export class RendererEngine {
    public stage: Stage;
    public camera: Camera;
    public view: HTMLCanvasElement;
    public width: number;
    public height: number;

    public gl: WebGLRenderingContext;
    public contextAttributes: WebGLContextAttributes;

    private contextLost: boolean;

    public renderers: Array<IRenderer>;

    constructor(
        stage: Stage,
        camera: Camera,
        view: HTMLCanvasElement,
        width: number = 800,
        height: number = 600,
        transparent: boolean = false,
        antialias: boolean = false,
    ) {
        this.stage = stage;
        this.camera = camera;
        this.view = view;
        this.contextLost = false;

        this.contextAttributes = {};
        this.contextAttributes.alpha = transparent;
        this.contextAttributes.antialias = antialias;
        this.contextAttributes.premultipliedAlpha = true;
        this.contextAttributes.stencil = false;

        this.renderers = new Array();

        this.InitalizeWebGlContext();
        this.Resize(width, height);
    }

    public InitalizeWebGlContext() {
        this.view.addEventListener("webglcontextlost", this.onContextLost, false);
        this.view.addEventListener("webglcontextrestored", this.onContextRestored, false);
        this.gl = this.view.getContext("webgl", this.contextAttributes);

        this.gl.disable(WebGLRenderingContext.DEPTH_TEST);
        this.gl.disable(WebGLRenderingContext.CULL_FACE);
        this.gl.enable(WebGLRenderingContext.BLEND);
        this.gl.colorMask(true, true, true, this.contextAttributes.alpha);
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.blendFunc(WebGLRenderingContext.SRC_ALPHA,WebGLRenderingContext.ONE_MINUS_SRC_ALPHA);

        if (!this.gl.getExtension("OES_texture_float")) console.log("New browser time: Float textures not supported");
    }

    public Resize(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.view.width = width;
        this.view.height = height;
        this.gl.viewport(0, 0, width, height);
        this.gl.scissor(0, 0, width, height);
    }
    public AddRenderer(renderer: IRenderer) {
        renderer.Init(this.gl, this.camera);
        renderer.Resize(this.width, this.height);
        this.renderers.push(renderer);
    }

    public Render(clip: AABB2) {
        if (this.contextLost) return;
        // this.stage.updateTransform();
        // stage.PreRender();

        // gl.viewport(0,0,width,height);
        // gl.colorMask(true,true,true,contextAttributes.alpha);
        // gl.bindFramebuffer(RenderingContext.FRAMEBUFFER,null);
        // gl.clearColor(0.2,0.2,0.2,1.0);
        // gl.clear(RenderingContext.COLOR_BUFFER_BIT);

        // this.gl.colorMask(true, true, true, true);
        // gl.clearColor(1.0, 0.0, 0.0, 1.0);
        this.gl.clearColor(159 / 255, 188 / 255, 197 / 255, 1.0);
        this.gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
        this.gl.colorMask(true, true, true, false);
        this.gl.blendFunc(WebGLRenderingContext.SRC_ALPHA,WebGLRenderingContext.ONE_MINUS_SRC_ALPHA);

        // this.gl.disable(WebGLRenderingContext.BLEND);
        // this.gl.disable(WebGLRenderingContext.DEPTH_TEST);

        //9FBCC5
        //159 188 197 1

        // this.gl.blendFunc(WebGLRenderingContext.SRC_ALPHA,WebGLRenderingContext.ONE_MINUS_SRC_ALPHA);
        // return;
        // console.log("----");
        this.renderers.forEach(renderer => {
            renderer.Render(clip);
        });
    }

    private onContextLost(event: Event) {
        this.contextLost = true;
        console.log("webGL Context Lost");
    }

    private onContextRestored(event: Event) {
        this.contextLost = false;
        console.log("webGL Context Restored");
    }
}
