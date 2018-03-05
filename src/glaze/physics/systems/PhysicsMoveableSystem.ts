import { IBroadphase } from "../collision/broadphase/IBroadphase";
import { Position } from "../../core/components/Position";
import { Extents } from "../../core/components/Extents";
import { PhysicsCollision } from "../components/PhysicsCollision";
import { Moveable } from "../../core/components/Moveable";
import { Entity } from "../../ecs/Entity";
import { System } from "../../ecs/System";

export class PhysicsMoveableSystem extends System {
    public broadphase: IBroadphase;

    constructor(broadphase: IBroadphase) {
        super([Position, Extents, PhysicsCollision, Moveable]);
        this.broadphase = broadphase;
    }

    onEntityAdded(
        entity: Entity,
        position: Position,
        extents: Extents,
        physicsCollision: PhysicsCollision,
        moveable: Moveable,
    ) {
        physicsCollision.proxy.aabb.extents.copy(extents.halfWidths);
        physicsCollision.proxy.isStatic = false;
        physicsCollision.proxy.entity = entity;
        physicsCollision.proxy.aabb.position = position.coords; //Because its not linked to a body BUT it could cause an issue?
        physicsCollision.proxy.userData1 = entity;
        this.broadphase.addProxy(physicsCollision.proxy);
    }

    onEntityRemoved(
        entity: Entity,
        position: Position,
        extents: Extents,
        physicsCollision: PhysicsCollision,
        moveable: Moveable,
    ) {
        this.broadphase.removeProxy(physicsCollision.proxy);
    }

    updateAllEntities() {}
}
