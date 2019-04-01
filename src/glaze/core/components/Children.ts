import { Entity } from "../../ecs/Entity";

export class Children {
    public children: Entity[];
    constructor(children: Entity[]) {
        this.children = children;
    }
}
