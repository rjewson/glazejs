import { System } from "../../ecs/System";
import { Position } from "../../core/components/Position";
import { Active } from "../../core/components/Active";
import { Entity } from "../../ecs/Entity";
import { ParticleEmitter } from "../components/ParticleEmitter";
import { SpriteParticleEngine } from "../engines/SpriteParticle/SpriteParticleEngine";
import { SpriteParticleEmitter } from "../components/SpriteParticleEmitter";

export class SpriteParticleSystem extends System {
    private spriteParticleEngine: SpriteParticleEngine;
    constructor(spriteParticleEngine: SpriteParticleEngine) {
        super([Position, Active, SpriteParticleEmitter]);
        this.spriteParticleEngine = spriteParticleEngine;
    }

    updateEntity(entity: Entity, position: Position, active: Active, particleEmitter: ParticleEmitter) {
        for (const emitter of particleEmitter.emitters) {
            emitter.update(this.timestamp, this.engine.c4e.get(entity), position.coords, this.spriteParticleEngine);
        }
    }

    public postUpdate() {
        this.spriteParticleEngine.Update();
    }
}
