import { IBroadphase } from "../physics/collision/broadphase/IBroadphase";
import { Ray } from "../physics/collision/Ray";
import { Entity } from "../ecs/Entity";
import { BroadphaseAreaQuery } from "./BroadphaseAreaQuery";
import { Engine } from "../ecs/Engine";
import { Vector2 } from "../geom/Vector2";
import { EntityCollection } from "../ds/EntityCollection";
import { EntityCollectionItem } from "../ds/EntityCollectionItem";

export enum EntityFilterOptions {
    ALL,
    FRIENDLY,
    ENEMY
}

export class CombatUtils {
    static engine: Engine;
    static bfAreaQuery: BroadphaseAreaQuery;
    static broadphase: IBroadphase;
    static ray: Ray;
    static referenceEntity: Entity;

    constructor() {}

    static setup(engine: Engine, bf: IBroadphase) {
        CombatUtils.engine = engine;
        CombatUtils.broadphase = bf;
        CombatUtils.bfAreaQuery = new BroadphaseAreaQuery(engine, bf);
        CombatUtils.ray = new Ray();
    }

    static CanSee(start: Vector2, end: Vector2, range: number): boolean {
        if (start.distSqrd(end) >= range * range) return false;
        this.ray.initalize(start, end, 0, null);
        // trace("looking",start,end);
        this.broadphase.CastRay(this.ray, null, false, false);
        return !this.ray.hit;
    }

    static SearchSortAndFilter(
        position: Vector2,
        radius:  number,
        referenceEntity: Entity,
        filterOptions: EntityFilterOptions,
    ): EntityCollection {
        CombatUtils.referenceEntity = referenceEntity;
        CombatUtils.bfAreaQuery.query(position, radius, referenceEntity, true);
        // TODO
        // CombatUtils.bfAreaQuery.entityCollection.entities.sort(EntityCollectionItem.SortClosestFirst);
        // CombatUtils.bfAreaQuery.entityCollection.filter(FilterItems);
        // if (filterOptions == EntityFilterOptions.ENEMY)
        //     CombatUtils.bfAreaQuery.entityCollection.filter(FilterEnemyFactions);
        // else if (filterOptions == EntityFilterOptions.FRIENDLY)
        //     CombatUtils.bfAreaQuery.entityCollection.filter(FilterFriendlyFactions);

        return CombatUtils.bfAreaQuery.entityCollection;
    }
}
