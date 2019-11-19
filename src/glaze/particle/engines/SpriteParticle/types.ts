export interface JSONParticleSequencePattern {
    fps: number;
    pattern: string;
    start: number;
    end: number;
}

export interface JSONParticles {
    [k : string] : JSONParticleSequencePattern
}