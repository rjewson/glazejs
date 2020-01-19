import { System } from "../../ecs/System";
import { Holdable } from "../components/Holdable";
import { Held } from "../components/Held";
import { PhysicsBody } from "../../physics/components/PhysicsBody";
import { Active } from "../components/Active";
import { Entity } from "../../ecs/Entity";
import { Storeable } from "../components/Storeable";
import { Position } from "../components/Position";
import { Holder } from "../components/Holder";

export class HeldSystem extends System {
    constructor() {
        super([Position, Holdable, Held, PhysicsBody, Active]);
    }

    onEntityAdded(
        entity: Entity,
        position: Position,
        holdable: Holdable,
        held: Held,
        physicsBody: PhysicsBody,
        active: Active,
    ) {
        var body = physicsBody.body;
        body.velocity.setTo(0, 0);
        body.skip = true;

        var holderPos = this.engine.getComponentForEntity(held.holder, Position).coords;

        position.coords.copy(holderPos);
        physicsBody.body.position.copy(holderPos);

        if (this.engine.getComponentForEntity(entity, Storeable) == null) {
            var holder = this.engine.getComponentForEntity(held.holder, Holder);
            var holderBody = this.engine.getComponentForEntity(holder.parent, PhysicsBody).body;
            if (holderBody != null) {
                holderBody.setMass(holderBody.mass + body.mass);
            }
        }
    }

    onEntityRemoved(
        entity: Entity,
        position: Position,
        holdable: Holdable,
        held: Held,
        physicsBody: PhysicsBody,
        active: Active,
    ) {
        // var holder = held.holder;
        this.drop(held.holder);
        var body = physicsBody.body;
        body.skip = false;
        body.velocity.setTo(0, 0);

        if (this.engine.getComponentForEntity(entity, Storeable) == null) {
            var holder = this.engine.getComponentForEntity(held.holder, Holder);
            var holderBody = this.engine.getComponentForEntity(holder.parent, PhysicsBody).body;
            //?
            // var holderBody = holder.parent.getComponent(PhysicsBody).body;
            if (holderBody != null) {
                holderBody.setMass(holderBody.mass - body.mass);
            }
        }
    }

    updateEntity(
        entity: Entity,
        position: Position,
        holdable: Holdable,
        held: Held,
        physicsBody: PhysicsBody,
        active: Active,
    ) {
        var holder = held.holder;
        var holderPos = this.engine.getComponentForEntity(holder, Position);
        var body = physicsBody.body;
        body.setStaticPosition(holderPos.coords.x + holderPos.direction.x * 4, holderPos.coords.y); //position.copy(holderPos);
        //entity.getComponent(PhysicsBody).body.position.copy(entity.getComponent(PhysicsBody).body.position);
        position.update(body.position);
        position.direction.copy(holderPos.direction);
    }

    public drop(heldItem: Entity) {
        if (heldItem != null) {
            var _heldItem = heldItem;
            this.engine.removeComponentsFromEntityByType(heldItem, [Held]);
            heldItem = null;
            return _heldItem;
        }
        return null;
    }
}
