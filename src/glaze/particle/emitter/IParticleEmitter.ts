import { IParticleEngine } from "../engines/IParticleEngine";
import { Vector2 } from "../../geom/Vector2";
import { GetC4E } from "../../ecs/Engine";

export interface IParticleEmitter {
    update(time: number, c4e: GetC4E, position: Vector2, particleEngine: IParticleEngine): void;
}
