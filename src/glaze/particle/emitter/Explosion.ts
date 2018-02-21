import { IParticleEmitter } from "./IParticleEmitter";
import { IParticleEngine } from "../engines/IParticleEngine";
import { Entity } from "../../ecs/Entity";
import { Vector2 } from "../../geom/Vector2";
import { Randomnumber } from "../../util/Random";

export class Explosion implements IParticleEmitter {
    public mass: number;
    public power: number;

    constructor(mass: number, power: number) {
        this.mass = mass;
        this.power = power;
    }

    public update(time: number, position: Vector2, engine: IParticleEngine): void {
        for (let i = 0; i < this.mass; i++) {
            var angle = Randomnumber(0, Math.PI * 2);
            var p = Randomnumber(0, this.power * 2);
            var vx = Math.cos(angle) * p;
            var vy = Math.sin(angle) * p;
            engine.EmitParticle(
                position.x,
                position.y,
                vx,
                vy,
                0,
                1,
                Randomnumber(50, 200),
                0.99,
                false,
                true,
                null,
                4,
                255,
                255,
                0,
                0,
            );
        }
    }
}
