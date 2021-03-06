import { IParticleEmitter } from "./IParticleEmitter";
import { Vector2 } from "../../geom/Vector2";
import { RandomInteger, RandomSign } from "../../util/Random";
import { GetC4E } from "../../ecs/Engine";
import { IParticleEngine } from "../engines/types";

export class SpriteFireBall implements IParticleEmitter {
    public rate: number;
    public speed: number;

    constructor(rate: number, speed: number) {
        this.rate = rate;
        this.speed = speed;
    }

    update(time: number, c4e: GetC4E, position: Vector2, particleEngine: IParticleEngine) {
        particleEngine.EmitParticle(
            position.x,
            position.y,
            0,
            0,
            0,
            0,
            1000,
            0.9,
            true,
            true,
            null,
            RandomInteger(0, 3),
            RandomInteger(16, 32),
            RandomSign(0.5),
            RandomSign(0.5),
            0
        );
        // for (let i = 0; i < 5; i++) {
        //     var angle = RandomFloat(0,2*Math.PI);
        //     var vx = velocity.x + (Math.cos(angle) * this.speed*RandomFloat(0,2));
        //     var vy = velocity.y + (Math.sin(angle) * this.speed*RandomFloat(0,2));
        //     particleEngine.EmitParticle(position.x,position.y,vx,vy,0,0,100,0.7,true,true,null,4,255, 229,252,114);
        // }
    }
}
