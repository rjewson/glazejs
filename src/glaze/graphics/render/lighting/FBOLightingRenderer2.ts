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
import { LightGroup } from "./LightGroup";

export class FBOLightingRenderer2 implements IRenderer {
    public gl: WebGLRenderingContext;
    public stage: Stage;
    public camera: Camera;

    public projection: Vector2;

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

    private ranges: Array<number>;
    private lightGroups: Array<LightGroup>;
    private lightGroupsMap: Array<LightGroup>;

    private tileSize: number;
    private halfTileSize: number;

    constructor(ranges: Array<number>, layer: TileLayer) {
        this.ranges = ranges;
        this.renderSurface = this.renderSurface.bind(this);
        this.lastSnap = new Vector2(0, 0);
        this.thisSnap = new Vector2(-1000, -1000);
        this.snapChanged = false;
        this.layer = layer;
        this.tileSize = 16;
        this.halfTileSize = this.tileSize / 2;
    }

    public Init(gl: WebGLRenderingContext, camera: Camera) {
        this.gl = gl;
        this.camera = camera;
        this.projection = new Vector2();
        this.indexRun = 0;
        // this.lightingShader = new ShaderWrapper(
        //     gl,
        //     WebGLShaderUtils.CompileProgram(
        //         gl,
        //         FBOLightingRenderer2.LIGHTING_VERTEX_SHADER,
        //         FBOLightingRenderer2.LIGHTING_FRAGMENT_SHADER_FACTORY(10)
        //     )
        // );
        this.indexBuffer = gl.createBuffer();
        this.dataBuffer = gl.createBuffer();
        this.scaledViewportSize = new Float32Array(2);
        this.viewportSize = new Vector2();
        this.sprite = new Sprite();
        this.sprite.id = "lightTexture";
        this.ResizeBatch(this.ranges.length * 20);
        this.lights = [];
        this.lightGroups = this.ranges.map(
            range =>
                new LightGroup(
                    range,
                    20,
                    new ShaderWrapper(
                        gl,
                        WebGLShaderUtils.CompileProgram(
                            gl,
                            FBOLightingRenderer2.LIGHTING_VERTEX_SHADER,
                            FBOLightingRenderer2.LIGHTING_FRAGMENT_SHADER_FACTORY(range)
                        )
                    )
                )
        );
        this.lightGroupsMap = new Array(this.ranges[this.ranges.length-1]);
        this.ranges.forEach( (range, i) => {
            this.lightGroupsMap[range] = this.lightGroups[i];
        })
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
        var expandedWidth: number = Math.floor(width / this.tileSize) + 2;
        var expandedHeight: number = Math.floor(height / this.tileSize) + 2;
        this.viewportSize.x = expandedWidth;
        this.viewportSize.y = expandedHeight;
        this.scaledViewportSize[0] = this.viewportSize.x;
        this.scaledViewportSize[1] = this.viewportSize.y;

        this.projection.x = (expandedWidth * this.tileSize) / 2;
        this.projection.y = (expandedHeight * this.tileSize) / 2;

        this.surface = new BaseTexture(this.gl, expandedWidth, expandedHeight);
        this.texture = new Texture(this.surface, new Rectangle(0, 0, expandedWidth, expandedHeight), new Vector2(0, 0));
        this.sprite.texture = this.texture;
        this.sprite.scale.setTo(this.tileSize, -this.tileSize);
        this.sprite.pivot.setTo(expandedWidth / 2, expandedHeight / 2);
    }

    public reset() {
        this.indexRun = 0;
        for (const lightGroup of this.lightGroups) {
            lightGroup.reset();
        }
    }

    public addUnblockedLight(x: number, y: number, intensity: number, red: number, green: number, blue: number) {
        intensity = 64 + 8;
        this.lights[this.indexRun] = new Vector2(x, y);
        this.indexRun++;
    }

    public addBlockedLight(x: number, y: number, intensity: number, red: number, green: number, blue: number) {
        const group = this.lightGroupsMap[Math.round(intensity/this.tileSize)];
        if (group) {
            group.addLight(x,y,intensity,red,green,blue);
        }

        intensity = 64 + 8;
        this.lights[this.indexRun] = new Vector2(x, y);
        this.indexRun++;
    }

