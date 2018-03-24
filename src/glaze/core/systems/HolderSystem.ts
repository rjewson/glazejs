import { PhysicsCollision } from "../../physics/components/PhysicsCollision";
import { Extents } from "../components/Extents";
import { Holder } from "../components/Holder";
import { Active } from "../components/Active";
import { System } from "../../ecs/System";
import { Entity } from "../../ecs/Entity";
import { BFProxy } from "../../physics/collision/BFProxy";
import { Contact } from "../../physics/collision/Contact";
import { Held } from "../components/Held";

export class HolderSystem extends System {
    holderFilterCategory: number;

    constructor(holderFilterCategory: number) {
        super([PhysicsCollision, Extents, Holder, Active]);
        this.holderFilterCategory = holderFilterCategory;
        this.callback = this.callback.bind(this);
    }

    onEntityAdded(
        entity: Entity,
        physicsCollision: PhysicsCollision,
        extents: Extents,
        holder: Holder,
        active: Active,
    ) {
        physicsCollision.proxy.contactCallbacks.push(this.callback);
        physicsCollision.proxy.filter.maskBits |= this.holderFilterCategory;
    }

    updateAllEntities() {}

    callback(a: BFProxy, b: BFProxy, contact: Contact) {
        var holder = this.engine.getComponentForEntity(a.entity, Holder);
        if (holder.activate == true) {
            this.hold(holder,b.entity, a.entity);
        }
    }

    public hold(holder: Holder, item: Entity, holderEntity: Entity) {
        if (holder.heldItem == null && this.engine.getComponentForEntity(item, Held) == null) {
            var held = new Held(holderEntity);
            this.engine.addComponentsToEntity(item, [held]);
            holder.heldItem = item;
        }
    }
}
