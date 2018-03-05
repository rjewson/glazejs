import { System } from "../../ecs/System";
import { Entity } from "../../ecs/Entity";
import { State } from "../components/State";
import { MessageBus } from "../../util/MessageBus";
import { Engine } from "../../ecs/Engine";

export class StateSystem extends System {
    public updates: Array<Entity>;

    constructor() {
        super([State]);
        this.updates = new Array();
    }

    onEntityAdded(entity: Entity, state: State) {
        state.onChange = this.onChange.bind(this, entity);
    }

    onEntityRemoved(entity: Entity, state: State) {}

    updateAllEntities() {
        while (this.updates.length > 0) {
            var entity = this.updates.pop();
            var state = this.engine.getComponentForEntity(entity, State);
            if (state === null || state.currentState === null) return;
            // if (state.states[state.currentState]) {
                state.states[state.currentState](this.engine, entity);
                state.messages.dispatch(entity, state.currentState);
            // } else {
            //     debugger;
            // }
        }
    }

    public onChange(entity: Entity) {
        this.updates.push(entity);
    }

}
