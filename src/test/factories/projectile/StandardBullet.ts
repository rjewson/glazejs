import { Engine } from "../../../glaze/ecs/Engine";
import { Material } from "../../../glaze/physics/Material";
import { Position } from "../../../glaze/core/components/Position";
import { Filter } from "../../../glaze/physics/collision/Filter";
import { Vector2 } from "../../../glaze/geom/Vector2";
import { Entity } from "../../../glaze/ecs/Entity";
import { TestFilters } from "../../config/Filters";
import { Body } from "../../../glaze/physics/Body";
import { Extents } from "../../../glaze/core/components/Extents";
import { Graphics } from "../../../glaze/graphics/components/Graphics";
import { PhysicsBody } from "../../../glaze/physics/components/PhysicsBody";
import { Moveable } from "../../../glaze/core/components/Moveable";
import { PhysicsCollision } from "../../../glaze/physics/components/PhysicsCollision";
import { CollisionCounter } from "../../../glaze/core/components/CollisionCouner";
import { Health } from "../../../glaze/core/components/Health";
import { Age } from "../../../glaze/core/components/Age";
import { Active } from "../../../glaze/core/components/Active";
import { Ballistics } from "../../../glaze/util/Ballastics";
import { Destroy } from "../../../glaze/core/components/Destroy";
import { Explosion } from "../../../glaze/particle/emitter/Explosion";
import { SimpleFSMStates } from "../../../glaze/ai/fsm/SimpleFSM";
import { State } from "../../../glaze/core/components/State";
import { CombatUtils } from "../../../glaze/util/CombatUtils";
import { Light } from "../../../glaze/graphics/components/Light";
import { Viewable } from "../../../glaze/core/components/Viewable";
import { SpriteFireBall } from "../../../glaze/particle/emitter/SpriteFireBall";
import { SpriteParticleEmitter } from "../../../glaze/particle/components/SpriteParticleEmitter";
import { onHealth } from "../../../glaze/core/logic/Logic";

export class StandardBullet {
    static states: SimpleFSMStates = {
        alive: function(engine: Engine, entity: Entity) {},
        destroy: function(engine: Engine, entity: Entity) {
            if (engine.getComponentForEntity(entity, Destroy)) return;
            engine.addComponentsToEntity(entity, [new Destroy(3), new Light(64, 1, 1, 1, 255, 255, 255)]);
            engine.removeComponentsFromEntityByType(entity, [PhysicsBody]);
            engine.getComponentForEntity(entity, SpriteParticleEmitter).emitters.push(new SpriteFireBall(4, 80));
            CombatUtils.explode(engine.getComponentForEntity(entity, Position).coords, 100, 4000, entity);
        },
    };
    static create(engine: Engine, position: Position, filter: Filter, targetPosition: Vector2): Entity {
        var bulletBody = new Body(Material.LIGHTMETAL);
        bulletBody.setMass(16 + 8);
        bulletBody.setBounces(3);
        bulletBody.globalForceFactor = 0.8; //0.5;
        bulletBody.isBullet = true;
        bulletBody.maxScalarVelocity = 10000;

        filter.categoryBits |= TestFilters.PROJECTILE_CAT;
        filter.maskBits |= TestFilters.PROJECTILE_COLLIDABLE_CAT;

        var bullet = engine.createEntity();
        engine.addComponentsToEntity(bullet, [
            position,
            new Extents(2, 2),
            // new LifeCycle(BULLET_LIFECYCLE),
            new Graphics("projectiles", "standard"),
            new PhysicsBody(bulletBody, true),
            new Moveable(),
            new PhysicsCollision(false, filter, []),
            new SpriteParticleEmitter([]),
            new State(StandardBullet.states, null, false),
            new CollisionCounter(3, "destroy"),
            new Health(10, 10, 0, "destroy", onHealth),
            new Age(1000, "destroy"),
            new Active(),
            // new Light(64, 1, 1, 1, 255, 255, 255),
            new Viewable(),
        ]);
        Ballistics.calcProjectileVelocity(bulletBody, targetPosition, 2000);

        return bullet;
    }
    // static onDestroy(engine: Engine, entity: Entity) {
    //     if (engine.getComponentForEntity(entity, Destroy)) return;
    //     engine.addComponentsToEntity(entity, [new Destroy(1)]);
    //     engine.getComponentForEntity(entity, ParticleEmitter).emitters.push(new Explosion(10, 50));
    //     // entity.getComponent(glaze.engine.components.ParticleEmitters).emitters.push(new glaze.particle.emitter.Explosion(10,50));
    //     // glaze.util.CombatUtils.explode(entity.getComponent(Position).coords,64,10000,entity);
    // }
}
