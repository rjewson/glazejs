import { Entity } from "../../ecs/Entity";
import { EntityCb } from "../../GlazeEngine";

export class CollisionCounter {
    public count: number;
    public onCount: EntityCb;
    public ignoreStatic: boolean;

    constructor(count: number, onCount: EntityCb, ignoreStatic: boolean = true) {
        this.count = count;
        this.onCount = onCount;
        this.ignoreStatic = ignoreStatic;
    }
}
