import { System } from "../../ecs/System";
import { Health } from "../components/Health";
import { Active } from "../components/Active";
import { Entity } from "../../ecs/Entity";
import { State } from "../components/State";

export class HealthSystem extends System {
    constructor() {
        super([Health, State, Active]);
    }

    updateEntity(entity: Entity, health: Health, state:State, active: Active) {
        if (health.currentHealth <= 0) {
            if (health.onNoHealth != null) {
                state.setState(health.onNoHealth);
                // health.onNoHealth(this.engine, entity);
            }
        } else {
            health.currentHealth = Math.min(health.maxHealth, health.currentHealth + health.recoveryPerMs * this.dt);
        }
    }
}
