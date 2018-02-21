import { IBroadphase } from "../collision/broadphase/IBroadphase";
import { PhysicsCollision } from "../components/PhysicsCollision";
import { PhysicsBody } from "../components/PhysicsBody";
import { Moveable } from "../../core/components/Moveable";
import { Entity } from "../../ecs/Entity";
import { System } from "../../ecs/System";

export class PhysicsCollisionSystem extends System {
    public broadphase: IBroadphase;

    constructor(broadphase: IBroadphase) {
        super([PhysicsCollision, PhysicsBody, Moveable]);
        this.broadphase = broadphase;
    }

    onEntityAdded(entity: Entity, physicsCollision: PhysicsCollision, physicsBody: PhysicsBody, moveable: Moveable) {
        //All this really does is add the body to the proxy and run the physics
        physicsCollision.proxy.setBody(physicsBody.body);
    }

    updateAllEntities() {
        this.broadphase.collide();
    }
}
