import { SimpleFSM, SimpleFSMStates } from "../../ai/fsm/SimpleFSM";
import { Entity } from "../../ecs/Entity";
import { Signal } from "../../signals/Signal";

export class State {

    public states: SimpleFSMStates;
    public currentState: string;
    public order: Array<string>;
    public messages:Signal;
    public onChange: () => void;

    constructor(states: SimpleFSMStates, initalState: string, triggerInitialState:boolean) { //order: Array<string>, channels?:Array<string>) {
        this.states = states;
        this.currentState = initalState;
        this.messages = new Signal();
    }

    public setState(state:string) {
        if (state=="alive") {
            debugger;
        }
        console.log(state);
        this.currentState = state;
        if (this.onChange != null) {
            this.onChange();
        }
    }

}
