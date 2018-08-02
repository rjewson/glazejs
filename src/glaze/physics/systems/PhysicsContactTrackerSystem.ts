import { System } from "../../ecs/System";
import { PhysicsCollision } from "../components/PhysicsCollision";
import { Entity } from "../../ecs/Entity";

export class PhysicsContactTrackerSystem extends System {

    public contacts:Map<number, number>;

    constructor() {
        super([PhysicsCollision]);
        this.contacts = new Map();

    }

    onEntityAdded(entity: Entity, physicsCollision: PhysicsCollision) {
    }

    onEntityRemoved(entity: Entity, physicsCollision: PhysicsCollision) {
    }

    updateAllEntities() {
    }



}
