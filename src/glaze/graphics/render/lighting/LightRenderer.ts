import { IRenderer } from "../RenderEngine";
import { Stage } from "../../displaylist/Stage";
import { Camera } from "../../displaylist/Camera";
import { Vector2 } from "../../../geom/Vector2";
import { AABB2 } from "../../../geom/AABB2";
import * as WebGLShaderUtils from "../util/WebGLShaderUtil";
import { ShaderWrapper } from "../util/ShaderWrapper";
import { BaseTexture } from "../../texture/BaseTexture";
import { SpriteTexture } from "../../texture/SpriteTexture";
import { Sprite } from "../../displaylist/Sprite";
import { Rectangle } from "../../../geom/Rectangle";
import { TileLayer } from "../tile/TileLayer";
import { LightGroup } from "./LightGroup";

import vertexShader from "./shaders/lighting.vert.glsl";
import fragmentShader from "./shaders/lighting.frag.glsl";
import ambientFragmentShader from "./shaders/ambientlighting.frag.glsl";
import { GZE } from "../../../GZE";

const BYTES_PER_QUAD = 8 * 4;
const LIGHTS_PER_SIZE = 100;
const LIGHT_SCALE_FACTOR = 4;

const fragmentShaderFactory = (shader, count, ratio) => {
    return shader.replace("${count}", count).replace("${ratio}", ratio);
};

export class LightRenderer implements IRenderer {
    public gl: WebGLRenderingContext;
    public stage: Stage;
    public camera: Camera;

    public projection: Vector2;

    public size: number;

    public indexBuffer: WebGLBuffer;
    public indices: Uint16Array;

    public dataBuffer: WebGLBuffer;
    public arrayBuffer: ArrayBuffer
    public data: Float32Array;
    public data8: Uint8ClampedArray;

