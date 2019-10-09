import { IRenderer } from "../RenderEngine";
import { Stage } from "../../displaylist/Stage";
import { Camera } from "../../displaylist/Camera";
import { Vector2 } from "../../../geom/Vector2";
import { AABB2 } from "../../../geom/AABB2";
import * as WebGLShaderUtils from "../util/WebGLShaderUtil";
import { ShaderWrapper } from "../util/ShaderWrapper";
import { BaseTexture } from "../../texture/BaseTexture";
import { Texture } from "../../texture/Texture";
import { Sprite } from "../../displaylist/Sprite";
import { Rectangle } from "../../../geom/Rectangle";
import { TileLayer } from "../tile/TileLayer";

export class FBOLightingRenderer2 implements IRenderer {
    public gl: WebGLRenderingContext;
    public stage: Stage;
    public camera: Camera;

    public projection: Vector2;
    public lightingShader: ShaderWrapper;

    public size: number;
    public dynamicSize: number;

    public indexBuffer: WebGLBuffer;
    public indices: Uint16Array;

    public dataBuffer: WebGLBuffer;
    public data: Float32Array;

    public indexRun: number;

    public quadVerts = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]);

    public scaledViewportSize: Float32Array;
    public viewportSize: Vector2;

    public surface: BaseTexture;
    public texture: Texture;
    public sprite: Sprite;

    public lastSnap: Vector2;
    public thisSnap: Vector2;
    public snapChanged: boolean;

    public lights: Array<Vector2>;
    public layer: TileLayer;
    // public tileDataTexture: WebGLTexture;

    constructor(layer: TileLayer) {
        this.renderSurface = this.renderSurface.bind(this);
        this.lastSnap = new Vector2(0, 0);
        this.thisSnap = new Vector2(-1000, -1000);
        this.snapChanged = false;
        this.layer = layer;
    }

    public Init(gl: WebGLRenderingContext, camera: Camera) {
        this.gl = gl;
        this.camera = camera;
        this.projection = new Vector2();
        this.indexRun = 0;
        this.lightingShader = new ShaderWrapper(
            gl,
            WebGLShaderUtils.CompileProgram(
                gl,
                FBOLightingRenderer2.LIGHTING_VERTEX_SHADER,
                FBOLightingRenderer2.LIGHTING_FRAGMENT_SHADER
            )
        );
        this.indexBuffer = gl.createBuffer();
        this.dataBuffer = gl.createBuffer();
        this.scaledViewportSize = new Float32Array(2);
        this.viewportSize = new Vector2();
        this.sprite = new Sprite();
        this.sprite.id = "lightTexture";
        this.ResizeBatch(100);
        this.lights = [];
    }

    public ResizeBatch(size: number) {
        this.size = size;
        this.dynamicSize = size;

        this.data = new Float32Array(this.dynamicSize * 20);
        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        this.gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, this.data, WebGLRenderingContext.DYNAMIC_DRAW);

        this.indices = new Uint16Array(this.dynamicSize * 6);

        for (let i = 0; i < this.dynamicSize; i++) {
            const index2 = i * 6;
            const index3 = i * 4;
            this.indices[index2 + 0] = index3 + 0;
            this.indices[index2 + 1] = index3 + 1;
            this.indices[index2 + 2] = index3 + 2;
            this.indices[index2 + 3] = index3 + 0;
            this.indices[index2 + 4] = index3 + 2;
            this.indices[index2 + 5] = index3 + 3;
        }

        this.gl.bindBuffer(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, this.indices, WebGLRenderingContext.STATIC_DRAW);
    }

    public Resize(width: number, height: number) {
        const tileSize = 16 / 2;
        const tileScale = 2;
        var expandedWidth: number = Math.floor(width / (tileSize * tileScale)) + 2;
        var expandedHeight: number = Math.floor(height / (tileSize * tileScale)) + 2;
        this.viewportSize.x = expandedWidth;
        this.viewportSize.y = expandedHeight;
        this.scaledViewportSize[0] = this.viewportSize.x;
        this.scaledViewportSize[1] = this.viewportSize.y;
        this.projection.x = (expandedWidth * 16) / 2;
        this.projection.y = (expandedHeight * 16) / 2;
        const newWidth = this.scaledViewportSize[0]; //width / 2;
        const newHeight = this.scaledViewportSize[1]; //height / 2;

        this.surface = new BaseTexture(this.gl, newWidth, newHeight);
        this.texture = new Texture(this.surface, new Rectangle(0, 0, newWidth, newHeight), new Vector2(0, 0));
        this.sprite.texture = this.texture;
        this.sprite.scale.setTo(16, -16); // figure this out
        this.sprite.pivot.setTo(newWidth / 2, newHeight / 2);
    }

    public reset() {
        this.indexRun = 0;
    }

    public addLight(x: number, y: number, intensity: number, red: number, green: number, blue: number) {
        if (this.indexRun > 0) {
            return;
        }
        intensity = 64 + 8;
        //x = 16 * 23;
        //y = 16 * 20;
        this.lights[this.indexRun] = new Vector2(x, y);
        this.indexRun++;
    }

    public processLights() {
        const intensity = 256 + 8;

        for (let i = 0; i < this.indexRun; i++) {
            const light = this.lights[i];
            const index = i * 20;
            const uvs = this.quadVerts;
            const transformedVerts = this.quadVerts;

            // x-=8;
            // y-=8;
            // x+=this.camera.position.x;
            // y+=this.camera.position.y;
            let x = light.x;
            let y = light.y;
            x += Math.floor(this.camera.position.x / 16) * 16;
            y += Math.floor(this.camera.position.y / 16) * 16;
            x += 32;
            y += 32;
            // x+= 4;
            // y+= 4;
            //0 bl
            //Verts
            this.data[index + 0] = x + transformedVerts[0] * intensity;
            this.data[index + 1] = y + transformedVerts[1] * intensity;
            //UV
            this.data[index + 2] = uvs[0]; //frame.x / tw;
            this.data[index + 3] = uvs[1]; //frame.y / th;
            //Colour
            this.data[index + 4] = 1;

            //1 br
            //Verts
            this.data[index + 5] = x + transformedVerts[2] * intensity;
            this.data[index + 6] = y + transformedVerts[3] * intensity;
            //UV
            this.data[index + 7] = uvs[2]; //(frame.x + frame.width) / tw;
            this.data[index + 8] = uvs[3]; //frame.y / th;
            //Colour
            this.data[index + 9] = 1;

            //2 tr
            //Verts
            this.data[index + 10] = x + transformedVerts[4] * intensity;
            this.data[index + 11] = y + transformedVerts[5] * intensity;
            //UV
            this.data[index + 12] = uvs[4]; //(frame.x + frame.width) / tw;
            this.data[index + 13] = uvs[5]; //(frame.y + frame.height) / th;
            //Colour
            this.data[index + 14] = 1;

            //3
            //Verts
            this.data[index + 15] = x + transformedVerts[6] * intensity;
            this.data[index + 16] = y + transformedVerts[7] * intensity;
            //UV
            this.data[index + 17] = uvs[6]; //frame.x / tw;
            this.data[index + 18] = uvs[7]; //(frame.y + frame.height) / th;
            //Colour
            this.data[index + 19] = 1;
        }
    }

    public calcSnap(cameraPos: Vector2): boolean {
        this.lastSnap.copy(this.thisSnap);
        this.thisSnap.x = Math.floor(cameraPos.x / 16) * 16;
        this.thisSnap.y = Math.floor(cameraPos.y / 16) * 16;
        // this.thisSnap.x -= cameraPos.x % 16;
        // this.thisSnap.y -= cameraPos.y % 16;

        // this.thisSnap.x += 8;
        // this.thisSnap.y += 8;
        this.thisSnap.x += 16;
        this.thisSnap.y += 16;
        this.snapChanged = this.lastSnap.x != this.thisSnap.x || this.lastSnap.y != this.thisSnap.y;
        return true; //this.snapChanged;
    }

    public Render(clip: AABB2) {
        //        console.log("FBO:" + this.camera.position.x);
        this.processLights();
        this.calcSnap(this.camera.position);
        //console.log(this.thisSnap);
        this.sprite.position.setTo(1280 / 2, 720 / 2);

        //this.sprite.position.copy(this.projection);

        this.sprite.position.minusEquals(this.thisSnap);
        this.surface.drawTo(this.renderSurface);
        this.indexRun = 0;
    }

    private renderSurface() {
        this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
        this.gl.colorMask(true, true, true, true);
        this.gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);

        this.gl.useProgram(this.lightingShader.program);

        this.gl.uniform2f(this.lightingShader.uniform.projectionVector, this.projection.x, this.projection.y);
        
        this.gl.uniform1i(this.lightingShader.uniform.tiles, 0);
        this.gl.uniform2f(this.lightingShader.uniform.viewOffset, this.thisSnap.x/16, this.thisSnap.y/16);
        this.gl.uniform2fv(this.lightingShader.uniform.inverseTileTextureSize, this.layer.inverseTileDataTextureSize);

        this.gl.activeTexture(WebGLRenderingContext.TEXTURE0);
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.layer.tileDataTexture);

        this.gl.enableVertexAttribArray(this.lightingShader.attribute.aVertexPosition);
        this.gl.enableVertexAttribArray(this.lightingShader.attribute.aTextureCoord);
        this.gl.enableVertexAttribArray(this.lightingShader.attribute.aColor);

        this.gl.vertexAttribPointer(
            this.lightingShader.attribute.aVertexPosition,
            2,
            WebGLRenderingContext.FLOAT,
            false,
            20,
            0
        );
        this.gl.vertexAttribPointer(
            this.lightingShader.attribute.aTextureCoord,
            2,
            WebGLRenderingContext.FLOAT,
            false,
            20,
            8
        );
        this.gl.vertexAttribPointer(
            this.lightingShader.attribute.aColor,
            1,
            WebGLRenderingContext.FLOAT,
            false,
            20,
            16
        );

        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        // this.gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER,data,WebGLRenderingContext.STATIC_DRAW);
        this.gl.bufferSubData(WebGLRenderingContext.ARRAY_BUFFER, 0, this.data);
        this.gl.vertexAttribPointer(
            this.lightingShader.attribute.aVertexPosition,
            2,
            WebGLRenderingContext.FLOAT,
            false,
            20,
            0
        );
        this.gl.vertexAttribPointer(
            this.lightingShader.attribute.aTextureCoord,
            2,
            WebGLRenderingContext.FLOAT,
            false,
            20,
            8
        );
        this.gl.vertexAttribPointer(
            this.lightingShader.attribute.aColor,
            1,
            WebGLRenderingContext.FLOAT,
            false,
            20,
            16
        );
        // this.gl.activeTexture(WebGLRenderingContext.TEXTURE0);
        // this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture);
        this.gl.drawElements(
            WebGLRenderingContext.TRIANGLES,
            this.indexRun * 6,
            WebGLRenderingContext.UNSIGNED_SHORT,
            0
        );
    }

    static LIGHTING_VERTEX_SHADER: string = `
        precision mediump float;
        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoord;
        attribute float aColor;
        uniform vec2 projectionVector;
        uniform vec2 viewOffset;
        varying vec2 vTextureCoord;
        varying float vColor;
        void main(void) {
            gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);
            vTextureCoord = aTextureCoord;
            vColor = aColor;
        }`;

    static LIGHTING_FRAGMENT_SHADER: string = `
        precision mediump float;
        varying vec2 vTextureCoord;
        varying float vColor;
        uniform sampler2D uSampler;
        uniform vec2 viewOffset;
        uniform vec2 inverseTileTextureSize;

        void main(void) {
            vec2 fragToCenterPos = vTextureCoord.xy;
            float d = length(fragToCenterPos);
            // gl_FragColor = vec4(1.0, 0.0, 0.0, d);

            vec2 pos = vec2(gl_FragCoord.x - 1., 46. - gl_FragCoord.y);
            vec2 p = (pos - viewOffset) * inverseTileTextureSize ;
            gl_FragColor = texture2D(uSampler, p);
            gl_FragColor.a = 0.8;
        }`;
}
// 82 
// 47