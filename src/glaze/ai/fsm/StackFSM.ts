import { Entity } from "../../ecs/Entity";
import { Bird } from "../../../test/components/Bird";

export type LWFSMState<T> = (t: T, fsm: LightStackStateMachine<T>, dt: number) => void;

export type LWFSME = LightStackStateMachine<Entity>;

export class LightStackStateMachine<T> {
    public stack: Array<LWFSMState<T>>;

    constructor() {
        this.stack = new Array<LWFSMState<T>>();
    }

    public update(target: T, delta: number) {
        var currentState = this.getCurrentState();

        if (currentState != null) {
            currentState(target, this, delta);
        }
    }

    public popState(): LWFSMState<T> {
        var state = this.stack.pop();
        return state;
    }

    public popAllStates() {
        while (this.stack.length > 0) this.popState();
    }

    public pushState(state: LWFSMState<T>) {
        this.stack.push(state);
    }

    public setState(state: LWFSMState<T>) {
        this.popState();
        this.pushState(state);
    }

    public resetState(state: LWFSMState<T>) {
        this.popAllStates();
        this.pushState(state);
    }

    public getCurrentState(): LWFSMState<T> {
        return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
    }
}
