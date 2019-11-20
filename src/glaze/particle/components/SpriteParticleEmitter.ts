import { IParticleEmitter } from "../emitter/IParticleEmitter";

export class SpriteParticleEmitter {
    public emitters: Array<IParticleEmitter>;
    constructor(emitters: Array<IParticleEmitter>) {
        this.emitters = emitters;
    }
}
