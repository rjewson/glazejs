import { System } from "../../ecs/System";
import { Age } from "../components/Age";
import { Active } from "../components/Active";
import { Entity } from "../../ecs/Entity";

export class AgeSystem extends System {
    constructor() {
        super([Age, Active]);
    }

    updateEntity(entity: Entity, age: Age, active: Active) {
        if (age.growOlder(this.dt)) {
            if (age.onExpire != null) age.onExpire(this.engine,entity);
        }
    }
}
