import { System } from "../../ecs/System";
import { PhysicsCollision } from "../../physics/components/PhysicsCollision";
import { Extents } from "../components/Extents";
import { Holdable } from "../components/Holdable";
import { Entity } from "../../ecs/Entity";

export class HoldableSystem extends System {
    public holderFilterCategory: number;

    constructor(holderFilterCategory: number) {
        super([PhysicsCollision, Extents, Holdable]);
        this.holderFilterCategory = holderFilterCategory;
    }

    onEntityAdded(entity: Entity, physicsCollision: PhysicsCollision, extents: Extents, holdable: Holdable) {
        physicsCollision.proxy.filter.categoryBits |= this.holderFilterCategory;
    }

    updateAllEntities() {}
}
