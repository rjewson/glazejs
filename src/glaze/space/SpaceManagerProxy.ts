import { AABB } from "../geom/AABB";
import { Entity } from "../ecs/Entity";

export class SpaceManagerProxy {
    public aabb: AABB = new AABB();
    public isStatic: boolean = false;
    public entity: Entity = null;
    public active: boolean = false;
    public referenceCount: number = 0;
    public name: string;

    constructor() {}
}
