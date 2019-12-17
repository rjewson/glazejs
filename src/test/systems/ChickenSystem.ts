import { System } from "../../glaze/ecs/System";
import { BroadphaseAreaQuery } from "../../glaze/util/BroadphaseAreaQuery";
import { Position } from "../../glaze/core/components/Position";
import { PhysicsBody } from "../../glaze/physics/components/PhysicsBody";
import { Entity } from "../../glaze/ecs/Entity";
import { Chicken } from "../components/Chicken";
import { RandomBoolean, RandomSign } from "../../glaze/util/Random";
import { Vector2 } from "../../glaze/geom/Vector2";
import { IParticleEngine } from "../../glaze/particle/engines/IParticleEngine";

export class ChickenSystem extends System {
    public particleEngine: IParticleEngine;
    public scaredOfPosition: Position;

    constructor(particleEngine: IParticleEngine) {
        super([Position, Chicken, PhysicsBody]);
        this.particleEngine = particleEngine;
    }

    updateEntity(entity: Entity, position: Position, chicken: Chicken, physicsBody: PhysicsBody) {
        var dist: number = 1000 * 1000;
        var body = physicsBody.body;

        var dir = 0;
        if (this.scaredOfPosition != null) {
            dist = body.position.distSqrd(this.scaredOfPosition.coords);
            dir = body.position.x - this.scaredOfPosition.coords.x < 0 ? -1 : 1;
        }
        if (dist < 64 * 64) {
            if (RandomBoolean(0.1)) {
                body.addForce(new Vector2(dir * 5000, -8000));
                this.particleEngine.EmitParticle(
                    body.position.x,
                    body.position.y,
                    dir * -10,
                    -100,
                    0,
                    5,
                    800,
                    1,
                    false,
                    true,
                    null,
                    4,
                    255,
                    255,
                    255,
                    255
                );
            }
        } else {
            if (RandomBoolean(0.005)) {
                var dir = RandomSign(0.5);
                position.direction.x = -dir;
                body.addForce(new Vector2(dir * 5000, -8000));
                this.particleEngine.EmitParticle(
                    body.position.x,
                    body.position.y,
                    dir * -20,
                    -100,
                    0,
                    5,
                    800,
                    1,
                    false,
                    true,
                    null,
                    4,
                    255,
                    255,
                    255,
                    255
                );
            }
        }
    }

    public scaredOf(entity: Entity) {
        const position = this.engine.getComponentForEntity(entity, Position);
        if (position) {
            this.scaredOfPosition = position;
        }
    }
}
