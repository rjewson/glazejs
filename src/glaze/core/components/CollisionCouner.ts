import { Entity } from "../../ecs/Entity";

export class CollisionCounter {
    public count: number;
    public onCount: (entity: Entity) => void;
    public ignoreStatic: boolean;

    constructor(count: number, onCount: (entity: Entity) => void, ignoreStatic: boolean = true) {
        this.count = count;
        this.onCount = onCount;
        this.ignoreStatic = ignoreStatic;
    }
}
