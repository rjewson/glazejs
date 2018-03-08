import { IBroadphase } from "../physics/collision/broadphase/IBroadphase";
import { Ray } from "../physics/collision/Ray";
import { Entity } from "../ecs/Entity";
import { BroadphaseAreaQuery } from "./BroadphaseAreaQuery";
import { Engine } from "../ecs/Engine";
import { Vector2 } from "../geom/Vector2";
import { EntityCollection } from "../ds/EntityCollection";
import { EntityCollectionItem } from "../ds/EntityCollectionItem";
import { Destroy } from "../core/components/Destroy";
import { Health } from "../core/components/Health";
import { PhysicsBody } from "../physics/components/PhysicsBody";

export enum EntityFilterOptions {
    ALL,
    FRIENDLY,
    ENEMY,
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
        radius: number,
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

    static explode(position: Vector2, radius: number, power: number, sourceEntity: Entity) {
        CombatUtils.bfAreaQuery.query(position, radius, sourceEntity, true);
        CombatUtils.bfAreaQuery.entityCollection.entities.forEach(item => {
            //var item = CombatUtils.bfAreaQuery.entityCollection.entities.head;
            if (!CombatUtils.engine.getComponentForEntity(item.entity, Destroy)) {
                // if (item.entity.getComponent(Destroy)==null) {

                var health: Health = CombatUtils.engine.getComponentForEntity(item.entity, Health);
                var body: PhysicsBody = CombatUtils.engine.getComponentForEntity(item.entity, PhysicsBody);

                if (health != null || body != null) {
                    var effect = radius / Math.sqrt(item.distance) * power;
                    // trace(item.distance);
                    // trace('e=$effect');
                    if (health != null) {
                        health.applyDamage(effect);
                    }

                    // var personality = item.entity.getComponent(Personality);
                    // if (personality!=null) {
                    //     personality.applyDamage(sourceEntity,"explosion",effect);
                    // }

                    if (body != null) {
                        var delta = body.body.position.clone();
                        delta.minusEquals(position);
                        delta.normalize();
                        delta.multEquals(effect);
                        body.body.addForce(delta);
                    }
                }
            }
        });
    }
}
