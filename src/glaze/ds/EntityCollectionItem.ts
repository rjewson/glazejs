import { Entity } from "../ecs/Entity";
import { Vector2 } from "../geom/Vector2";

export class EntityCollectionItem {
    public entity: Entity;
    public distance: number;
    public priority: number;
    public visible: boolean;
    public perspective: Vector2;

    constructor() {
        this.reset(-1);
    }

    static SortClosestFirst(a: EntityCollectionItem, b: EntityCollectionItem): number {
        return a.distance - b.distance;
    }

    public reset(entity:Entity) {
        this.entity = entity;
        this.distance = 0;
        this.priority = 0;
        this.visible = false;
        this.perspective = null;
    }
    
}

export type ECIComp = (a: EntityCollectionItem, b: EntityCollectionItem) => number;
export type ECIFilter = (a: EntityCollectionItem) => boolean;
