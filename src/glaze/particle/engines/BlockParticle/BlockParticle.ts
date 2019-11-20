import { Vector2 } from "../../../geom/Vector2";

const INV_ALPHA: number = 1 / 255;

export class BlockParticle {
    public pX: number;
    public pY: number;

    public vX: number;
    public vY: number;

    public fX: number;
    public fY: number;

    public externalForce: Vector2;

    public age: number;
    public ttl: number;
    public damping: number;

    public decay: number;

    public size: number;
    public alpha: number;
    public red: number;
    public green: number;
    public blue: number;

    public next: BlockParticle;
    public prev: BlockParticle;

    public alphaPerUpdate: number;

    constructor() {}

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
        data1: number,
        data2: number,
        data3: number,
        data4: number,
        data5: number,
    ) {
        this.pX = x;
        this.pY = y;
        this.vX = vX;
        this.vY = vY;
        this.fX = fX;
        this.fY = fY;
        this.ttl = ttl;
        this.age = ttl;
        this.damping = damping;
        this.decay = decay;
        this.externalForce = externalForce;
        this.size = data1;
        this.alpha = data2 * INV_ALPHA;
        this.red = data3;
        this.green = data4;
        this.blue = data5;
    }

    public Update(deltaTime: number, invDeltaTime: number): boolean {
        this.vX += this.fX + this.externalForce.x;
        this.vY += this.fY + this.externalForce.y;
        this.vX *= this.damping;
        this.vY *= this.damping;
        this.pX += this.vX * invDeltaTime;
        this.pY += this.vY * invDeltaTime;
        this.age -= deltaTime;
        this.alpha -= this.decay;
        return this.age > 0;
    }
}
