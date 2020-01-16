import { Engine } from "../../../glaze/ecs/Engine";
import { Entity } from "../../../glaze/ecs/Entity";
import { Body } from "../../../glaze/physics/Body";
import { Material } from "../../../glaze/physics/Material";
import { Extents } from "../../../glaze/core/components/Extents";
import { Graphics } from "../../../glaze/graphics/components/Graphics";
import { GraphicsAnimation } from "../../../glaze/graphics/components/GraphicsAnimation";
import { PhysicsBody } from "../../../glaze/physics/components/PhysicsBody";
import { PhysicsCollision } from "../../../glaze/physics/components/PhysicsCollision";
import { Moveable } from "../../../glaze/core/components/Moveable";
import { Active } from "../../../glaze/core/components/Active";
import { Position } from "../../../glaze/core/components/Position";
import { Steering } from "../../../glaze/ai/steering/components/Steering";
import { Wander } from "../../../glaze/ai/steering/behaviors/Wander";
import { Seek } from "../../../glaze/ai/steering/behaviors/Seek";
import { HEAVY_STEERING_PARAMS } from "../../../glaze/ai/steering/SteeringAgentParameters";
import { Age } from "../../../glaze/core/components/Age";
import { Health } from "../../../glaze/core/components/Health";
import { Destroy } from "../../../glaze/core/components/Destroy";
import { SimpleFSMStates } from "../../../glaze/ai/fsm/SimpleFSM";
import { State } from "../../../glaze/core/components/State";
import { WallAvoidance } from "../../../glaze/ai/steering/behaviors/WallAvoidance";
import { ParticleEmitter } from "../../../glaze/particle/components/ParticleEmitter";
import { Explosion } from "../../../glaze/particle/emitter/Explosion";
import { onHealth } from "../../../glaze/core/logic/Logic";

export class BeeFactory {
    static states: SimpleFSMStates = {
        destroy: function(engine: Engine, entity: Entity) {
            if (engine.getComponentForEntity(entity, Destroy)) return;
            engine.addComponentsToEntity(entity, [new Destroy(1)]);
            engine.addComponentsToEntity(entity, [new ParticleEmitter([new Explosion(4, 80)])]);
        },
    };

    static create(engine: Engine, position: Position): Entity {
        var beeBody = new Body(new Material(0.1, 0.3, 0));
        beeBody.setMass(0.1);
        beeBody.setBounces(0);
        beeBody.globalForceFactor = 0.0;
        beeBody.maxScalarVelocity = 200;

        var bee = engine.createEntity();
        engine.addComponentsToEntity(bee, [
            position,
            new Extents((3 / 2) * 1, (3 / 2) * 1),
            new Graphics("insects"),
            new GraphicsAnimation("insects", "firefly"),
            new PhysicsBody(beeBody, true),
            new Moveable(),
            new PhysicsCollision(false, null, []),
            new Steering(
                [new Wander(80, 40, 143.5), new Seek(position.coords.clone(), 132), new WallAvoidance(40)],
                HEAVY_STEERING_PARAMS
            ),
            new State(BeeFactory.states, null, false),
            new Age(10000, "destroy"),
            new Health(10, 10, 0, "destroy", onHealth),
            new Active()
        ]);

        return bee;
    }
    static onDestroy(engine: Engine, entity: Entity) {
        if (engine.getComponentForEntity(entity, Destroy)) return;
        engine.addComponentsToEntity(entity, [new Destroy(1)]);
    }
}
