import { EntityCollectionItem, ECIFilter } from "./EntityCollectionItem";
import { Entity } from "../ecs/Entity";
import { Pool } from "../util/Pool";

const entityCollectionItemPool = new Pool<EntityCollectionItem>(()=>new EntityCollectionItem(0));
entityCollectionItemPool.addCapacity(200);

export class EntityCollection {
    public entities: Array<EntityCollectionItem>;

    constructor() {
        this.entities = new Array();
    }

    public addItem(entity: Entity): EntityCollectionItem {
        const eci = entityCollectionItemPool.reserve();
        eci.reset(entity);
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
        for (var entity of this.entities) {
            entityCollectionItemPool.free(entity);
        }
        this.entities.length = 0;
    }
}
