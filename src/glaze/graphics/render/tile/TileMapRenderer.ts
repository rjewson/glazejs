import { IRenderer } from "../RenderEngine";
import { Vector2 } from "../../../geom/Vector2";
import { TileLayer } from "./TileLayer";
import { TileLayerRenderProxy } from "./TileLayerRenderProxy";
import { ShaderWrapper } from "../util/ShaderWrapper";
import { Camera } from "../../displaylist/Camera";
import { TypedArray2D } from "../../../ds/TypedArray2D";
import * as WebGLShaderUtils from "../util/WebGLShaderUtil";
import { BaseTexture } from "../../texture/BaseTexture";
import { AABB2 } from "../../../geom/AABB2";

import vertexShader from "./shaders/tileMap.vert.glsl";
import fragmentShader from "./shaders/tileMap.frag.glsl";

export class TileMapRenderer implements IRenderer {
    public gl: WebGLRenderingContext;
    public viewportSize: Vector2;
    public scaledViewportSize: Float32Array;
    public inverseTileTextureSize: Float32Array;
    public inverseSpriteTextureSize: Float32Array;

    public tileScale: number;
    public tileSize: number;
    public filtered: boolean;

    public spriteSheet: WebGLTexture;

    public quadVertBuffer: WebGLBuffer;

    public layers: Array<TileLayer>;
    public layersMap: Map<string, TileLayer>;

    public renderLayers: Array<TileLayerRenderProxy>;
    public renderLayersMap: Map<string, TileLayerRenderProxy>;

    public tilemapShader: ShaderWrapper;

    public camera: Camera;

    constructor(tileSize: number, tileScale: number) {
        this.tileSize = tileSize;
        this.tileScale = tileScale;
        this.layers = new Array<TileLayer>();
        this.layersMap = new Map();
        this.renderLayers = new Array();
        this.renderLayersMap = new Map();
    }

    public Init(gl: WebGLRenderingContext, camera: Camera) {
        if (this.gl != null) return;
        this.gl = gl;
        this.camera = camera;
        //tileScale = 1.0;

        this.filtered = false;
        this.spriteSheet = this.gl.createTexture();

        this.viewportSize = new Vector2();
        this.scaledViewportSize = new Float32Array(2);
        this.inverseTileTextureSize = new Float32Array(2);
        this.inverseSpriteTextureSize = new Float32Array(2);

        this.quadVertBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.quadVertBuffer);

        // Tri
        // BL BR TR   BL TR TL
        // UV
        //
        //  Quad verts and UVs.  UV maps from TL 0,0 to BR 1,1
        //  Used to interpolate the coord of the fragment
        var quadVerts = new Float32Array([
            // 1
            // V BL
            -1,
            -1,
            // T TM
            0,
            1,
            // V BR
            1,
            -1,
            // T TR
            1,
            1,
            // V TR
            1,
            1,
            // T MR
            1,
            0,

            // 2
            // BR
            -1,
            -1,

            0,
            1,

            // TR
            1,
            1,

            1,
            0,

            -1,
            1,

            0,
            0,
        ]);

        gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, quadVerts, WebGLRenderingContext.STATIC_DRAW);
        this.tilemapShader = new ShaderWrapper(gl, WebGLShaderUtils.CompileProgram(gl, vertexShader, fragmentShader));

        this.renderLayers.forEach((renderLayer) => renderLayer.Init(gl, camera));
    }

    public Resize(width: number, height: number) {
        var expandedWidth: number = (Math.floor(width / (this.tileSize * this.tileScale)) + 2) * this.tileSize;
        var expandedHeight: number = (Math.floor(height / (this.tileSize * this.tileScale)) + 2) * this.tileSize;

        this.viewportSize.x = expandedWidth * this.tileScale;
        this.viewportSize.y = expandedHeight * this.tileScale;
        this.scaledViewportSize[0] = this.viewportSize.x / this.tileScale;
        this.scaledViewportSize[1] = this.viewportSize.y / this.tileScale;
        this.renderLayers.forEach((renderLayer) =>
            renderLayer.Resize(Math.floor(expandedWidth), Math.floor(expandedHeight))
        );
    }

    public SetTileLayer(image: HTMLImageElement, layerId: String, scrollScaleX: number, scrollScaleY: number) {
        var layer = new TileLayer(this.gl);
        layer.setTexture(image, false);
        layer.scrollScale.x = scrollScaleX;
        layer.scrollScale.y = scrollScaleY;
        this.layers.push(layer);
    }

    public SetTileLayerFromData(
        data: TypedArray2D,
        sprite: BaseTexture,
        layerId: string,
        scrollScaleX: number,
        scrollScaleY: number
    ): TileLayer {
        var layer = new TileLayer(this.gl);
        layer.setTextureFromMap(data.data8, data.w, data.h);
        layer.setSpriteTexture(sprite);
        layer.scrollScale.x = scrollScaleX;
        layer.scrollScale.y = scrollScaleY;
        this.layers.push(layer);
        this.layersMap.set(layerId, layer);
        return layer;
    }

    public SetTileRenderLayer(id: string, layers: Array<string>) {
        var tileRenderLayer = new TileLayerRenderProxy(this, layers);
        this.renderLayers.push(tileRenderLayer);
        this.renderLayersMap.set(id, tileRenderLayer);
    }

    public Render(clip: AABB2) {
        for (const renderLayer of this.renderLayers) {
            renderLayer.Render(clip);
        }
    }

    public RenderLayers(renderLayer: TileLayerRenderProxy) {
        this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
        this.gl.colorMask(true, true, true, true);
        this.gl.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);

        this.gl.useProgram(this.tilemapShader.program);

        this.gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, this.quadVertBuffer);

        this.gl.enableVertexAttribArray(this.tilemapShader.attribute.position);
        this.gl.enableVertexAttribArray(this.tilemapShader.attribute.texture);
        this.gl.vertexAttribPointer(
            this.tilemapShader.attribute.position,
            2,
            WebGLRenderingContext.FLOAT,
            false,
            16,
            0
        );
        this.gl.vertexAttribPointer(this.tilemapShader.attribute.texture, 2, WebGLRenderingContext.FLOAT, false, 16, 8);

        this.gl.uniform2fv(this.tilemapShader.uniform.viewportSize, this.scaledViewportSize);
        this.gl.uniform1f(this.tilemapShader.uniform.tileSize, this.tileSize);
        this.gl.uniform1f(this.tilemapShader.uniform.inverseTileSize, 1 / this.tileSize);

        this.gl.uniform1i(this.tilemapShader.uniform.sprites, 0);
        this.gl.uniform1i(this.tilemapShader.uniform.tiles, 1);

        for (var i = 0; i < renderLayer.layers.length; i++) {
            const layer = this.layersMap.get(renderLayer.layers[i]);
            const pX = renderLayer.thisSnap.x / 2;
            const pY = renderLayer.thisSnap.y / 2;

            this.gl.uniform2f(this.tilemapShader.uniform.viewOffset, pX, pY);
            this.gl.uniform2fv(this.tilemapShader.uniform.inverseSpriteTextureSize, layer.inverseSpriteTextureSize);
            this.gl.uniform2fv(this.tilemapShader.uniform.inverseTileTextureSize, layer.inverseTileDataTextureSize);

            this.gl.activeTexture(WebGLRenderingContext.TEXTURE0);
            this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, layer.spriteTexture);

            this.gl.activeTexture(WebGLRenderingContext.TEXTURE1);
            this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, layer.tileDataTexture);

            this.gl.drawArrays(WebGLRenderingContext.TRIANGLES, 0, 6);
        }
        this.gl.colorMask(true, true, true, false);
    }
}
