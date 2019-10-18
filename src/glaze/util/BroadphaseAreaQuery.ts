import { IBroadphase } from "../physics/collision/broadphase/IBroadphase";
import { Ray } from "../physics/collision/Ray";
import { AABB } from "../geom/AABB";
import { Entity } from "../ecs/Entity";
import { Vector2 } from "../geom/Vector2";
import { BFProxy } from "../physics/collision/BFProxy";
import { Engine } from "../ecs/Engine";
import { EntityCollection } from "../ds/EntityCollection";
import { ZERO_TOLERANCE } from "./Maths";
import { Position } from "../core/components/Position";

export class BroadphaseAreaQuery {
    static RAYCAST_THRESHOLD: number = 10;

    engine: Engine;
    broadphase: IBroadphase;
    ray: Ray;
    public entityCollection: EntityCollection;
    aabb: AABB;
    filterEntity: Entity;
    visibleCheck: boolean;

    constructor(engine: Engine, broadphase: IBroadphase) {
        this.engine = engine;
        this.broadphase = broadphase;
        this.entityCollection = new EntityCollection();
        this.aabb = new AABB();
        this.ray = new Ray();
        this.addBroadphaseItem = this.addBroadphaseItem.bind(this);
    }

    public query(position: Vector2, range: number, filterEntity: Entity, visibleCheck: boolean) {
        // js.Lib.debug();
        this.entityCollection.clear();

        this.aabb.position.copy(position);
        this.aabb.extents.setTo(range, range);
        this.filterEntity = filterEntity;
        this.visibleCheck = visibleCheck;

        this.broadphase.QueryArea(this.aabb, this.addBroadphaseItem, true, true); //Check static and dynamic items
    }

    addBroadphaseItem(bfproxy: BFProxy):boolean {
        // console.log("found "+bfproxy.id);
        if (this.filterEntity != null && bfproxy.entity == this.filterEntity) return;

        var distance = bfproxy.aabb.position.distSqrd(this.aabb.position) + ZERO_TOLERANCE;

        if (distance > BroadphaseAreaQuery.RAYCAST_THRESHOLD && this.visibleCheck) {
            const pos = this.engine.getComponentForEntity(bfproxy.entity, Position);
            this.ray.initalize(this.aabb.position, pos.coords, 0, null);
            this.broadphase //js.Lib.debug();
                .CastRay(this.ray, null, false, false); //Dont check ray against static and dynamic items
            if (this.ray.hit) return;
        }

        var item = this.entityCollection.addItem(bfproxy.entity);
        item.distance = distance;
        item.perspective = this.aabb.position;
    }
}
