import { IParticleEmitter } from "./IParticleEmitter";
import { GetC4E } from "../../ecs/Engine";
import { Vector2 } from "../../geom/Vector2";
import { IParticleEngine } from "../engines/IParticleEngine";
import { Extents } from "../../core/components/Extents";
import { RandomInteger } from "../../util/Random";

export class ScanLine implements IParticleEmitter {
    public velocity: number;
    public interval: number;
    public ttl: number;
    public jitter: number;
    public lastTime: number;

    constructor(interval: number, velocity: number, ttl: number, jitter: number) {
        this.velocity = velocity;
        this.interval = interval;
        this.ttl = ttl;
        this.jitter = jitter;
        this.lastTime = 0;
    }

    update(time: number, c4e: GetC4E, position: Vector2, particleEngine: IParticleEngine) {
        // debugger;
        if (time - this.lastTime < this.interval) return;
        this.lastTime = time;
        // var position = c4e(Position).coords;
        var extents = c4e(Extents).halfWidths;
        for (let x = 0; x < 16; x++) {
            particleEngine.EmitParticle(
                position.x - 16 + x * 2,
                position.y - extents.y,
                0,
                this.velocity + RandomInteger(-this.jitter, this.jitter),
                0,
                0,
                this.ttl,
                0.99,
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
}
