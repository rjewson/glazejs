import { HealthChangeCb } from "../logic/types";

export class Health {

    public accumulatedDamage: number;
    public readonly recoveryPerMs: number;

    constructor(
        public maxHealth: number,
        public currentHealth: number,
        public recoveryPerSecond: number,
        public onNoHealth: string,
        public onHealthChange: HealthChangeCb,
    ) {
        this.accumulatedDamage = 0;
        this.recoveryPerMs = recoveryPerSecond / 1000;
    }

    public applyDamage(damageAmount: number) {
        this.accumulatedDamage += damageAmount;
    }

    public isDead(): boolean {
        return this.currentHealth <= 0;
    }
}
