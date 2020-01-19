import { IParticleEmitter } from "./IParticleEmitter";
import { GetC4E } from "../../ecs/Engine";
import { Vector2 } from "../../geom/Vector2";
import { IParticleEngine } from "../engines/IParticleEngine";
import { Extents } from "../../core/components/Extents";
import { RandomInteger } from "../../util/Random";

export class FireEmitter implements IParticleEmitter {
    public intensity: number;
    public jitter: number;

    constructor(intensity: number) {
        this.intensity = -intensity;
        this.jitter = 10;
    }

    update(time: number, c4e: GetC4E, position: Vector2, particleEngine: IParticleEngine) {
        const extents: Extents = c4e(Extents);
        for (let x = 0; x < extents.halfWidths.x * 2; x+=4) {
            particleEngine.EmitParticle(
                position.x - extents.halfWidths.x + x,// * 4,
                position.y-2,
                RandomInteger(-this.jitter, this.jitter)*10,
                this.intensity + RandomInteger(-this.jitter, this.jitter),
                0,
                0,
                RandomInteger(60, 300),
                0.99,
                true,
                true,
                null,
                4,
                255,
                256,
                0,
                0,
            );
        }
    }
}
