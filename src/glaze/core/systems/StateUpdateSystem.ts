import { System } from "../../ecs/System";
import { Entity } from "../../ecs/Entity";
import { State } from "../components/State";
import { MessageBus } from "../../util/MessageBus";
import { Engine } from "../../ecs/Engine";
import { StateUpdater } from "../components/StateUpdater";

export class StateUpdateSystem extends System {
    public bus: MessageBus;

    constructor(bus: MessageBus) {
        super([State, StateUpdater]);
        this.bus = bus;
    }

    onEntityAdded(entity: Entity, state: State, stateUpdater: StateUpdater) {
        stateUpdater.onChange = this.onChange.bind(this, entity);
        this.bus.registerChannels([stateUpdater.channel], stateUpdater.onChange);
    }

    onEntityRemoved(entity: Entity, state: State, stateUpdater: StateUpdater) {
        this.bus.unregisterChannels([stateUpdater.channel], stateUpdater.onChange);
    }

    updateAllEntities() {}

    public onChange(entity: Entity) {
        var state: State = this.engine.getComponentForEntity(entity, State);
        var stateUpdater = this.engine.getComponentForEntity(entity, StateUpdater);

        let currentIndex = stateUpdater.sequence.indexOf(state.currentState);
        const nextState = ++currentIndex % stateUpdater.sequence.length;
        state.setState(stateUpdater.sequence[nextState]);
    }
}
