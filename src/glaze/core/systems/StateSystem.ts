import { System } from "../../ecs/System";
import { Entity } from "../../ecs/Entity";
import { State } from "../components/State";
import { MessageBus } from "../../util/MessageBus";
import { Engine } from "../../ecs/Engine";

export class StateSystem extends System {
    public bus: MessageBus;
    
    constructor(bus: MessageBus) {
        super([State]);
        this.bus = bus;
    }

    onEntityAdded(entity: Entity, state: State) {
        if (state.channels) {
            state.callback = this.updateEntity.bind(this,entity,state);
            this.bus.registerChannels(state.channels, state.callback);
        }
    }
    onEntityRemoved(entity: Entity, state: State) {
        if (state.channels) {
            this.bus.unregisterChannels(state.channels, state.callback);
        }
    }

    updateAllEntities() {}

    updateEntity(entity:Entity, state:State) {
        state.state.incrementState(this.engine,entity);
    }
}
