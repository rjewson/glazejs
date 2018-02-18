import { Signal } from "./Signal";

export class SignalBinding {
    private _listener;
    private _isOnce: boolean;

    public context;
    private _signal: Signal;
    public priority: number;
    public active: boolean = true;
    public params = null;

    constructor(signal: Signal, listener, isOnce: boolean, listenerContext, priority: number = 0) {
        this._listener = listener;
        this._isOnce = isOnce;
        this.context = listenerContext;
        this._signal = signal;
        this.priority = priority || 0;
    }

    public execute(paramsArr?: any[]) {
        var handlerReturn;
        var params;

        if (this.active && !!this._listener) {
            params = this.params ? this.params.concat(paramsArr) : paramsArr;

            handlerReturn = this._listener.apply(this.context, params);

            if (this._isOnce) {
                this.detach();
            }
        }

        return handlerReturn;
    }

    public detach() {
        return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
    }

    public isBound(): boolean {
        return !!this._signal && !!this._listener;
    }

    public isOnce(): boolean {
        return this._isOnce;
    }

    public getListener() {
        return this._listener;
    }

    public getSignal() {
        return this._signal;
    }

    public _destroy() {
        delete this._signal;
        delete this._listener;
        delete this.context;
    }

    public toString(): string {
        return (
            "[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]"
        );
    }
}
