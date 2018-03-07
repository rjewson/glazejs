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
import { DebugGraphics } from "../components/DebugGraphics";
import { Extents } from "../../core/components/Extents";
import { DebugRenderer } from "../render/debug/DebugRenderer";

export class DebugRenderSystem extends System {
    public debugRender: DebugRenderer;
    public canvas: HTMLCanvasElement;
    public camera: Camera;

    constructor(canvas: HTMLCanvasElement, camera: Camera) {
        super([Position, Extents, DebugGraphics]);
        this.canvas = canvas;
        this.camera = camera;
        this.debugRender = new DebugRenderer(canvas, camera, 1280, 768);
    }

    public preUpdate() {
        this.debugRender.Clear();
    }

    updateEntity(entity: Entity, position: Position, extents: Extents, graphics: DebugGraphics) {
        this.debugRender.DrawCross(position.coords.x, position.coords.y, 15);
    }
}
