import { System } from "../../glaze/ecs/System";
import { GunTurret } from "../components/GunTurret";
import { Position } from "../../glaze/core/components/Position";
import { Entity } from "../../glaze/ecs/Entity";
import { CombatUtils, EntityFilterOptions } from "../../glaze/util/CombatUtils";
import { Vector2 } from "../../glaze/geom/Vector2";
import { Filter } from "../../glaze/physics/collision/Filter";
import { TestFilters } from "../config/Filters";
import { StandardBullet } from "../factories/projectile/StandardBullet";

export class GunTurretSystem extends System {
    constructor() {
        super([GunTurret, Position]);
    }

    updateEntity(entity: Entity, turret: GunTurret, position: Position) {
        if (turret.intervalDelay.tick(this.dt)) {
            var entities = CombatUtils.SearchSortAndFilter(position.coords, 400, entity, EntityFilterOptions.ENEMY)
                .entities;
            if (entities.length > 0) {
                this.fireBulletAtEntity(position, entities[0].entity);
            }
        }
    }

    fireBulletAtEntity(position: Position, target: Entity) {
        this.fireBullet(position.coords.clone(), this.engine.getComponentForEntity(target, Position).coords.clone());
    }

    fireBullet(pos: Vector2, target: Vector2) {
        var filter = new Filter();
        filter.groupIndex = TestFilters.TURRET_GROUP;
        var bullet = StandardBullet.create(this.engine, new Position(pos.x, pos.y), filter, target);
    }
}
