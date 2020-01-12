import { System } from "../../ecs/System";
import { IParticleEngine } from "../../particle/engines/IParticleEngine";
import { Extents } from "../components/Extents";
import { EnvironmentForce } from "../../physics/components/EnvironmentForce";
import { Wind } from "../components/Wind";
import { Viewable } from "../components/Viewable";
import { PhysicsCollision } from "../../physics/components/PhysicsCollision";
import { Active } from "../components/Active";
import { Entity } from "../../ecs/Entity";
import { RandomFloat, RandomInteger } from "../../util/Random";

export class WindSystem extends System {
    public particleEngine: IParticleEngine;
    public tileSize: number;

    constructor(particleEngine: IParticleEngine, tileSize: number) {
        super([Extents, EnvironmentForce, Wind, Viewable, PhysicsCollision, Active]);
        this.particleEngine = particleEngine;
        this.tileSize = tileSize;
    }

    onEntityAdded(
        entity: Entity,
        extents: Extents,
        environmentForce: EnvironmentForce,
        wind: Wind,
        viewable: Viewable,
        physicsCollision: PhysicsCollision,
        active: Active,
    ) {
        //  public  entityAdded(entity:Entity) {
        var units = extents.halfWidths.x * extents.halfWidths.y * 4 / (this.tileSize * this.tileSize);
        wind.incPerFrame = wind.particlePerUnitPerFrame * units;
    }

    updateEntity(
        entity: Entity,
        extents: Extents,
        environmentForce: EnvironmentForce,
        wind: Wind,
        viewable: Viewable,
        physicsCollision: PhysicsCollision,
        active: Active,
    ) {
        wind.particleCount += wind.incPerFrame;
        while (wind.particleCount > 1) {
            this.particleEngine.EmitParticle(
                RandomFloat(physicsCollision.proxy.aabb.l, physicsCollision.proxy.aabb.r),
                RandomFloat(physicsCollision.proxy.aabb.t, physicsCollision.proxy.aabb.b),
                environmentForce.direction.x * environmentForce.power * 50,
                environmentForce.direction.y * environmentForce.power * 50,
                0,
                1,
                RandomInteger(200, 400),
                1,
                false,
                false,
                null,
                4,
                255,
                255,
                255,
                255,
            );
            //particleEngine.EmitParticle(RandomFloat(proxy.aabb.l,proxy.aabb.r),RandomFloat(proxy.aabb.t,proxy.aabb.b),RandomFloat(-20,20),RandomFloat(-20,20),0,1,1000,1,true,true,null,4,255,255,255,255);
            wind.particleCount--;
        }
    }
}
