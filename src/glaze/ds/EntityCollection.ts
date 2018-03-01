import { EntityCollectionItem, ECIFilter } from "./EntityCollectionItem";
import { Entity } from "../ecs/Entity";

export class EntityCollection {
    public entities: Array<EntityCollectionItem>;

    constructor() {
        this.entities = new Array();
    }

    public addItem(entity: Entity): EntityCollectionItem {
        const eci = new EntityCollectionItem(entity);
        this.entities.push(eci);
        return eci;
    }

    public getItem(entity: Entity): EntityCollectionItem {
        return this.entities.find(eci => eci.entity === entity);
    }

    public removeItem(entity: Entity) {
        this.entities = this.entities.filter(eci => eci.entity !== entity);
    }

    public filter(filterFunc: ECIFilter) {
        this.entities = this.entities.filter(filterFunc);
    }

    public clear() {
        this.entities.length = 0;
    }
}
