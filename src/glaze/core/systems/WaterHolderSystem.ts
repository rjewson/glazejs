import { System } from "../../ecs/System";
import { WaterHolder } from "../components/WaterHolder";
import { Entity } from "../../ecs/Entity";
import { PhysicsCollision } from "../../physics/components/PhysicsCollision";
import { Water } from "../components/Water";
import { BFProxy } from "../../physics/collision/BFProxy";
import { Contact } from "../../physics/collision/contact/Contact";
import { Graphics } from "../../graphics/components/Graphics";

export class WaterHolderSystem extends System {
    constructor() {
        super([WaterHolder, PhysicsCollision]);
        this.callback = this.callback.bind(this);
    }

    onEntityAdded(entity: Entity, waterHolder: WaterHolder, physicsCollision:PhysicsCollision) {
        physicsCollision.proxy.contactCallbacks.push(this.callback);
    }

    public callback(a: BFProxy, b: BFProxy, contact: Contact) {
        if (!b) return;
        const water = this.engine.getComponentForEntity(b.entity, Water);
        if (water) {
            const area = a.aabb.overlapArea(b.aabb);
            if (area > 100) {
                const graphics = this.engine.getComponentForEntity(a.entity, Graphics);
                graphics.setFrameId(graphics.initialFrameId+"_full");
                const waterHolder = this.engine.getComponentForEntity(a.entity, WaterHolder);
                waterHolder.full = true;
            }
            //console.log(area);
        }
    }

}
