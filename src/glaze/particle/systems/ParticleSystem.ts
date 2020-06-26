import { System } from "../../ecs/System";
import { Position } from "../../core/components/Position";
import { Active } from "../../core/components/Active";
import { Entity } from "../../ecs/Entity";
import { ParticleEmitter } from "../components/ParticleEmitter";
import { IParticleEngine } from "../engines/types";

export class ParticleSystem extends System {
    private blockParticleEngine: IParticleEngine;
    constructor(blockParticleEngine: IParticleEngine) {
        super([Position, Active, ParticleEmitter]);
        this.blockParticleEngine = blockParticleEngine;
    }

    updateEntity(entity: Entity, position: Position, active: Active, particleEmitter: ParticleEmitter) {
        for (const emitter of particleEmitter.emitters) {
            emitter.update(this.timestamp, this.engine.c4e.get(entity), position.coords, this.blockParticleEngine);
        }
    }

    public postUpdate() {
        this.blockParticleEngine.Update();
    }
}
