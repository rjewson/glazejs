import { System } from "../../ecs/System";
import { IParticleEngine } from "../../particle/engines/IParticleEngine";
import { PhysicsCollision } from "../../physics/components/PhysicsCollision";
import { Extents } from "../components/Extents";
import { Water } from "../components/Water";
import { Entity } from "../../ecs/Entity";
import { Signal } from "../../signals/Signal";
import { BFProxy } from "../../physics/collision/BFProxy";
import { Contact } from "../../physics/collision/Contact";
import { Vector2 } from "../../geom/Vector2";
import { RandomFloat, RandomBoolean } from "../../util/Random";
import { Viewable } from "../components/Viewable";

export class WaterSystem extends System {
    public particleEngine: IParticleEngine;
    public cycle: number;
    private _tempVec: Vector2;

    constructor(particleEngine: IParticleEngine) {
        super([PhysicsCollision, Extents, Water]);
        this.particleEngine = particleEngine;
        this.cycle = 0;
        this.callback = this.callback.bind(this);
        this._tempVec = new Vector2();
    }

    onEntityAdded(entity: Entity, physicsCollision: PhysicsCollision, extents: Extents, water: Water) {
        // var cb2 = new Signal();
        // cb2.add(this.callback);
        debugger;
        this.engine.getComponentForEntity(entity, PhysicsCollision).proxy.contactCallbacks.push(this.callback);
    }

    updateAllEntities() {
        this.cycle = (Math.PI * 2 / 1000 * this.timestamp) % 1000;
    }

    public callback(a: BFProxy, b: BFProxy, contact: Contact) {
        var area = a.aabb.overlapArea(b.aabb);
        b.body.damping = 0.9;
        // b.body.addForce(new Vector2(0, -area * 5));
        this._tempVec.setTo(0, -area * (4.5 + Math.sin(this.cycle) * 0.5));
        b.body.addForce(this._tempVec);

        // trace(-area*0.05,b.body.mass);
        if (!b.body.inWaterPrev) {
            this.particleEngine.EmitParticle(
                RandomFloat(b.aabb.l, b.aabb.r),
                a.aabb.t,
                RandomFloat(-20, 20),
                RandomFloat(-5, -15),
                0,
                1,
                500,
                1,
                true,
                true,
                null,
                4,
                255,
                255,
                255,
                255,
            );
            this.particleEngine.EmitParticle(
                RandomFloat(b.aabb.l, b.aabb.r),
                a.aabb.t,
                RandomFloat(-20, 20),
                RandomFloat(-5, -15),
                0,
                1,
                500,
                1,
                true,
                true,
                null,
                4,
                255,
                255,
                255,
                255,
            );
            this.particleEngine.EmitParticle(
                RandomFloat(b.aabb.l, b.aabb.r),
                a.aabb.t,
                RandomFloat(-20, 20),
                RandomFloat(-5, -15),
                0,
                1,
                500,
                1,
                true,
                true,
                null,
                4,
                255,
                255,
                255,
                255,
            );
        } else if (b.aabb.t < a.aabb.t) {
            if (RandomBoolean(0.1) && this.engine.getComponentForEntity(a.entity, Viewable) != null) {
                this.particleEngine.EmitParticle(
                    RandomFloat(b.aabb.l, b.aabb.r),
                    a.aabb.t,
                    RandomFloat(-20, 20),
                    RandomFloat(-5, -15),
                    0,
                    1,
                    500,
                    1,
                    true,
                    true,
                    null,
                    4,
                    255,
                    255,
                    255,
                    255,
                );
            }
        }
        b.body.inWater = true;
    }
}
