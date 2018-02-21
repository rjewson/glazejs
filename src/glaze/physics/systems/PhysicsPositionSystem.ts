import { System } from "../../ecs/System";
import { Position } from "../../core/components/Position";
import { PhysicsBody } from "../components/PhysicsBody";
import { Entity } from "../../ecs/Entity";

export class PhysicsPositionSystem extends System {
    constructor() {
        super([Position, PhysicsBody]);
    }

    updateEntity(entity: Entity, position: Position, physicsBody: PhysicsBody) {
        physicsBody.body.updatePosition();
        position.update(physicsBody.body.position);
    }
}
