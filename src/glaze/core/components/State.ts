import { SimpleFSM, SimpleFSMStates } from "../../ai/fsm/SimpleFSM";
import { Entity } from "../../ecs/Entity";
import { Signal } from "../../signals/Signal";

export class State {

    public state: SimpleFSM;
    public callback:any;
    public channels: Array<string>;
    public messages:Signal;

    constructor(states: SimpleFSMStates, initalState: string, order: Array<string>, channels?:Array<string>) {
        this.messages = new Signal();
        this.state = new SimpleFSM(states, initalState, order,this.messages);
        this.channels = channels;
    }

    // public states: SimpleFSMStates;
    // public currentState: string;
    // public order: Array<string>;
    // public messages:Signal;

    // constructor(states: SimpleFSMStates, initalState: string, order: Array<string>, channels?:Array<string>) {
    //     this.states = states;
    //     this.currentState = initalState;
    //     this.messages = new Signal();
    // }

}
