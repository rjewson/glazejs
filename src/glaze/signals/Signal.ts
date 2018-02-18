import { SignalBinding } from "./SignalBinding";

export class Signal {
    private _bindings: SignalBinding[] = [];
    private _prevParams = null;
    public memorize: boolean = false;
    private _shouldPropagate: boolean = true;
    public active: boolean = true;

    constructor() {}

    public validateListener(listener, fnName) {
        if (typeof listener !== "function") {
            throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", fnName));
        }
    }

    private _registerListener(listener, isOnce: boolean, listenerContext, priority: number): SignalBinding {
        var prevIndex: number = this._indexOfListener(listener, listenerContext);
        var binding: SignalBinding;

        if (prevIndex !== -1) {
            binding = this._bindings[prevIndex];

            if (binding.isOnce() !== isOnce) {
                throw new Error(
                    "You cannot add" +
                        (isOnce ? "" : "Once") +
                        "() then add" +
                        (!isOnce ? "" : "Once") +
                        "() the same listener without removing the relationship first.",
                );
            }
        } else {
            binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);

            this._addBinding(binding);
        }

        if (this.memorize && this._prevParams) {
            binding.execute(this._prevParams);
        }

        return binding;
    }

    private _addBinding(binding: SignalBinding) {
        //simplified insertion sort

        var n: number = this._bindings.length;

        do {
            --n;
        } while (this._bindings[n] && binding.priority <= this._bindings[n].priority);

        this._bindings.splice(n + 1, 0, binding);
    }

    private _indexOfListener(listener, context): number {
        var n: number = this._bindings.length;
        var cur: SignalBinding;

        while (n--) {
            cur = this._bindings[n];

            if (cur.getListener() === listener && cur.context === context) {
                return n;
            }
        }

        return -1;
    }

    public has(listener, context: any = null): boolean {
        return this._indexOfListener(listener, context) !== -1;
    }

    public add(listener, listenerContext: any = null, priority: number = 0): SignalBinding {
        this.validateListener(listener, "add");

        return this._registerListener(listener, false, listenerContext, priority);
    }

    public addOnce(listener, listenerContext: any = null, priority: number = 0): SignalBinding {
        this.validateListener(listener, "addOnce");

        return this._registerListener(listener, true, listenerContext, priority);
    }

    public remove(listener, context: any = null) {
        this.validateListener(listener, "remove");

        var i: number = this._indexOfListener(listener, context);

        if (i !== -1) {
            this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
            this._bindings.splice(i, 1);
        }

        return listener;
    }

    public removeAll() {
        var n: number = this._bindings.length;

        while (n--) {
            this._bindings[n]._destroy();
        }

        this._bindings.length = 0;
    }

    public getNumListeners(): number {
        return this._bindings.length;
    }

    public halt() {
        this._shouldPropagate = false;
    }

    public dispatch(...paramsArr: any[]) {
        if (!this.active) {
            return;
        }

        var n: number = this._bindings.length;
        var bindings: SignalBinding[];

        if (this.memorize) {
            this._prevParams = paramsArr;
        }

        if (!n) {
            //should come after memorize
            return;
        }

        bindings = this._bindings.slice(0); //clone array in case add/remove items during dispatch

        this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

        do {
            n--;
        } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
    }

    public forget() {
        this._prevParams = null;
    }

    public dispose() {
        this.removeAll();

        delete this._bindings;
        delete this._prevParams;
    }

    public toString(): string {
        return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]";
    }
}
