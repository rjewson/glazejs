import { Entity } from "../../ecs/Entity";
import { Engine } from "../../ecs/Engine";
import { Signal } from "../../signals/Signal";

// export type SimpleFSMStates = Map<String, any>;
export type SimpleFSMStates = { [name: string]: (engine: Engine, entity: Entity) => void };

export class SimpleFSM {
    public states: SimpleFSMStates;
    public order: Array<string>;
    public currentState: string;
    public previousState: string;
    private messages:Signal;

    constructor(states: SimpleFSMStates, initialState: string, order: Array<string>, messages:Signal) {
        this.states = states;
        this.currentState = initialState;
        this.order = order;
        this.previousState = initialState;
        this.messages = messages;
    }

    public changeState(engine: Engine, owner: Entity, newState: string) {
        if (newState == this.currentState) return this.currentState;

        if (!this.states[newState]) return this.currentState;

        this.previousState = this.currentState;
        this.currentState = newState;

        this.states[newState](engine, owner);

        return this.currentState;
    }

    public incrementState(engine: Engine, owner: Entity) {
        let currentIndex = this.order.indexOf(this.currentState);
        const nextState = ++currentIndex % this.order.length;
        this.changeState(engine, owner, this.order[nextState]);
    }

    public updateState(engine: Engine, owner: Entity) {
        if (this.states[this.currentState]) this.states[this.currentState](engine, owner);
    }
}
