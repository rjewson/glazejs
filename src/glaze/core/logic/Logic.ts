import { Entity } from "../../ecs/Entity";
import { Health } from "../components/Health";
import { GZE } from "../../GZE";
import { State } from "../components/State";

export function onHealth(entity: Entity, health: Health ) {
    if (health.isDead()) {
        if (health.onNoHealth != null) {
            const state = GZE.engine.getComponentForEntity(entity, State);
            if (state) {
                state.setState(health.onNoHealth);
            }
        }
    }
}