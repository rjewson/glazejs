export class Health {
    public maxHealth: number;
    public currentHealth: number;
    public recoveryPerSecond: number;
    public recoveryPerMs: number;

    public onNoHealth: string;

    constructor(
        maxHealth: number,
        currentHealth: number,
        recoveryPerSecond: number,
        onNoHealth: string,
    ) {
        this.maxHealth = maxHealth;
        this.currentHealth = currentHealth;
        this.recoveryPerSecond = recoveryPerSecond;
        this.recoveryPerMs = recoveryPerSecond / 1000;
        this.onNoHealth = onNoHealth;
    }

    public applyDamage(damageAmount: number) {
        this.currentHealth -= damageAmount;
    }

    public isDead(): boolean {
        return this.currentHealth <= 0;
    }
}
