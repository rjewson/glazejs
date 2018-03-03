import { Signal } from "../signals/Signal";

export class MessageBus {

    private bus:Map<string, Signal>;

    constructor() {
        this.bus = new Map();
    }

    public registerChannels(channels:Array<string>, listener:any) {
        channels.forEach(name=>{
            if (!this.bus.has(name)) {
                this.bus.set(name,new Signal());
            }
            this.bus.get(name).add(listener);
        })
    }

    public unregisterChannels(channels:Array<string>, listener:any) {
        channels.forEach(name=>{
            if (this.bus.has(name)) {
                this.bus.get(name).remove(listener);
            }
        })
    }

    public trigger(channel:string, data:any) {
        if (this.bus.has(channel)) {
            this.bus.get(channel).dispatch(data);
        }
    }

}