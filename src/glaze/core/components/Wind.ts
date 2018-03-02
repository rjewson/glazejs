export class Wind {
    public particleCount: number;
    public incPerFrame: number;
    public particlePerUnitPerFrame: number;

    constructor(particlePerUnitPerFrame: number) {
        this.particlePerUnitPerFrame = particlePerUnitPerFrame;
        this.particleCount = 0.0;
        this.incPerFrame = 0.0;
    }
}
