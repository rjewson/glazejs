import { IParticleEngine } from "./IParticleEngine";
import { PointBlockParticleRender } from "../../graphics/render/particle/PointBlockParticleRender";
import { Vector2 } from "../../geom/Vector2";
import { Bytes2D } from "../../ds/Bytes2D";
import { BlockParticle } from "./BlockParticle";

export class BlockParticleEngine implements IParticleEngine {
    public particleCount: number;
    public deltaTime: number;
    public invDeltaTime: number;
    public activeParticles: BlockParticle;
    public cachedParticles: BlockParticle;

    public renderer: PointBlockParticleRender;
    public ZERO_FORCE: Vector2;

    public map: Bytes2D;

    constructor(particleCount: number, deltaTime: number, map: Bytes2D) {
        this.particleCount = particleCount;
        this.deltaTime = deltaTime;
        this.invDeltaTime = deltaTime / 1000;
        this.map = map;
        this.ZERO_FORCE = new Vector2();
        for (let i = 0; i < particleCount; i++) {
            var p = new BlockParticle();
            p.next = this.cachedParticles;
            this.cachedParticles = p;
        }
        this.renderer = new PointBlockParticleRender(particleCount);
    }

    public EmitParticle(
        x: number,
        y: number,
        vX: number,
        vY: number,
        fX: number,
        fY: number,
        ttl: number,
        damping: number,
        decayable: boolean,
        top: boolean,
        externalForce: Vector2,
        data1: number,
        data2: number,
        data3: number,
        data4: number,
        data5: number,
    ): boolean {
        if (this.cachedParticles == null) return false;

        var particle = this.cachedParticles;
        this.cachedParticles = this.cachedParticles.next;

        if (this.activeParticles == null) {
            this.activeParticles = particle;
            particle.next = particle.prev = null;
        } else {
            particle.next = this.activeParticles;
            particle.prev = null;
            this.activeParticles.prev = particle;
            this.activeParticles = particle;
        }

        particle.Initalize(
            x,
            y,
            vX,
            vY,
            fX,
            fY,
            ttl,
            damping,
            decayable ? this.deltaTime / ttl : 0,
            top,
            externalForce != null ? externalForce : this.ZERO_FORCE,
            data1,
            data2,
            data3,
            data4,
            data5,
        );

        return true;
    }

    public Update(): void {
        this.renderer.ResetBatch();
        var particle = this.activeParticles;
        while (particle != null) {
            var valid =
                particle.Update(this.deltaTime, this.invDeltaTime) &&
                (this.map.getReal(particle.pX, particle.pY, 0) & 1) != 1;
            if (!valid) {
                var next = particle.next;
                if (particle.prev == null) {
                    this.activeParticles = particle.next;
                } else {
                    particle.prev.next = particle.next;
                }
                if (particle.next != null) {
                    particle.next.prev = particle.prev;
                }
                particle.next = this.cachedParticles;
                this.cachedParticles = particle;

                particle = next;
            } else {
                this.renderer.AddSpriteToBatch(
                    particle.pX,
                    particle.pY,
                    particle.size,
                    (particle.alpha * 255) | 0,
                    particle.red,
                    particle.green,
                    particle.blue,
                );
                particle = particle.next;
            }
        }
    }
}
