import { System } from "../../ecs/System";
import { Age } from "../components/Age";
import { Active } from "../components/Active";
import { Entity } from "../../ecs/Entity";
import { State } from "../components/State";

export class AgeSystem extends System {
    constructor() {
        super([Age, State, Active]);
    }

    updateEntity(entity: Entity, age: Age, state:State, active: Active) {
        if (age.growOlder(this.dt)) {
            if (age.onExpire != null) {
                state.setState(age.onExpire);
            }
        }
    }
}