    public processLightsBatch() {
        const bytesPerLight = 5 * 4;
        let i = 0;
        debugger;
        for (const lightGroup of this.lightGroups) {
            for (let lightIndex=0; lightIndex<lightGroup.activeLights; lightIndex++) {
                const light = lightGroup.lights[lightIndex];
                const index = i * 20;
                const uvs = this.quadVerts;
                const transformedVerts = this.quadVerts;

                const intensity = light.intensity + this.halfTileSize;
                const size = light.intensity / this.tileSize;

                let x = light.x;
                let y = light.y;
                x += Math.floor(this.camera.position.x / this.tileSize) * this.tileSize;
                y += Math.floor(this.camera.position.y / this.tileSize) * this.tileSize;
                x += this.tileSize*2;
                y += this.tileSize*2;

                const colour = light.red << 24 | light.green << 16 | light.blue << 8 | 1

                //0 bl
                //Verts
                this.data[index + 0] = x + transformedVerts[0] * intensity;
                this.data[index + 1] = y + transformedVerts[1] * intensity;
                //UV
                this.data[index + 2] = uvs[0] * size; //frame.x / tw;
                this.data[index + 3] = uvs[1] * size; //frame.y / th;
                //Colour
                this.data[index + 4] = 1;

                //1 br
                //Verts
                this.data[index + 5] = x + transformedVerts[2] * intensity;
                this.data[index + 6] = y + transformedVerts[3] * intensity;
                //UV
                this.data[index + 7] = uvs[2] * size; //(frame.x + frame.width) / tw;
                this.data[index + 8] = uvs[3] * size; //frame.y / th;
                //Colour
                this.data[index + 9] = 1;

                //2 tr
                //Verts
                this.data[index + 10] = x + transformedVerts[4] * intensity;
                this.data[index + 11] = y + transformedVerts[5] * intensity;
                //UV
                this.data[index + 12] = uvs[4] * size; //(frame.x + frame.width) / tw;
                this.data[index + 13] = uvs[5] * size; //(frame.y + frame.height) / th;
                //Colour
                this.data[index + 14] = 1;

                //3
                //Verts
                this.data[index + 15] = x + transformedVerts[6] * intensity;
                this.data[index + 16] = y + transformedVerts[7] * intensity;
                //UV
                this.data[index + 17] = uvs[6] * size; //frame.x / tw;
                this.data[index + 18] = uvs[7] * size; //(frame.y + frame.height) / th;
                //Colour
                this.data[index + 19] = 1;

                i++;
            }
        }
    }

    public calcSnap(cameraPos: Vector2): boolean {
        this.lastSnap.copy(this.thisSnap);
        this.thisSnap.x = Math.floor(cameraPos.x / this.tileSize) * this.tileSize;
        this.thisSnap.y = Math.floor(cameraPos.y / this.tileSize) * this.tileSize;
        this.thisSnap.x += this.tileSize;
        this.thisSnap.y += this.tileSize;
        this.snapChanged = this.lastSnap.x != this.thisSnap.x || this.lastSnap.y != this.thisSnap.y;
        return this.snapChanged;
    }

    public Render(clip: AABB2) {
        this.processLightsBatch();
        this.calcSnap(this.camera.position);
        this.sprite.position.setTo(1280 / 2, 720 / 2);
        this.sprite.position.minusEquals(this.thisSnap);
        this.surface.drawTo(this.renderSurface);
        this.indexRun = 0;
    }

    private renderSurface() {
        this.gl.clearColor(0.0, 0.0, 0.0, 0.5);
        this.gl.colorMask(true, true, true, true);
        this.gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);

        this.gl.blendEquation(WebGLRenderingContext.FUNC_ADD);
        this.gl.blendFunc(WebGLRenderingContext.ZERO, WebGLRenderingContext.ONE_MINUS_SRC_ALPHA);
        // Source = from shader
        // Dest = target framebuffer
        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        this.gl.bufferSubData(WebGLRenderingContext.ARRAY_BUFFER, 0, this.data);

