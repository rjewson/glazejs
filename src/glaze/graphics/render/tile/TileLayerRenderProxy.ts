import { IRenderer } from "../RenderEngine";
import { BaseTexture } from "../../texture/BaseTexture";
import { Texture } from "../../texture/Texture";
import { Sprite } from "../../displaylist/Sprite";
import { Vector2 } from "../../../geom/Vector2";
import { Camera } from "../../displaylist/Camera";
import { TileMap } from "./TileMap";
import { Rectangle } from "../../../geom/Rectangle";
import { AABB2 } from "../../../geom/AABB2";

//TODO: Get rid of this class eventually
//Its only to be able to split the tilemap renderer in the short term

export class TileLayerRenderProxy implements IRenderer {
    public tileMap: TileMap;
    public layers: Array<number>;

    public surface: BaseTexture;
    public texture: Texture;
    public sprite: Sprite;

    public lastSnap: Vector2;
    public thisSnap: Vector2;
    public snapChanged: boolean;

    public size: Vector2;

    constructor(tileMap: TileMap, layers: Array<number>) {
        this.tileMap = tileMap;
        this.layers = layers;

        this.lastSnap = new Vector2(0, 0);
        this.thisSnap = new Vector2(-1000, -1000);
        this.snapChanged = false;

        this.size = new Vector2();
        this.renderSurface = this.renderSurface.bind(this);
    }

    public Init(gl: WebGLRenderingContext, camera: Camera) {
        this.sprite = new Sprite();
        this.sprite.id = "renderTexture";
    }

    public Resize(width: number, height: number) {
        this.size.setTo(width, height);
        this.surface = new BaseTexture(this.tileMap.gl, width, height);
        this.texture = new Texture(this.surface, new Rectangle(0, 0, width, height), new Vector2(0, 0));
        this.sprite.texture = this.texture;
        this.sprite.scale.setTo(2, -2);
        this.sprite.pivot.setTo(width / 2, height / 2);
    }

    public calcSnap(cameraPos: Vector2): boolean {
        this.lastSnap.copy(this.thisSnap);

        this.thisSnap.x = (Math.floor(cameraPos.x / -16) - 1) * 16;
        // thisSnap.x*=16;
        // thisSnap.x-=16;
        this.thisSnap.y = (Math.floor(cameraPos.y / -16) - 1) * 16;
        // thisSnap.y*=16;
        // thisSnap.y-=16;

        this.snapChanged = this.lastSnap.x != this.thisSnap.x || this.lastSnap.y != this.thisSnap.y;

        return this.snapChanged;
    }

    public Render(clip: AABB2) {
        // if (calcSnap(tileMap.camera.position)) {
        this.calcSnap(this.tileMap.camera.position);
        this.sprite.position.copy(this.size);
        this.sprite.position.plusEquals(this.thisSnap);
        // sprite.position.setTo(416+thisSnap.x,336+thisSnap.y);
        this.surface.drawTo(this.renderSurface);
        // }
    }

    public renderSurface() {
        this.tileMap.RenderLayers(this);
    }
}
