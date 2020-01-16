import { System } from "../../ecs/System";
import { Health } from "../components/Health";
import { Active } from "../components/Active";
import { Entity } from "../../ecs/Entity";

export class HealthSystem extends System {
    constructor() {
        super([Health, Active]);
    }

    updateEntity(entity: Entity, health: Health, active: Active) {
        health.currentHealth -= health.accumulatedDamage;
        if (health.currentHealth>0) {
            health.currentHealth = Math.min(health.maxHealth, health.currentHealth + health.recoveryPerMs * this.dt);
        }
        if (health.accumulatedDamage) {
            health.onHealthChange(entity, health);
        }
        health.accumulatedDamage = 0;
    }
}
