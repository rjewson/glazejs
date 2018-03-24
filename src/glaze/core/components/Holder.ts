import { Entity } from "../../ecs/Entity";

export class Holder {

    public activate: boolean = false;
    public heldItem: Entity = null;
    public parent: Entity = null;

    constructor(parent:Entity) {
        this.parent = parent;
    }
}
