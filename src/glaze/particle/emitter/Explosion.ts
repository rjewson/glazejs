import { IParticleEmitter } from "./IParticleEmitter";
import { IParticleEngine } from "../engines/IParticleEngine";
import { Entity } from "../../ecs/Entity";
import { Vector2 } from "../../geom/Vector2";
import { RandomFloat } from "../../util/Random";
import { Engine, GetC4E } from "../../ecs/Engine";
const g = new Vector2(0,9);
export class Explosion implements IParticleEmitter {
    public mass: number;
    public power: number;

    constructor(mass: number, power: number) {
        this.mass = mass;
        this.power = power;
    }

    update(time: number, c4e: GetC4E, position: Vector2, particleEngine: IParticleEngine) {
        for (let i = 0; i < this.mass; i++) {
            var angle = RandomFloat(0, Math.PI * 2);
            var p = RandomFloat(0, this.power * 2);
            var vx = Math.cos(angle) * p;
            var vy = Math.sin(angle) * p;
            particleEngine.EmitParticle(
                position.x,
                position.y,
                vx,
                vy,
                0,
                1,
                RandomFloat(250, 500),
                0.999,
                true,
                true,
                g,
                4,
                255,
                255,
                0,
                0,
            );
        }
        particleEngine.EmitParticle(
            position.x,
            position.y,
            vx,
            vy,
            0,
            1,
            RandomFloat(250, 500),
            0.999,
            true,
            true,
            g,
            4,
            0,
            0,
            0,
            0,
        );
    }
}
