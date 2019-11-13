import { System } from "../../ecs/System";
import { PhysicsCollision } from "../components/PhysicsCollision";
import { Extents } from "../../core/components/Extents";
import { EnvironmentForce } from "../components/EnvironmentForce";
import { Active } from "../../core/components/Active";
import { Vector2 } from "../../geom/Vector2";
import { Entity } from "../../ecs/Entity";
import { BFProxy } from "../collision/BFProxy";
import { Contact } from "../collision/contact/Contact";
import { RandomFloat } from "../../util/Random";

export class EnvironmentForceSystem extends System {
    public temp: Vector2 = new Vector2();

    constructor() {
        super([PhysicsCollision, Extents, EnvironmentForce, Active]);
        this.callback = this.callback.bind(this);
    }
    onEntityAdded(
        entity: Entity,
        physicsCollision: PhysicsCollision,
        extents: Extents,
        environmentForce: EnvironmentForce,
        active: Active,
    ) {
        physicsCollision.proxy.contactCallbacks.push(this.callback);
        this.setActiveForce(environmentForce, 0);
    }

    updateEntity(
        entity: Entity,
        physicsCollision: PhysicsCollision,
        extents: Extents,
        environmentForce: EnvironmentForce,
        active: Active,
    ) {
        if (environmentForce.ttl > 0) {
            environmentForce.ttl -= this.dt;
            if (environmentForce.ttl <= 0) {
                // Actuate.tween(environmentForce, 1, { power: 0 }).onComplete(this.onFinished, [environmentForce]);
            }
        }
    }

    public onFinished(force: EnvironmentForce) {
        force.currentIndex++;
        if (force.currentIndex >= force.data.length) force.currentIndex = 0;
        this.setActiveForce(force, force.currentIndex);
    }

    public setActiveForce(envForce: EnvironmentForce, index: number) {
        envForce.currentIndex = index;
        var item = envForce.data[index];
        envForce.direction.copy(item.direction);
        envForce.power = item.maxForce;
        envForce.ttl = item.minDuration == 0 ? -1 : RandomFloat(item.minDuration * 1000, item.maxDuration * 1000);
    }

    public callback(a: BFProxy, b: BFProxy, contact: Contact) {
        var area = a.aabb.overlapArea(b.aabb);
        var force = this.engine.getComponentForEntity(a.entity, EnvironmentForce);
        //TODO SCALE FORCE BY ACTUAL AREA!!!!!!
        this.temp.copy(force.direction);
        // temp.multEquals(force.power/40);
        // temp.multEquals(40*area);
        this.temp.multEquals(force.power * area);
        //trace(force.power);
        b.body.addForce(this.temp);
    }
}
