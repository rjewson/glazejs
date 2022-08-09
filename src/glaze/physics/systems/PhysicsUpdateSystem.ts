import { System } from "../../ecs/System";
import { Vector2 } from "../../geom/Vector2";
import { Position } from "../../core/components/Position";
import { PhysicsBody } from "../components/PhysicsBody";
import { Active } from "../../core/components/Active";
import { Entity } from "../../ecs/Entity";

export class PhysicsUpdateSystem extends System {
    public globalForce: Vector2;
    public globalDamping: number;

    constructor() {
        super([Position, PhysicsBody, Active]);
        this.globalForce = new Vector2(0, 30);
        this.globalDamping = 0.99;
    }

    onEntityAdded(entity: Entity, position: Position, physicsBody: PhysicsBody, active: Active) {
        physicsBody.body.position.copy(position.coords);
    }

    updateEntity(entity: Entity, position: Position, physicsBody: PhysicsBody, active: Active) {
        physicsBody.body.update(this.dt / 1000, this.globalForce, this.globalDamping);

        // If the body is moving in the X direction, update the direction vector
        // to match the direction of the velocity.
        // Note that if the X velocity is zero, the direction will remain unchanged.
        if (physicsBody.body.velocity.x > 0) {
            position.direction.x = 1
        } else if (physicsBody.body.velocity.x < 0) {
            position.direction.x = -1
        }
    }
}
