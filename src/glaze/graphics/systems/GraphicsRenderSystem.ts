import { System } from "../../ecs/System";
import { Position } from "../../core/components/Position";
import { Graphics } from "../components/Graphics";
import { Entity } from "../../ecs/Entity";
import { Stage } from "../displaylist/Stage";
import { Camera } from "../displaylist/Camera";
import { RendererEngine } from "../render/RenderEngine";
import { AABB2 } from "../../geom/AABB2";
import { TextureManager } from "../texture/TextureManager";
import { DisplayObjectContainer } from "../displaylist/DisplayObjectContainer";
import { Vector2 } from "../../geom/Vector2";
import { FrameListManager } from "../frame/FrameListManager";
import { Sprite } from "../displaylist/Sprite";

export class GraphicsRenderSystem extends System {
    private canvas: HTMLCanvasElement;
    public stage: Stage;
    public renderer: RendererEngine;
    public camera: Camera;
    public textureManager: TextureManager;
    public itemContainer: DisplayObjectContainer;
    public frameListManager: FrameListManager;
    private _cameraTarget: Vector2;

    constructor(canvas: HTMLCanvasElement, camera:Camera, screenDimension:Vector2) {
        super([Position, Graphics]);
        this.canvas = canvas;
        this.stage = new Stage();
        this.camera = camera;
        this.stage.addChild(this.camera);
        this.renderer = new RendererEngine(this.stage, this.camera, this.canvas, screenDimension.x, screenDimension.y);
        this.camera.Resize(this.renderer.width, this.renderer.height);
        this.textureManager = new TextureManager(this.renderer.gl);
        this.frameListManager = new FrameListManager(this.textureManager);

        this.itemContainer = new DisplayObjectContainer();
        this.itemContainer.id = "itemContainer";
        this.camera.addChild(this.itemContainer);    }

    initalize() {
    }

    onEntityAdded(entity: Entity, position: Position, graphics: Graphics) {
        if (graphics.sprite == null) {
            graphics.sprite = new Sprite();
            graphics.frameList = this.frameListManager.getFrameList(graphics.frameListId);
            if (graphics.initialFrameId != null) {
                graphics.setFrame(graphics.frameList.getFrame(graphics.initialFrameId));
            } else {
                graphics.setFrame(graphics.frameList.frames[0]);
            }
            graphics.sprite.position = position.coords;
        }
        this.itemContainer.addChild(graphics.sprite);
    }

    onEntityRemoved(entity: Entity, position: Position, graphics: Graphics) {
        this.itemContainer.removeChild(graphics.sprite);
    }

    updateSystem() {
        this.camera.Focus(this._cameraTarget.x, this._cameraTarget.y);
        this.renderer.Render(this.camera.viewPortAABB);
    }

    set cameraTarget(target: Vector2) {
        this._cameraTarget = target;
    }
}
