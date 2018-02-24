import { PhysicsBody } from "../../physics/components/PhysicsBody";
import { Controllable } from "../components/Controllable";
import { Entity } from "../../ecs/Entity";
import { System } from "../../ecs/System";
import { DigitalInput } from "../../util/DigitalInput";

export class ControllerSystem extends System {
    private input: DigitalInput;

    constructor(input: DigitalInput) {
        super([PhysicsBody, Controllable]);
        this.input = input;
    }

    onEntityAdded(entity: Entity, physicsBody: PhysicsBody, controllable: Controllable) {}

    updateEntity(entity: Entity, physicsBody: PhysicsBody, controllable: Controllable) {
        this.input.Pressed(38) ? (physicsBody.body.velocity.y -= controllable.force) : 0;
        this.input.Pressed(40) ? (physicsBody.body.velocity.y += controllable.force) : 0;
        this.input.Pressed(37) ? (physicsBody.body.velocity.x -= controllable.force) : 0;
        this.input.Pressed(39) ? (physicsBody.body.velocity.x += controllable.force) : 0;
    }
}
