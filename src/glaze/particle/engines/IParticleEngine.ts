import { Vector2 } from "../../geom/Vector2";

export interface IParticleEngine {
    Update(): void;
    EmitParticle(
        x: number,
        y: number,
        vX: number,
        vY: number,
        fX: number,
        fY: number,
        ttl: number,
        damping: number,
        decayable: boolean,
        top: boolean,
        externalForce: Vector2,
        data1: number,
        data2: number,
        data3: number,
        data4: number,
        data5: number,
    ): boolean;
}
