import { System } from "../../ecs/System";
import { Age } from "../components/Age";
import { Active } from "../components/Active";
import { Entity } from "../../ecs/Entity";
import { CollisionCounter } from "../components/CollisionCouner";
import { PhysicsCollision } from "../../physics/components/PhysicsCollision";
import { BFProxy } from "../../physics/collision/BFProxy";
import { Contact } from "../../physics/collision/Contact";
import { Moveable } from "../components/Moveable";
import { State } from "../components/State";

export class CollsionCountSystem extends System {
    constructor() {
        super([CollisionCounter, PhysicsCollision, State, Active]);
        this.callback = this.callback.bind(this);
    }

    onEntityAdded(
        entity: Entity,
        collisionCounter: CollisionCounter,
        physicsCollision: PhysicsCollision,
        state: State,
        active: Active,
    ) {
        physicsCollision.proxy.contactCallbacks.push(this.callback);
    }
    onEntityRemoved(
        entity: Entity,
        collisionCounter: CollisionCounter,
        physicsCollision: PhysicsCollision,
        state: State,
        active: Active,
    ) {
        physicsCollision.proxy.contactCallbacks.splice(
            physicsCollision.proxy.contactCallbacks.indexOf(this.callback),
            1,
        );
    }
    updateAllEntities() {}

    callback(a: BFProxy, b: BFProxy, contact: Contact) {
        var cc = this.engine.getComponentForEntity(a.entity, CollisionCounter);

        var count = --cc.count;

        //This is the world
        if (b == null) {
            if (count <= 0 && cc.onCount != null) {
                var state:State = this.engine.getComponentForEntity(a.entity, State);
                state.setState(cc.onCount);
                // cc.onCount(this.engine, a.entity);
            }
        } else {
            //Do nothing with sensor
            if (b.isSensor) return;

            //Hit Dynamic item? trigger directly

            if (this.engine.getComponentForEntity(b.entity, Moveable) && cc.onCount != null) {
                var state:State = this.engine.getComponentForEntity(a.entity, State);
                state.setState(cc.onCount);
                // cc.onCount(this.engine, a.entity);
            }
        }
    }
}
