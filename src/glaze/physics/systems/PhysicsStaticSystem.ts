import { System } from "../../ecs/System";
import { IBroadphase } from "../collision/broadphase/IBroadphase";
import { Extents } from "../../core/components/Extents";
import { Position } from "../../core/components/Position";
import { PhysicsCollision } from "../components/PhysicsCollision";
import { Fixed } from "../../core/components/Fixed";
import { Entity } from "../../ecs/Entity";

export class PhysicsStaticSystem extends System {
    public broadphase: IBroadphase;

    constructor(broadphase: IBroadphase) {
        super([Position, Extents, PhysicsCollision, Fixed]);
        this.broadphase = broadphase;
    }

    onEntityAdded(
        entity: Entity,
        position: Position,
        extents: Extents,
        physicsCollision: PhysicsCollision,
        fixed: Fixed,
    ) {
        // position.updatePosition = setPosition;

        physicsCollision.proxy.aabb.extents.copy(extents.halfWidths);
        physicsCollision.proxy.entity = entity;
        physicsCollision.proxy.isStatic = true;
        physicsCollision.proxy.aabb.position = position.coords; //Because its not linked to a body

        this.broadphase.addProxy(physicsCollision.proxy);
    }

    onEntityRemoved(
        entity: Entity,
        position: Position,
        extents: Extents,
        physicsCollision: PhysicsCollision,
        fixed: Fixed,
    ) {
        this.broadphase.removeProxy(physicsCollision.proxy);
    }

    updateSystem(dt: number) {}

    // public function setPosition(entity:Entity,position:Vector2) {
    //     var bfp = entity.getComponent(PhysicsCollision).proxy;
    //     broadphase.removeProxy(bfp);
    //     bfp.aabb.position = entity.getComponent(Position).coords;
    //     broadphase.addProxy(bfp);
    // }
}
