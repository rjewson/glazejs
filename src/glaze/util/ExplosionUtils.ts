import { Pool } from "./Pool";
import { GZE } from "../GZE";
import { Entity } from "../ecs/Entity";
import { Position } from "../core/components/Position";
import { Extents } from "../core/components/Extents";
import { Damage } from "../core/components/Damage";
import { PhysicsCollision } from "../physics/components/PhysicsCollision";
import { Filter } from "../physics/collision/Filter";
import { Moveable } from "../core/components/Moveable";

const createExplosion = (): Entity => {
    const entity = GZE.engine.createEntity();
    GZE.engine.addComponentsToEntity(entity, [
        new Position(0, 0),
        new Extents(0, 0),
        new Damage(0, 0),
        new PhysicsCollision(true, new Filter(), []),
        new Moveable(),
    ]);
    GZE.engine.getComponentForEntity(entity, PhysicsCollision).proxy.isActive = false;
    return entity;
};

export class ExplosionUtils {

    public pool: Pool<Entity>;

    constructor(size: number) {
        this.pool = new Pool(createExplosion);
        this.pool.addCapacity(10);
    }

    public get(x:number,y:number,radius:number,damage: number): Entity {
        const entity = this.pool.reserve();
        GZE.engine.getComponentForEntity(entity, Position).coords.setTo(x,y);
        GZE.engine.getComponentForEntity(entity, Extents).halfWidths.setTo(radius,radius);
        GZE.engine.getComponentForEntity(entity, Damage).damagePerSecond = damage;
        GZE.engine.getComponentForEntity(entity, PhysicsCollision).proxy.isActive = true;
        return entity;
    }

    public release(entity: Entity) {
        this.pool.free(entity);
        GZE.engine.getComponentForEntity(entity, PhysicsCollision).proxy.isActive = false;
    }
}
