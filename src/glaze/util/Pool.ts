type poolFactory<T> = (index: number) => T;

export class Pool<T> {

    private pool: T[];
    private factory: poolFactory<T>;
    private nextAvailableIndex: number;

    constructor(factory: poolFactory<T>) {
        this.pool = [];
        this.factory = factory;
        this.nextAvailableIndex = -1;
    }

    public addCapacity(capacity: number) {
        this.pool = [...entityRange(this.pool.length, capacity), ...this.pool];
        this.nextAvailableIndex += capacity;
    }

    public reserve(): T {
        const item = this.pool[this.nextAvailableIndex];
        this.pool[this.nextAvailableIndex] = null;
        this.nextAvailableIndex--;
        return item;
    }

    public free(item: T) {
        this.nextAvailableIndex++;
        this.pool[this.nextAvailableIndex] = item;
    }

    get capacity():number {
        return this.pool.length;
    }
}

const emptyNullArray = count => Array(count).fill(null);
const reverseOrder = (a, b) => b - a;
const entityRange = (start, len) =>
    emptyNullArray(len)
        .map((_, i) => start + i)
        .sort(reverseOrder);
