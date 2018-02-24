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
    onEntityAdded(entity: Entity, position: Position, graphics: Graphics, graphicsAnimation: GraphicsAnimation) {
        const newAnimation = this.frameListManager
            .getFrameList(graphicsAnimation.frameListId)
            .getAnimation(graphicsAnimation.animationId);
        graphicsAnimation.dirty = false;
        graphicsAnimation.animationController = new AnimationController(newAnimation);
    }

    updateEntity(entity: Entity, position: Position, graphics: Graphics, graphicsAnimation: GraphicsAnimation) {
        if (graphicsAnimation.dirty) this.playAnimation(graphicsAnimation);
        graphicsAnimation.animationController
            .update(this.dt)
            .updateSprite(graphics.sprite, position.direction.x, position.direction.y);
    }

    playAnimation(graphicsAnimation: GraphicsAnimation) {
        graphicsAnimation.dirty = false;
        const animation = this.frameListManager
            .getFrameList(graphicsAnimation.frameListId)
            .getAnimation(graphicsAnimation.animationId);
        graphicsAnimation.animationController.play(animation);
    }
}
