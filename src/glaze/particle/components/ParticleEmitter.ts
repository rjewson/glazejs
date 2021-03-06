import { IParticleEmitter } from "../emitter/IParticleEmitter";

export class ParticleEmitter {
    public emitters: Array<IParticleEmitter>;
    constructor(emitters: Array<IParticleEmitter>) {
        this.emitters = emitters;
    }
}
