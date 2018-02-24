import { Entity } from "../../ecs/Entity";

export class Children {
    public children: number[];
    constructor(children: Entity[]) {
        this.children = children;
    }
}
