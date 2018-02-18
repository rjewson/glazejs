import { System } from "../../ecs/System";
import { Position } from "../../core/components/Position";
import { Graphics } from "../components/Graphics";
import { GraphicsAnimation } from "../components/GraphicsAnimation";
import { FrameListManager } from "../frame/FrameListManager";
import { Entity } from "../../ecs/Entity";
import { AnimationController } from "../animation/AnimationController";

export class AnimationSystem extends System {
    private frameListManager: FrameListManager;
    constructor(frameListManager: FrameListManager) {
        super([Position, Graphics, GraphicsAnimation]);
        this.frameListManager = frameListManager;
    }
    onEntityAdded(entity: Entity, position: Position, graphics: Graphics, animation: GraphicsAnimation) {
        const newAnimation = this.frameListManager
            .getFrameList(animation.frameListId)
            .getAnimation(animation.animationId);
        animation.animationController = new AnimationController(newAnimation);
    }

    updateEntity(entity: Entity, dt: number, position: Position, graphics: Graphics, animation: GraphicsAnimation) {
        animation.animationController
            .update(dt)
            .updateSprite(graphics.sprite, position.direction.x, position.direction.y);
    }
}
