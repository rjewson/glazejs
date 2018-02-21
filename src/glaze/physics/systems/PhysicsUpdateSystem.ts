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
        this.globalForce = new Vector2(0, 10);
        this.globalDamping = 0.99;
    }

    onEntityAdded(entity: Entity, position: Position, physicsBody: PhysicsBody, active: Active) {
        physicsBody.body.position.copy(position.coords);
    }

    updateEntity(entity: Entity, position: Position, physicsBody: PhysicsBody, active: Active) {
        physicsBody.body.update(this.dt / 1000, this.globalForce, this.globalDamping);
        position.direction.x = physicsBody.body.velocity.x > 0 ? 1 : -1;
    }
}
