import { Entity } from "../ecs/Entity";
import { Vector2 } from "../geom/Vector2";

export class EntityCollectionItem {
    public entity: Entity;
    public distance: number;
    public priority: number;
    public visible: boolean;
    public perspective: Vector2;

    constructor(entity: Entity) {
        this.entity = entity;
    }

    public reset() {}

    static SortClosestFirst(a: EntityCollectionItem, b: EntityCollectionItem): number {
        return a.distance - b.distance;
    }
}

export type ECIComp = (a: EntityCollectionItem, b: EntityCollectionItem) => number;
export type ECIFilter = (a: EntityCollectionItem) => boolean;
