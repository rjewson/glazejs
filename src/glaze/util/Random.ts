let PseudoRandomSeed: number = 3489752;

export function SetPseudoRandomSeed(seed: number) {
    PseudoRandomSeed = seed;
}

export function Randomnumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function RandomBoolean(chance: number = 0.5): boolean {
    return Math.random() < chance;
}

export function RandomSign(chance: number = 0.5): number {
    return Math.random() < chance ? 1 : -1;
}

export function Randomnumbereger(min: number, max: number): number {
    return Math.floor(Randomnumber(min, max));
}

export function Pseudonumber(): number {
    PseudoRandomSeed = (PseudoRandomSeed * 9301 + 49297) % 233280;
    return PseudoRandomSeed / 233280.0;
}
