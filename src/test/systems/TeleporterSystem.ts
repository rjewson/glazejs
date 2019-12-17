import { System } from "../../glaze/ecs/System";
import { PhysicsCollision } from "../../glaze/physics/components/PhysicsCollision";
import { Teleporter } from "../components/Teleporter";
import { State } from "../../glaze/core/components/State";
import { Entity } from "../../glaze/ecs/Entity";
import { BFProxy } from "../../glaze/physics/collision/BFProxy";
import { RandomBoolean } from "../../glaze/util/Random";
import { Contact } from "../../glaze/physics/collision/contact/Contact";

export class TeleporterSystem extends System {
    constructor() {
        super([PhysicsCollision, Teleporter]);
        this.onCollision = this.onCollision.bind(this);
    }

    onEntityAdded(entity: Entity, physicsCollision: PhysicsCollision, teleporter: Teleporter, state: State) {
        physicsCollision.proxy.contactCallbacks.push(this.onCollision);
    }

    onCollision(a: BFProxy, b: BFProxy, c: Contact) {
        if (RandomBoolean(0.1)) {
            b.body.position.copy(this.engine.getComponentForEntity(a.entity, Teleporter).teleportPosition);
        }
    }
}
