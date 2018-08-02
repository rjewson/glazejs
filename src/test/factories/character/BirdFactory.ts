import { Engine } from "../../../glaze/ecs/Engine";
import { Entity } from "../../../glaze/ecs/Entity";
import { Filter } from "../../../glaze/physics/collision/Filter";
import { TestFilters } from "../../config/Filters";
import { Body } from "../../../glaze/physics/Body";
import { Material } from "../../../glaze/physics/Material";
import { Extents } from "../../../glaze/core/components/Extents";
import { Graphics } from "../../../glaze/graphics/components/Graphics";
import { GraphicsAnimation } from "../../../glaze/graphics/components/GraphicsAnimation";
import { PhysicsBody } from "../../../glaze/physics/components/PhysicsBody";
import { PhysicsCollision } from "../../../glaze/physics/components/PhysicsCollision";
import { Moveable } from "../../../glaze/core/components/Moveable";
import { Active } from "../../../glaze/core/components/Active";
import { Player } from "../../components/Player";
import { Position } from "../../../glaze/core/components/Position";
import { Steering } from "../../../glaze/ai/steering/components/Steering";
import { Wander } from "../../../glaze/ai/steering/behaviors/Wander";
import { Seek } from "../../../glaze/ai/steering/behaviors/Seek";
import { SteeringAgentParameters, HEAVY_STEERING_PARAMS } from "../../../glaze/ai/steering/SteeringAgentParameters";
import { Age } from "../../../glaze/core/components/Age";
import { Health } from "../../../glaze/core/components/Health";
import { Destroy } from "../../../glaze/core/components/Destroy";
import { ParticleEmitter } from "../../../glaze/particle/components/ParticleEmitter";
import { Explosion } from "../../../glaze/particle/emitter/Explosion";
import { Bird } from "../../components/Bird";
import { Arrival } from "../../../glaze/ai/steering/behaviors/Arrival";
import { WallAvoidance } from "../../../glaze/ai/steering/behaviors/WallAvoidance";
import { State } from "../../../glaze/core/components/State";
import { SimpleFSMStates } from "../../../glaze/ai/fsm/SimpleFSM";
import { TileMapCollision } from "../../../glaze/physics/collision/broadphase/TileMapCollision";

export class BirdFactory {

    static states: SimpleFSMStates = {
        destroy: function(engine: Engine, entity: Entity) {
            if (engine.getComponentForEntity(entity, Destroy)) return;
            engine.addComponentsToEntity(entity, [new Destroy(1)]);
        }
    };

    static create(engine: Engine, position: Position, follow: Position, nest: Entity): Entity {
        var birdBody = new Body(new Material());
        birdBody.setMass(1);
        birdBody.setBounces(0);
        birdBody.globalForceFactor = 0.0;
        birdBody.maxScalarVelocity = 200;

        var bee = engine.createEntity();
        engine.addComponentsToEntity(bee, [
            position,
            new Bird(nest),
            new Extents(4 * 1, 4 * 1),
            new Graphics("bird"),
            new PhysicsBody(birdBody, false),
            new Moveable(),
            new PhysicsCollision(false, null, []),
            new GraphicsAnimation("bird", "fly"),
            // new Light(64,1,1,1,255,255,0),
            new Steering([
                new Wander(55, 80, 0.3), //ok
                new Arrival(follow.coords, 256),
                //,new Seek(follow.coords,32)
                // new Arrival(follow.coords,128,32)
                new WallAvoidance(60),
                // ,new Seperation(nest.getComponent(BirdNest).group.members,20)
            ]),
            new State(BirdFactory.states, null, false),
            new Age(15000, "destroy"),
            new Health(10, 10, 0, "destroy"),
            new Active(),
        ]);

        return bee;
    }
    static onDestroy(engine: Engine, entity: Entity) {
        if (engine.getComponentForEntity(entity, Destroy)) return;
        engine.addComponentsToEntity(entity, [new Destroy(1)]);
    }
}