    public quadVerts = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]);

    public resolution: Vector2;

    public surface: BaseTexture;
    public texture: SpriteTexture;
    public sprite: Sprite;

    public snapPosition: Vector2;

    public layer: TileLayer;

    private ranges: Array<number>;
    private lightGroups: Array<LightGroup>;
    private lightGroupsMap: Array<LightGroup>;

    private tileSize: number;
    private halfTileSize: number;
    
    private backgroundLight: number;

    private ext: any;
    constructor(ranges: Array<number>, layer: TileLayer) {
        this.ranges = ranges;
        this.renderSurface = this.renderSurface.bind(this);
        this.snapPosition = new Vector2(-1000, -1000);
        this.layer = layer;

        // Change this this to resize the light map resolution
        this.tileSize = GZE.tileSize / LIGHT_SCALE_FACTOR;

        this.halfTileSize = this.tileSize / 2;
        this.backgroundLight = 0.0;
    }

    public Init(gl: WebGLRenderingContext, camera: Camera) {
        this.gl = gl;

        this.camera = camera;
        this.projection = new Vector2();
        this.indexBuffer = gl.createBuffer();
        this.dataBuffer = gl.createBuffer();
        this.resolution = new Vector2();
        this.sprite = new Sprite();
        this.sprite.blendEquation = WebGLRenderingContext.FUNC_ADD;
        this.sprite.blendFuncS = WebGLRenderingContext.DST_COLOR;
        this.sprite.blendFuncD = WebGLRenderingContext.ZERO;
        this.sprite.id = "lightTexture";
        this.ResizeBatch(this.ranges.length * LIGHTS_PER_SIZE);
        this.lightGroups = this.ranges.map(
            range =>
                new LightGroup(
                    range,
                    range,
                    LIGHTS_PER_SIZE,
                    new ShaderWrapper(
                        gl,
                        WebGLShaderUtils.CompileProgram(
                            gl,
                            vertexShader,
                            fragmentShaderFactory(fragmentShader, range / this.tileSize, 1/LIGHT_SCALE_FACTOR)
                        )
                    )
                )
        );
        
        this.lightGroupsMap = new Array(this.ranges[this.ranges.length - 1]);
        this.ranges.forEach((range, i) => {
            this.lightGroupsMap[range] = this.lightGroups[i];
        });
        this.lightGroups.unshift(new LightGroup(
            GZE.resolution.x/2,
            GZE.resolution.y/2,
            5,
            new ShaderWrapper(
                gl,
                WebGLShaderUtils.CompileProgram(
                    gl,
                    vertexShader,
                    fragmentShaderFactory(ambientFragmentShader, 0, 1/LIGHT_SCALE_FACTOR)
                )
            )
        ));
    }

    public ResizeBatch(size: number) {
        this.size = size;

        this.arrayBuffer = new ArrayBuffer(this.size * BYTES_PER_QUAD);
        this.data = new Float32Array(this.arrayBuffer);
        this.data8 = new Uint8ClampedArray(this.arrayBuffer);

        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        this.gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, this.data, WebGLRenderingContext.DYNAMIC_DRAW);

        this.indices = new Uint16Array(this.size * 6);
        for (let i = 0; i < this.size; i++) {
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
        const expandedWidth = this.resolution.x = Math.floor(width / this.tileSize) + 2;
        const expandedHeight = this.resolution.y = Math.floor(height / this.tileSize) + 2;

        this.projection.x = (expandedWidth * this.tileSize) / 2;
        this.projection.y = (expandedHeight * this.tileSize) / 2;

        this.surface = new BaseTexture(this.gl, expandedWidth, expandedHeight);
        this.texture = new SpriteTexture(this.surface, new Rectangle(0, 0, expandedWidth, expandedHeight), new Vector2(0, 0));
        this.sprite.texture = this.texture;
        this.sprite.scale.setTo(this.tileSize, -this.tileSize);
        this.sprite.pivot.setTo(expandedWidth / 2, expandedHeight / 2);
    }

    public reset() {
        for (const lightGroup of this.lightGroups) {
            lightGroup.reset();
        }

        // Add for Ambient light
        // this.lightGroups[0].addLight(500,2500.5, 0, 0, 0, 0, 0, 0);
    }

    public addUnblockedLight(x: number, y: number, intensity: number, red: number, green: number, blue: number) {}

    public addBlockedLight(x: number, y: number, intensity: number, red: number, green: number, blue: number, arc: number, angle: number) {
        const group = this.lightGroupsMap[Math.round(intensity)];
        if (group) {
            group.addLight(x, y, intensity, red, green, blue, arc, angle);
        }
    }

    public processLightsBatch() {
        let lightCount = 0;
        
        // Add for Ambient light
        // const a = this.lightGroups[0].lights[0];
        // a.x = -this.camera.position.x + GZE.resolution.x/2;// + this.camera.viewportSize.y;
        // a.y = -this.camera.position.y + GZE.resolution.y/2;// + 100;

        for (const lightGroup of this.lightGroups) {

            const lightWidth = lightGroup.width + this.halfTileSize;
            const lightHeight = lightGroup.height + this.halfTileSize;
            const scaledUVWidth = lightGroup.width / this.tileSize;
            const scaledUVHeight = lightGroup.height / this.tileSize;
            
            for (let lightIndex = 0; lightIndex < lightGroup.activeLights; lightIndex++) {
                const light = lightGroup.lights[lightIndex];
                const index = lightCount * BYTES_PER_QUAD;
                let index8 = index * 4;

                let x = light.x;
                let y = light.y;
                x += Math.floor(this.camera.position.x / this.tileSize) * this.tileSize;
                y += Math.floor(this.camera.position.y / this.tileSize) * this.tileSize;
                x += this.tileSize * 2;
                y += this.tileSize * 2;

                // const colour = 0x10000000; //(light.red << 24) | (light.green << 16) | (light.blue << 8) | 0;
                // light.red = 255;
                // light.green = 0;
                // light.blue = 0;
                const angleX = Math.cos(light.angle);
                const angleY = Math.sin(light.angle);
                const arc = light.arc; // 1; // 1;

                //0 bl
                //Verts
                this.data[index + 0] = x + this.quadVerts[0] * lightWidth;
                this.data[index + 1] = y + this.quadVerts[1] * lightHeight;
                //UV
                this.data[index + 2] = this.quadVerts[0] * scaledUVWidth;
                this.data[index + 3] = this.quadVerts[1] * scaledUVHeight;
                //Colour
                //this.data[index + 4] = colour;
                this.data8[index8 + 16] = light.red;
                this.data8[index8 + 17] = light.green;
                this.data8[index8 + 18] = light.blue;
                this.data8[index8 + 19] = 1;
                //Cone
                this.data[index + 5] = angleX;
                this.data[index + 6] = angleY;
                this.data[index + 7] = arc;

                //1 br
                //Verts
                this.data[index + 8] = x + this.quadVerts[2] * lightWidth;
                this.data[index + 9] = y + this.quadVerts[3] * lightHeight;
                //UV
                this.data[index + 10] = this.quadVerts[2] * scaledUVWidth;
                this.data[index + 11] = this.quadVerts[3] * scaledUVHeight;
                //Colour
                //this.data[index + 12] = colour;
                this.data8[index8 + 48] = light.red;
                this.data8[index8 + 49] = light.green;
                this.data8[index8 + 50] = light.blue;
                this.data8[index8 + 51] = 1;
                //Cone
                this.data[index + 13] = angleX;
                this.data[index + 14] = angleY;
                this.data[index + 15] = arc;

                //2 tr
                //Verts
                this.data[index + 16] = x + this.quadVerts[4] * lightWidth;
                this.data[index + 17] = y + this.quadVerts[5] * lightHeight;
                //UV
                this.data[index + 18] = this.quadVerts[4] * scaledUVWidth;
                this.data[index + 19] = this.quadVerts[5] * scaledUVHeight;
                //Colour
                //this.data[index + 20] = colour;
                this.data8[index8 + 80] = light.red;
                this.data8[index8 + 81] = light.green;
                this.data8[index8 + 82] = light.blue;
                this.data8[index8 + 83] = 1;
                //Cone
                this.data[index + 21] = angleX;
                this.data[index + 22] = angleY;
                this.data[index + 23] = arc;

                //3
                //Verts
                this.data[index + 24] = x + this.quadVerts[6] * lightWidth;
                this.data[index + 25] = y + this.quadVerts[7] * lightHeight;
                //UV
                this.data[index + 26] = this.quadVerts[6] * scaledUVWidth;
                this.data[index + 27] = this.quadVerts[7] * scaledUVHeight;
                //Colour
                //this.data[index + 28] = colour;
                this.data8[index8 + 112] = light.red;
                this.data8[index8 + 113] = light.green;
                this.data8[index8 + 114] = light.blue;
                this.data8[index8 + 115] = 1;
                //Cone
                this.data[index + 29] = angleX;
                this.data[index + 30] = angleY;
                this.data[index + 31] = arc;

                lightCount++;
            }
        }
    }

    public calcSnap(cameraPos: Vector2) {
        this.snapPosition.x = Math.floor(cameraPos.x / this.tileSize) * this.tileSize;
        this.snapPosition.y = Math.floor(cameraPos.y / this.tileSize) * this.tileSize;
        this.snapPosition.x += this.tileSize;
        this.snapPosition.y += this.tileSize;
    }

    public Background(backgroundLight: number) {
        this.backgroundLight = backgroundLight;
    }

    public Render(clip: AABB2) {
        this.processLightsBatch();
        this.calcSnap(this.camera.position);

        // Temp background calc
        const percentDepth = this.camera.position.y / this.camera.worldExtentsAABB.height;
        this.Background(Math.abs(percentDepth));
        // End
        
        this.sprite.position.copy(this.camera.halfViewportSize);
        this.sprite.position.minusEquals(this.snapPosition);
        this.surface.drawTo(this.renderSurface);
    }

    private renderSurface() {        
         this.gl.clearColor(1-this.backgroundLight,1-this.backgroundLight,1-this.backgroundLight, 1.0);
        this.gl.colorMask(true, true, true, true);
        this.gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);

        this.gl.blendEquation(WebGLRenderingContext.FUNC_ADD);
        // SRC_ALPHA ONE https://stackoverflow.com/questions/393785/how-to-setup-blending-for-additive-color-overlays
        // 	Blend OneMinusDstColor One https://github.com/SSS135/Light2D/blob/master/Assets/Light2D/Resources/Shaders/Light60.shader
        this.gl.blendFunc(WebGLRenderingContext.ONE_MINUS_DST_COLOR, WebGLRenderingContext.ONE); // SRC_ALPHA ONE?
        // Source = from shader
        // Dest = target framebuffer

        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.dataBuffer);
        this.gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER,this.data,WebGLRenderingContext.DYNAMIC_DRAW);
        // this.gl.bufferSubData(WebGLRenderingContext.ARRAY_BUFFER, 0, this.data);

        this.gl.activeTexture(WebGLRenderingContext.TEXTURE0);
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.layer.tileDataTexture);

        let startPosition = 0;
        for (const lightGroup of this.lightGroups) {
            if (lightGroup.activeLights == 0) {
                continue;
            }
            this.gl.useProgram(lightGroup.lightingShader.program);

            this.gl.uniform2f(lightGroup.lightingShader.uniform.projectionVector, this.projection.x, this.projection.y);
            this.gl.uniform2f(lightGroup.lightingShader.uniform.resolution, this.resolution.x, this.resolution.y);
            this.gl.uniform2f(
                lightGroup.lightingShader.uniform.viewOffset,
                this.snapPosition.x / this.tileSize,
                this.snapPosition.y / this.tileSize
            );
            this.gl.uniform2fv(
                lightGroup.lightingShader.uniform.inverseTileTextureSize,
                this.layer.inverseTileDataTextureSize
            );
            this.gl.uniform4f(
                lightGroup.lightingShader.uniform.ambientLight,
                1-this.backgroundLight,1-this.backgroundLight,1-this.backgroundLight, 1
            );

            this.gl.enableVertexAttribArray(lightGroup.lightingShader.attribute.aVertexPosition);
            this.gl.enableVertexAttribArray(lightGroup.lightingShader.attribute.aTextureCoord);
            this.gl.enableVertexAttribArray(lightGroup.lightingShader.attribute.aColor);

            this.gl.vertexAttribPointer(
                lightGroup.lightingShader.attribute.aVertexPosition,
                2,
                WebGLRenderingContext.FLOAT,
                false,
                32,
                0
            );
            this.gl.vertexAttribPointer(
                lightGroup.lightingShader.attribute.aTextureCoord,
                2,
                WebGLRenderingContext.FLOAT,
                false,
                32,
                8
            );
            this.gl.vertexAttribPointer(
                lightGroup.lightingShader.attribute.aColor,
                4,
                WebGLRenderingContext.UNSIGNED_BYTE,
                true,
                32,
                16
            );
            this.gl.vertexAttribPointer(
                lightGroup.lightingShader.attribute.aArc,
                3,
                WebGLRenderingContext.FLOAT,
                false,
                32,
                20
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
}
