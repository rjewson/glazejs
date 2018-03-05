import { BeeHive } from "../components/BeeHive";
import { Viewable } from "../../glaze/core/components/Viewable";
import { Active } from "../../glaze/core/components/Active";
import { System } from "../../glaze/ecs/System";
import { Entity } from "../../glaze/ecs/Entity";
import { RandomBoolean } from "../../glaze/util/Random";
import { BeeFactory } from "../factories/character/BeeFactory";
import { Position } from "../../glaze/core/components/Position";
import { State } from "../../glaze/core/components/State";
import { EntityState } from "../../glaze/core/state/EntityStates";

export class BeeHiveSystem extends System {
    constructor() {
        super([BeeHive, Viewable, Active]);
    }

    onEntityRemoved(entity: Entity, beehive: BeeHive, viewable: Viewable, active: Active) {
        beehive.group.members.forEach(bee => {
            // this.engine.destroyEntity(bee);
            const state:State = this.engine.getComponentForEntity(bee,State);
            state.setState(EntityState.Destroy);

        });
    }

    updateEntity(entity: Entity, beehive: BeeHive, viewable: Viewable, active: Active) {
        if (beehive.group.hasCapacity()) {
            if (RandomBoolean(0.01)) {
                var newBee = BeeFactory.create(
                    this.engine,
                    this.engine.getComponentForEntity(entity, Position).clone(),
                );
                const state = this.engine.getComponentForEntity(newBee,State)
                // newBee.parent = entity;
                beehive.group.addMember(newBee, state);
            }
        }
    }
}
