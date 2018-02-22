import { System } from "../../ecs/System";
import { Health } from "../components/Health";
import { Active } from "../components/Active";
import { Entity } from "../../ecs/Entity";

export class HealthSystem extends System {
    constructor() {
        super([Health, Active]);
    }

    updateEntity(entity: Entity, health: Health, active: Active) {
        if (health.currentHealth <= 0) {
            if (health.onNoHealth != null) {
                health.onNoHealth(entity);
            }
        } else {
            health.currentHealth = Math.min(health.maxHealth, health.currentHealth + health.recoveryPerMs * this.dt);
        }
    }
}
