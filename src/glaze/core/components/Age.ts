export class Age {
    public ttl: number;
    public age: number;

    public onExpire: string;

    // public var stateOnExpired:String = EngineLifecycle.DESTROY;

    constructor(ttl: number, onExpire: string) {
        this.ttl = ttl;
        this.age = 0;
        this.onExpire = onExpire;
    }

    public growOlder(tick: number): boolean {
        this.age += tick;
        return this.isExpired();
    }

    public isExpired(): boolean {
        return this.age > this.ttl;
    }

    public reset() {
        this.age = 0;
    }
}
