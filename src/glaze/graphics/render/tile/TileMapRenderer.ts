import { IRenderer } from "../RenderEngine";
import { Vector2 } from "../../../geom/Vector2";
import { Texture } from "../../texture/Texture";
import { TileLayer } from "./TileLayer";
import { TileLayerRenderProxy } from "./TileLayerRenderProxy";
import { ShaderWrapper } from "../util/ShaderWrapper";
import { Camera } from "../../displaylist/Camera";
import { TypedArray2D } from "../../../ds/TypedArray2D";
import * as WebGLShaderUtils from "../util/WebGLShaderUtil";
import { BaseTexture } from "../../texture/BaseTexture";
import { AABB2 } from "../../../geom/AABB2";

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

    public writebuffer2: TypedArray2D;

    public flip: boolean;

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

        var quadVerts = new Float32Array([
            -1,
            -1,
            0,
            1,
            1,
            -1,
            1,
            1,
            1,
            1,
            1,
            0,

            -1,
            -1,
            0,
            1,
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
        this.tilemapShader = new ShaderWrapper(
            gl,
            WebGLShaderUtils.CompileProgram(gl, TileMapRenderer.TILEMAP_VERTEX_SHADER, TileMapRenderer.TILEMAP_FRAGMENT_SHADER),
        );

        this.flip = false;

        this.writebuffer2 = new TypedArray2D(3, 3); //Max 3x3 tileset changes

        this.renderLayers.forEach(renderLayer => renderLayer.Init(gl, camera));
    }

    public Resize(width: number, height: number) {
        var expandedWidth: number = (Math.floor(width / (this.tileSize * this.tileScale)) + 2) * this.tileSize;
        var expandedHeight: number = (Math.floor(height / (this.tileSize * this.tileScale)) + 2) * this.tileSize;

        this.viewportSize.x = expandedWidth * this.tileScale;
        this.viewportSize.y = expandedHeight * this.tileScale;
        this.scaledViewportSize[0] = this.viewportSize.x / this.tileScale;
        this.scaledViewportSize[1] = this.viewportSize.y / this.tileScale;
        this.renderLayers.forEach(renderLayer =>
            renderLayer.Resize(Math.floor(expandedWidth), Math.floor(expandedHeight)),
        );
    }

    // public  TileScale(scale:Float) {
    //     this.tileScale = scale;
    //     scaledViewportSize[0] = viewportSize.x/scale;
    //     scaledViewportSize[1] = viewportSize.y/scale;
    // }

    public SetSpriteSheet(image: HTMLImageElement) {
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, this.spriteSheet);
        this.gl.pixelStorei(WebGLRenderingContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
        // gl.texParameteri(WebGLRenderingContext.TEXTURE_2D,WebGLRenderingContext.TEXTURE_MAG_FILTER,WebGLRenderingContext.NEAREST);
        // gl.texParameteri(WebGLRenderingContext.TEXTURE_2D,WebGLRenderingContext.TEXTURE_MIN_FILTER,WebGLRenderingContext.NEAREST);
        this.gl.texImage2D(
            WebGLRenderingContext.TEXTURE_2D,
            0,
            WebGLRenderingContext.RGBA,
            WebGLRenderingContext.RGBA,
            WebGLRenderingContext.UNSIGNED_BYTE,
            image,
        );
        if (!this.filtered) {
            this.gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_MAG_FILTER,
                WebGLRenderingContext.NEAREST,
            );
            this.gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_MIN_FILTER,
                WebGLRenderingContext.NEAREST,
            );
        } else {
            this.gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_MAG_FILTER,
                WebGLRenderingContext.LINEAR,
            );
            this.gl.texParameteri(
                WebGLRenderingContext.TEXTURE_2D,
                WebGLRenderingContext.TEXTURE_MIN_FILTER,
                WebGLRenderingContext.LINEAR,
            ); // Worth it to mipmap here?
        }
        this.inverseSpriteTextureSize[0] = 1 / image.width;
        this.inverseSpriteTextureSize[1] = 1 / image.height;
    }

    public SetTileLayer(image: HTMLImageElement, layerId: String, scrollScaleX: number, scrollScaleY: number) {
        var layer = new TileLayer();
        layer.setTexture(this.gl, image, false);
        layer.scrollScale.x = scrollScaleX;
        layer.scrollScale.y = scrollScaleY;
        this.layers.push(layer);
    }

    public SetTileLayerFromData(
        data: TypedArray2D,
        sprite: BaseTexture,
        layerId: string,
        scrollScaleX: number,
        scrollScaleY: number,
    ) {
        var layer = new TileLayer();
        layer.setTextureFromMap(this.gl, data);
        layer.setSpriteTexture(sprite);
        layer.scrollScale.x = scrollScaleX;
        layer.scrollScale.y = scrollScaleY;
        this.layers.push(layer);
        this.layersMap.set(layerId, layer);
    }

    public SetTileRenderLayer(id:string, layers: Array<string>) {
        var tileRenderLayer = new TileLayerRenderProxy(this, layers);
        this.renderLayers.push(tileRenderLayer);
        this.renderLayersMap.set(id,tileRenderLayer);
    }

    public updateMap(x: number, y: number, data: Array<number>) {

        var startX = data[0];
        var startY = data[1];
        var width = data[2];
        var height = data[3];
        var centerX = data[4];
        var centerY = data[5];
        var superY = Math.floor(data[6] / 8);
        var superX = data[6] % 8;

        this.writebuffer2.h = height;
        this.writebuffer2.w = width;

        for (var ypos = 0; ypos < height; ypos++) {
            // for (ypos in 0...height) {
            // for (xpos in 0...width) {
            for (var xpos = 0; xpos < width; xpos++) {
                var _x = startX + xpos;
                var _y = startY + ypos;
                var value = (superY << 24) | (superX << 16) | (_y << 8) | _x;
                this.writebuffer2.set(xpos, ypos, value);
            }
        }

        var writeLayer = this.layers[2].tileDataTexture;
        this.gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, writeLayer);
        this.gl.texSubImage2D(
            WebGLRenderingContext.TEXTURE_2D,
            0,
            x - centerX,
            y - centerY,
            width,
            height,
            WebGLRenderingContext.RGBA,
            WebGLRenderingContext.UNSIGNED_BYTE,
            this.writebuffer2.data8,
        );
    }

    public Render(clip: AABB2) {
        this.renderLayers.forEach(renderLayer => renderLayer.Render(clip));
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
            0,
        );
        this.gl.vertexAttribPointer(this.tilemapShader.attribute.texture, 2, WebGLRenderingContext.FLOAT, false, 16, 8);

        this.gl.uniform2fv(this.tilemapShader.uniform.viewportSize, this.scaledViewportSize);
        this.gl.uniform1f(this.tilemapShader.uniform.tileSize, this.tileSize);
        this.gl.uniform1f(this.tilemapShader.uniform.inverseTileSize, 1 / this.tileSize);

        this.gl.uniform1i(this.tilemapShader.uniform.sprites, 0);
        this.gl.uniform1i(this.tilemapShader.uniform.tiles, 1);

        // for (i in renderLayer.layers) {
        for (var i = 0; i < renderLayer.layers.length; i++) {
            // var layer = this.layers[i];
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

    /*

    256*8=2048

    8x8 supertiles = 64 supertiles

    of 

    16*16 8*8 pixel tiles = 256 tiles

    total = 64 * 256 = 16k tiles

p.y = index % 8;
p.x = Math.floor(index / 8);

    */

    static TILEMAP_VERTEX_SHADER: string = `
        precision mediump float;
        attribute vec2 position;
        attribute vec2 texture;

        varying vec2 pixelCoord;
        varying vec2 texCoord;

        uniform vec2 viewOffset;
        uniform vec2 viewportSize;
        uniform vec2 inverseTileTextureSize;
        uniform float inverseTileSize;

        void main(void) {
           pixelCoord = (texture * viewportSize) + viewOffset;
           texCoord = pixelCoord * inverseTileTextureSize * inverseTileSize;
           gl_Position = vec4(position, 0.0, 1.0);
        }`;

    static TILEMAP_FRAGMENT_SHADER: string = `
        precision mediump float;

        varying vec2 pixelCoord;
        varying vec2 texCoord;

        uniform sampler2D tiles;
        uniform sampler2D sprites;

        uniform vec2 inverseTileTextureSize;
        uniform vec2 inverseSpriteTextureSize;
        uniform float tileSize;

        void main(void) {
           vec4 tile = texture2D(tiles, texCoord);
            // if(tile.x == 1.0 && tile.y == 1.0) { discard; }
            if (tile.x == 1.0 && tile.y == 1.0) { 
                discard;
                // gl_FragColor = vec4(0.0,0.0,0.0,0.0);
            } else {
                vec2 superSpriteOffset = floor(tile.zw * 256.0) * 256.0;
                vec2 spriteOffset = floor(tile.xy * 256.0) * tileSize;
                vec2 spriteCoord = mod(pixelCoord, tileSize);

                //Works
                //    spriteCoord.x = (-1.0+(2.0* 0.0)) * (( 0.0*tileSize) - spriteCoord.x); //normal  0
                //    spriteCoord.x = (-1.0+(2.0* 1.0)) * (( 1.0*tileSize) - spriteCoord.x); //flip   1

                gl_FragColor = texture2D(sprites, (superSpriteOffset + spriteOffset + spriteCoord) * inverseSpriteTextureSize);
            }
        }`;
}
