import { Entity } from "../../ecs/Entity";

export class Held {

    public holder: Entity;

    constructor(holder:Entity) {
        this.holder = holder;
    }

}