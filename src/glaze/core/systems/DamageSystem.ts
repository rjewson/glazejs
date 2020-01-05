import { System } from "../../ecs/System";
import { Extents } from "../components/Extents";
import { Damage } from "../components/Damage";
import { PhysicsCollision } from "../../physics/components/PhysicsCollision";
import { Entity } from "../../ecs/Entity";
import { BFProxy } from "../../physics/collision/BFProxy";
import { Contact } from "../../physics/collision/contact/Contact";
import { Health } from "../components/Health";

export class DamageSytem extends System {
    constructor() {
        super([Extents, PhysicsCollision, Damage]);
        this.callback = this.callback.bind(this);
    }

    onEntityAdded(entity: Entity, extents: Extents, physicsCollision: PhysicsCollision, damage: Damage) {
        physicsCollision.proxy.contactCallbacks.push(this.callback);
    }
    onEntityRemoved(entity: Entity, extents: Extents, physicsCollision: PhysicsCollision, damage: Damage) {
        physicsCollision.proxy.contactCallbacks.splice(
            physicsCollision.proxy.contactCallbacks.indexOf(this.callback),
            1
        );
    }
    updateAllEntities() {}

    callback(a: BFProxy, b: BFProxy, contact: Contact) {
        const health = this.engine.getComponentForEntity(b.entity, Health);
        if (health) {
            const damage = this.engine.getComponentForEntity(a.entity, Damage);
            health.applyDamage(damage.damagePerSecond * (this.dt / 1000));
        }
    }
}
