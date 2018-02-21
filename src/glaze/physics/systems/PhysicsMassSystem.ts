import { System } from "../../ecs/System";
import { PhysicsBody } from "../components/PhysicsBody";
import { Extents } from "../../core/components/Extents";
import { Entity } from "../../ecs/Entity";

export class PhysicsMassSystem extends System {
    constructor() {
        super([PhysicsBody, Extents]);
    }

    onEntityAdded(entity: Entity, physicsBody: PhysicsBody, extents: Extents) {
        if (physicsBody.setMassFromVolume) {
            physicsBody.body.setMassFromVolumeMaterial(extents.halfWidths.x * extents.halfWidths.y * 4);
        }
    }
}
