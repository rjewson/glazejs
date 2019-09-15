import { Entity } from "../../ecs/Entity";
import { Engine } from "../../ecs/Engine";
import { Held } from "./Held";

export class Holder {

    public activate: boolean = false;
    public heldItem: Entity = null;
    public parent: Entity = null;

    constructor(parent:Entity) {
        this.parent = parent;
    }

    static drop(engine:Engine, holder:Holder):Entity {
        if (holder.heldItem!=null) {
            const item = holder.heldItem;
            engine.removeComponentsFromEntityByType(holder.heldItem, [Held]);
            holder.heldItem = null;
            return item;
        }
        return null;
    }
}
