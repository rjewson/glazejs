import { Entity } from "../../ecs/Entity";
import { EntityCb } from "../../GlazeEngine";

export class CollisionCounter {
    public count: number;
    public onCount: string;
    public ignoreStatic: boolean;

    constructor(count: number, onCount: string, ignoreStatic: boolean = true) {
        this.count = count;
        this.onCount = onCount;
        this.ignoreStatic = ignoreStatic;
    }
}
