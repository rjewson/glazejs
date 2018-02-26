import { IRenderer } from "../RenderEngine";
import { Vector2 } from "../../../geom/Vector2";
import { ShaderWrapper } from "../util/ShaderWrapper";
import { Camera } from "../../displaylist/Camera";
import { BaseTexture } from "../../texture/BaseTexture";
import { AABB2 } from "../../../geom/AABB2";
import { CompileProgram } from "../util/WebGLShaderUtil";

export class FBOLightingRenderer implements IRenderer {
    public gl: WebGLRenderingContext;
    public viewportSize: Vector2;
    public scaledViewportSize: Float32Array;
    public inverseTileTextureSize: Float32Array;

    public gridSize: number;

    public texture: WebGLTexture;

    public quadVertBuffer: WebGLBuffer;

    public screenShader: ShaderWrapper;
    public surfaceShader: ShaderWrapper;

    public camera: Camera;

    public surface: BaseTexture;

    public lightData: Float32Array;
    public lightDataTexture: BaseTexture;

    public maxLights: number = 32;
    public indexRun: number;
    public lightCount: number;

    public fullReset: boolean = true;

    constructor() {}

    public Init(gl: WebGLRenderingContext, camera: Camera) {
        this.gl = gl;
        this.camera = camera;
        this.gridSize = 4;

        this.viewportSize = new Vector2();
        this.scaledViewportSize = new Float32Array(2);

        this.quadVertBuffer = gl.createBuffer();
        gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.quadVertBuffer);

        this.drawSurface = this.drawSurface.bind(this);

        var quadVerts = new Float32Array([
            -1,
            1,
            1,
            1,
            1,
            -1,

            1,
            -1,
            -1,
            -1,
            -1,
            1,

            // -1, -1,
            //  1, -1,
            //  1,  1,

            // -1, -1,
            //  1,  1,
            // -1,  1,
        ]);

        gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, quadVerts, WebGLRenderingContext.STATIC_DRAW);

        gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, quadVerts, WebGLRenderingContext.STATIC_DRAW);

        this.screenShader = new ShaderWrapper(
            gl,
            CompileProgram(gl, FBOLightingRenderer.SCREEN_VERTEX_SHADER, FBOLightingRenderer.SCREEN_FRAGMENT_SHADER),
        );
        this.surfaceShader = new ShaderWrapper(
            gl,
            CompileProgram(gl, FBOLightingRenderer.SURFACE_VERTEX_SHADER, FBOLightingRenderer.SURFACE_FRAGMENT_SHADER),
        );

        this.surface = new BaseTexture(gl, (800 / this.gridSize) | 0, (640 / this.gridSize) | 0);

        this.lightData = new Float32Array(this.maxLights * 4 * 4);
        this.lightDataTexture = new BaseTexture(gl, this.lightData.length, 1, true);
        this.reset();
    }

    public Resize(width: number, height: number) {
        this.viewportSize.x = width;
        this.viewportSize.y = height;
    }

    public reset() {
        this.indexRun = 0;
        this.lightCount = 0;
    }

    public addLight(x: number, y: number, intensity: number, red: number, green: number, blue: number) {
        if (this.lightCount++ == this.maxLights - 1) return;
        this.lightData[this.indexRun++] = x; //x
        this.lightData[this.indexRun++] = y; //y
        this.lightData[this.indexRun++] = intensity; //dist
        this.lightData[this.indexRun++] = ((red << 16) | (green << 8) | blue) / (1 << 24);
    }

    drawSurface() {
        // lightData[0] = 400.0;  //x
        // lightData[1] = 100.0;  //y
        // lightData[2] = 300;  //dist
        // lightData[3] = 0;

        // lightData[4] = 100.0;  //x
        // lightData[5] = 600.0;  //y
        // lightData[6] = 0;  //dist
        // lightData[7] = 0;
        // reset();
        // addLight(400,100,300);
        // addLight(100,600,100);
        this.addLight(0, 0, 0, 0, 0, 0);

        var x = this.camera.position.x;
        var y = this.camera.position.y;

        this.lightDataTexture.bind(0);
        this.gl.texImage2D(
            WebGLRenderingContext.TEXTURE_2D,
            0,
            WebGLRenderingContext.RGBA,
            8,
            8,
            0,
            WebGLRenderingContext.RGBA,
            WebGLRenderingContext.FLOAT,
            this.lightData,
        );

        this.gl.clearColor(1, 1, 1, 1);
        this.gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
        this.gl.colorMask(true, true, true, true);
        this.gl.useProgram(this.surfaceShader.program);
        // if (fullReset==true) {
        this.gl.uniform2fv(this.surfaceShader.uniform.viewportSize, this.scaledViewportSize);
        this.gl.uniform2f(this.surfaceShader.uniform.resolution, 800, 640);
        this.gl.uniform2f(this.surfaceShader.uniform.viewOffset, -x, -y);
        this.gl.uniform2f(this.surfaceShader.uniform.gridSize, this.gridSize, this.gridSize);
        this.gl.uniform1i(this.surfaceShader.uniform.numLights, this.maxLights);
        // fullReset=false;
        // }
        this.gl.uniform1i(this.surfaceShader.uniform.texture, 0);
        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.quadVertBuffer);
        this.gl.vertexAttribPointer(this.surfaceShader.attribute.position, 2, WebGLRenderingContext.FLOAT, false, 0, 0);
        this.gl.drawArrays(WebGLRenderingContext.TRIANGLES, 0, 6);
    }

    public Render(clip: AABB2) {
        var x = this.camera.position.x;
        var y = this.camera.position.y;

        this.surface.drawTo(this.drawSurface);

        this.gl.enable(WebGLRenderingContext.BLEND);
        // this.gl.blendEquation( WebGLRenderingContext.FUNC_ADD );
        this.gl.blendFunc(WebGLRenderingContext.DST_COLOR, WebGLRenderingContext.DST_COLOR);
        // this.gl.blendFunc(WebGLRenderingContext.DST_COLOR, WebGLRenderingContext.ZERO);

        this.gl.useProgram(this.screenShader.program);
        this.gl.uniform2fv(this.screenShader.uniform.viewportSize, this.scaledViewportSize);
        this.gl.uniform2f(this.screenShader.uniform.resolution, 800, 640);
        this.gl.uniform2f(this.screenShader.uniform.textureOffset, -x % this.gridSize, -y % this.gridSize);
        this.surface.bind(0);
        this.gl.uniform1i(this.screenShader.uniform.texture, 0);

        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.quadVertBuffer);
        this.gl.vertexAttribPointer(this.screenShader.attribute.position, 2, WebGLRenderingContext.FLOAT, false, 0, 0);

        this.gl.drawArrays(WebGLRenderingContext.TRIANGLES, 0, 6);
        this.surface.unbind(0);
        this.gl.disable(WebGLRenderingContext.BLEND);
    }

    static SURFACE_VERTEX_SHADER: string = `
        precision mediump float;
        attribute vec2 position;

        void main(void) {
           gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    //http://nullprogram.com/blog/2014/06/29/

    static SURFACE_FRAGMENT_SHADER: string = `
       precision mediump float;
       precision mediump int;

        uniform sampler2D texture;
        uniform vec2 resolution;
        uniform vec2 viewOffset;
        uniform vec2 gridSize;
        uniform int maxLights;

        vec4 accumulatedLight = vec4(0.0,0.0,0.0,1.0);

        void applyLight(vec2 tilePos,vec4 light)
        {
           vec2 dist = tilePos-light.xy;
           float intensity = 1.0 - (dist.x*dist.x+dist.y*dist.y)/(light.z*light.z);
           intensity = clamp(intensity,0.0,1.0);
           intensity = intensity * intensity;
           vec3 unpackedValues = vec3(1.0, 256.0, 65536.0);
           unpackedValues = fract(unpackedValues * light.w);
        //   accumulatedLight.xyz +=  unpackedValues*intensity;//max(accumulatedLight,intensity);
           accumulatedLight.xyz =  max(unpackedValues*intensity,accumulatedLight.xyz);//max(accumulatedLight,intensity);
        }
        // void applyLight2(vec2 tilePos,vec4 light)
        // {
        //    vec2 dist = tilePos-light.xy;
        //    float sqrd = (dist.x*dist.x+dist.y*dist.y);
        //    float intensityCoef1 = 1.0/(1.0+sqrd/20.0);
        //    float intensityCoef2 = intensityCoef1 - 1.0/(1.0+light.z*light.z);
        //    float intensityCoef3 = intensityCoef2 / (1.0 - 1.0/(1.0+light.z*light.z));
        //    accumulatedLight = max(accumulatedLight,intensityCoef3);
        // }

        void main(void) {
           vec2 tilePos = viewOffset + (gl_FragCoord.xy * gridSize) + gridSize/2.0;
           float index = 0.0;
           for (int i=0; i<32; i++) { 
               vec4 lightData = texture2D(texture,vec2(index,0.0));
               if (lightData.z==0.0) break; //End of the lights, there should be no lights at this intensity
               applyLight(tilePos,lightData);
               index+=1.0/32.0;
           }
           gl_FragColor = accumulatedLight;//vec4 (accumulatedLight, accumulatedLight, accumulatedLight, 1);
        }
    `;

    //Draw to screen programs

    static SCREEN_VERTEX_SHADER: string = `
        precision mediump float;
        attribute vec2 position;

        void main(void) {
           gl_Position = vec4(position, 0.0, 1.0);
        }
    `;

    static SCREEN_FRAGMENT_SHADER: string = `
       precision mediump float;

        uniform sampler2D texture;
        uniform vec2 resolution;
        uniform vec2 textureOffset;

        void main(void) {
            vec2 uv = (gl_FragCoord.xy)/(resolution.xy);
            uv.y = 1.0-uv.y;
            gl_FragColor = texture2D(texture,uv);
        }
    `;
}
