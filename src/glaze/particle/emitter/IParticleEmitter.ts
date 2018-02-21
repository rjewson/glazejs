import { IParticleEngine } from "../engines/IParticleEngine";
import { Vector2 } from "../../geom/Vector2";

export interface IParticleEmitter {
    update(time: number, position: Vector2, engine: IParticleEngine): void;
}
