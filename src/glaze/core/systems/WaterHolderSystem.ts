import { System } from "../../ecs/System";
import { WaterHolder } from "../components/WaterHolder";
import { PhysicsBody } from "../../physics/components/PhysicsBody";
import { Entity } from "../../ecs/Entity";

export class WaterHolderSystem extends System {
    constructor() {
        super([WaterHolder, PhysicsBody]);
    }

    updateEntity(entity: Entity, waterHolder: WaterHolder, physicsBody:PhysicsBody) {

    }
}
