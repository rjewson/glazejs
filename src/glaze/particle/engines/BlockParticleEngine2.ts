import { IParticleEngine } from "./IParticleEngine";
import { PointBlockParticleRender } from "../../graphics/render/particle/PointBlockParticleRender";
import { Vector2 } from "../../geom/Vector2";
import { Bytes2D } from "../../ds/Bytes2D";
import { BlockParticle } from "./BlockParticle";
import { BlockParticle2 } from "./BlockParticle2";

export class BlockParticleEngine2 implements IParticleEngine {
    public particleCount: number;
    public deltaTime: number;
    public invDeltaTime: number;

    public activeParticles: BlockParticle2[][];
    public activeParticlesCount: number;
    public activePool: number;

    public cachedParticles: BlockParticle2[];
    public availableParticleCount: number;

    public renderer: PointBlockParticleRender;
    public ZERO_FORCE: Vector2;

    public map: Bytes2D;

    constructor(particleCount: number, deltaTime: number, map: Bytes2D) {
        this.particleCount = particleCount;
        this.deltaTime = deltaTime;
        this.invDeltaTime = deltaTime / 1000;
        this.map = map;
        this.ZERO_FORCE = new Vector2();
        this.activeParticles = new Array();
        this.activeParticles[0] = new Array(this.particleCount);
        this.activeParticles[1] = new Array(this.particleCount);
        this.cachedParticles = new Array(this.particleCount);
        for (let i = 0; i < particleCount; i++) {
            this.cachedParticles[i] = new BlockParticle2();
        }
        this.availableParticleCount = this.particleCount;
        this.activeParticlesCount = 0;
        this.activePool = 0;
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
        if (this.availableParticleCount == 0) return false;
        var particle = this.cachedParticles[--this.availableParticleCount];
        this.activeParticles[this.activePool][this.activeParticlesCount++] = particle;

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
        const poolA = this.activeParticles[this.activePool];
        const poolB = this.activeParticles[this.activePool === 1 ? 0 : 1];
        var newCount = 0;
        for (var i = 0; i < this.activeParticlesCount; i++) {
            const particle = poolA[i];
            if (
                particle.Update(this.deltaTime, this.invDeltaTime)
            ) {
                if ((this.map.getReal(particle.pX, particle.pY, 0) & 1) === 1) {
                    const plX = this.map.Index(particle.plX);
                    const plY = this.map.Index(particle.plY);
                    const pX = this.map.Index(particle.pX);
                    const pY = this.map.Index(particle.pY);
                    if (pX != plX) {
                        particle.vX *= -0.99;
                        particle.pX = particle.plX;
                    }
                    if (pY != plY) {
                        particle.vY *= -0.99;
                        particle.pY = particle.plY;
                    } 
                }
                this.renderer.AddSpriteToBatch(
                    particle.pX,
                    particle.pY,
                    particle.size,
                    (particle.alpha * 255) | 0,
                    particle.red,
                    particle.green,
                    particle.blue,
                );
                poolB[newCount++] = particle;
            } else {
                this.cachedParticles[this.availableParticleCount++] = particle;
            }
        }
        this.activeParticlesCount = newCount;
        this.activePool = this.activePool === 1 ? 0 : 1;
    }
}
