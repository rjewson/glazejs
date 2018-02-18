import { BaseTexture } from "./BaseTexture";
import { Texture } from "./Texture";
import { Rectangle } from "../../geom/Rectangle";
import { Vector2 } from "../../geom/Vector2";

export interface TexturePackerFrame {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface TexturePackerItem {
    frame: TexturePackerFrame;
    rotated: boolean;
    trimmed: boolean;
    spriteSourceSize: TexturePackerFrame;
    sourceSize: any; //{"w":15,"h":11}
    pivot: any; //{"x":0.5,"y":0.5}
}

export class TextureManager {
    public baseTextures: Map<String, BaseTexture>;
    public textures: Map<String, Texture>;
    public total: number;
    public gl: WebGLRenderingContext;

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
        this.baseTextures = new Map();
        this.textures = new Map();
    }

    public AddTexture(id: String, image: ImageData): BaseTexture {
        var baseTexture = BaseTexture.FromImage(this.gl, image);
        // baseTexture.RegisterTexture();
        this.baseTextures.set(id, baseTexture);
        return baseTexture;
    }

    public ParseTexturePackerJSON(textureConfig: any, id: String) {
        if (!(typeof textureConfig === "string")) {
            return;
        }

        var baseTexture = this.baseTextures.get(id);

        var textureData = JSON.parse(textureConfig);

        //var fields = Reflect.fields(textureData.frames);
        Object.keys(textureData.frames).forEach(prop => {
            // for (let prop:any in textureData.frames) {

            var frame = textureData.frames[prop]; // Reflect.field(textureData.frames, prop);

            this.textures.set(
                prop,
                new Texture(
                    baseTexture,
                    new Rectangle(frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h),
                    new Vector2(frame.pivot.x, frame.pivot.y),
                ),
            );
        });
    }

    public ParseTexturesFromTiles(tileSize: number, id: String) {}
}
