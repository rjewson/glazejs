import { System } from "../../ecs/System";
import { Destroy } from "../components/Destroy";
import { Entity } from "../../ecs/Entity";

export class DestroySystem extends System {
    toDelete: Entity[];

    constructor() {
        super([Destroy]);
        this.toDelete = new Array();
    }

    updateEntity(entity: Entity, destroy: Destroy) {
        if (destroy.count-- <= 0) {
            this.toDelete.push(entity);
        }
    }

    public postUpdate() {
        this.toDelete.forEach(entity => this.engine.destroyEntity(entity));
        this.toDelete.length = 0;
    }
}
