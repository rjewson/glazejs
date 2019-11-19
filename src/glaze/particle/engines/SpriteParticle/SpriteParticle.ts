import { Vector2 } from "../../../geom/Vector2";
import { SpriteParticleSequence } from "./SpriteParticleSequence";

export class SpriteParticle {
    public static INV_ALPHA: number = 1 / 255;

    public pX: number;
    public pY: number;

    public plX: number;
    public plY: number;

    public vX: number;
    public vY: number;

    public fX: number;
    public fY: number;

    public type: number;
    public size: number;
    public sequence: SpriteParticleSequence;
    public currentFrame: number;
    public msPerInc: number;
    public currentInc: number;

    public externalForce: Vector2;

    public age: number;
    public ttl: number;
    public damping: number;

    public decay: number;
    public colour: number;
    public flipX: number;
    public flipY: number;
    public alpha: number;

    public construcor() {}

    public Initalize(
        x: number,
        y: number,
        vX: number,
        vY: number,
        fX: number,
        fY: number,
        ttl: number,
        damping: number,
        decay: number,
        top: boolean,
        externalForce: Vector2,
        sequence: SpriteParticleSequence,
        data2: number,
        data3: number,
        data4: number,
        data5: number
    ) {
        this.pX = this.plX = x;
        this.pY = this.plY = y;
        this.vX = vX;
        this.vY = vY;
        this.fX = fX;
        this.fY = fY;
        this.ttl = sequence.ttl();
        this.age = 0;
        this.damping = damping;
        this.decay = decay;
        this.externalForce = externalForce;
        this.sequence = sequence;
        this.currentFrame = 0;
        this.currentInc = 0;
        this.msPerInc = this.ttl / sequence.len;
        this.size = data2;
        this.flipX = data3;
        this.flipY = data4;
        this.colour = 0; //data3;
        //this.alpha = untyped{ (this.colour & 0xFF) * INV_ALPHA; }
    }
    /*    
10 frames 
5 fps
2000 ms
*/
    public Update(deltaTime: number, invDeltaTime: number): boolean {
        this.vX += this.fX + this.externalForce.x;
        this.vY += this.fY + this.externalForce.y;
        this.vX *= this.damping;
        this.vY *= this.damping;
        this.pX += this.vX * invDeltaTime;
        this.pY += this.vY * invDeltaTime;
        this.age += deltaTime;
        this.alpha = 1;
        this.currentInc += deltaTime;
        if (this.currentInc >= this.msPerInc) {
            this.currentFrame++;
            this.currentInc = 0;
        }
        // currentFrame++;// = (1/60) * sequence.fps;
        // if (currentFrame>8) currentFrame=0;
        return this.age < this.ttl;
    }
}