        this.gl.activeTexture(WebGLRenderingContext.TEXTURE0);
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.layer.tileDataTexture);

        let startPosition = 0;
        for (const lightGroup of this.lightGroups) {
            if (lightGroup.activeLights==0) {
                continue;
            }
            this.gl.useProgram(lightGroup.lightingShader.program);

            this.gl.uniform2f(lightGroup.lightingShader.uniform.projectionVector, this.projection.x, this.projection.y);
            // this.gl.uniform1i(lightGroup.lightingShader.uniform.tiles, 0);
            this.gl.uniform2f(lightGroup.lightingShader.uniform.viewOffset, this.thisSnap.x / this.tileSize, this.thisSnap.y / this.tileSize);
            this.gl.uniform2fv(lightGroup.lightingShader.uniform.inverseTileTextureSize, this.layer.inverseTileDataTextureSize);

            this.gl.enableVertexAttribArray(lightGroup.lightingShader.attribute.aVertexPosition);
            this.gl.enableVertexAttribArray(lightGroup.lightingShader.attribute.aTextureCoord);
            this.gl.enableVertexAttribArray(lightGroup.lightingShader.attribute.aColor);

            
            this.gl.vertexAttribPointer(
                lightGroup.lightingShader.attribute.aVertexPosition,
                2,
                WebGLRenderingContext.FLOAT,
                false,
                20,
                0
            );
            this.gl.vertexAttribPointer(
                lightGroup.lightingShader.attribute.aTextureCoord,
                2,
                WebGLRenderingContext.FLOAT,
                false,
                20,
                8
            );
            this.gl.vertexAttribPointer(
                lightGroup.lightingShader.attribute.aColor,
                1,
                WebGLRenderingContext.FLOAT,
                false,
                20,
                16
            );
            this.gl.drawElements(
                WebGLRenderingContext.TRIANGLES,
                lightGroup.activeLights * 6,
                WebGLRenderingContext.UNSIGNED_SHORT,
                startPosition
            );
            startPosition += lightGroup.activeLights * 12;
        }

        this.gl.blendEquation(WebGLRenderingContext.FUNC_ADD);
        this.gl.blendFunc(WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE_MINUS_SRC_ALPHA);
        this.gl.colorMask(true, true, true, true);
        
    }

    static LIGHTING_VERTEX_SHADER: string = `
        precision mediump float;

        uniform vec2 projectionVector;
        uniform vec2 viewOffset;
        
        attribute vec2 aVertexPosition;
        attribute vec2 aTextureCoord;
        attribute float aColor;

        varying vec2 vTextureCoord;
        varying float vColor;

        void main(void) {
            gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);
            vTextureCoord = aTextureCoord;
            vColor = aColor;
        }`;

    static LIGHTING_FRAGMENT_SHADER_FACTORY = (count: number) => `
        precision mediump float;

        const int PATH_TRACKING_SAMPLES = ${count};
        const float INV_PATH_TRACKING_SAMPLES = 1.0 / float(PATH_TRACKING_SAMPLES);
        const vec2 EMPTY_TILE = vec2(1.0, 1.0);

        uniform sampler2D uSampler;
        uniform vec2 viewOffset;
        uniform vec2 inverseTileTextureSize;

        varying vec2 vTextureCoord;
        varying float vColor;

        void main(void) {
            vec2 fragToCenterPos = vTextureCoord.xy;
            float d = length(fragToCenterPos) / float(PATH_TRACKING_SAMPLES);
            
            vec2 pos = vec2(gl_FragCoord.x - 1., 46. - gl_FragCoord.y);
            vec2 currentPos = (pos - viewOffset) * inverseTileTextureSize;
            
            vec2 centerPos = currentPos - fragToCenterPos * inverseTileTextureSize;

            float m = INV_PATH_TRACKING_SAMPLES * d * 0.5;

            float stepPos = 0.;
            float obs = 1. - d;
	
            for(int i = 0; i < PATH_TRACKING_SAMPLES; i++)
            {
                stepPos += INV_PATH_TRACKING_SAMPLES; 
                vec4 tile = texture2D(uSampler, mix(centerPos, currentPos, stepPos));

                if (all(lessThan(tile.xy, EMPTY_TILE))) {
                    obs -= m;
                    //col *= saturate(1 - (1 - obstacle)*obstacle.a*m);
                }
            }
        
            gl_FragColor.a = clamp(obs,0.,1.);
            // gl_FragColor = vec4(1.,1.,1.,1.0-d);

        }`;

    static xxxLIGHTING_FRAGMENT_SHADER: string = `
        precision mediump float;
        varying vec2 vTextureCoord;
        varying float vColor;
        uniform sampler2D uSampler;
        uniform vec2 viewOffset;
        uniform vec2 inverseTileTextureSize;

        void main(void) {
            vec2 fragToCenterPos = vTextureCoord.xy;
            float d = 1. - (10. / length(fragToCenterPos));
            // gl_FragColor = vec4(1.0, 0.0, 0.0, d);

            vec2 pos = vec2(gl_FragCoord.x - 1., 46. - gl_FragCoord.y);
            vec2 p = (pos - viewOffset) * inverseTileTextureSize ;
            gl_FragColor = texture2D(uSampler, p);
            gl_FragColor.a = d;
        }`;
}
// 82
// 47