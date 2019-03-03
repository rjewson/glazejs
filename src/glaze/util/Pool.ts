type poolFactory<T> = (index: number) => T;

export class Pool<T> {
    private pool: T[];
    private factory: poolFactory<T>;
    private nextAvailableIndex: number;
    private totalAllocationCount: number;

    constructor(factory: poolFactory<T>) {
        this.pool = [];
        this.factory = factory;
        this.nextAvailableIndex = -1;
        this.totalAllocationCount = 0;
    }

    public addCapacity(capacity: number) {
        this.pool = [...entityRange(this.pool.length, capacity, this.factory), ...this.pool];
        this.nextAvailableIndex += capacity;
    }

    public reserve(): T {
        const item = this.pool[this.nextAvailableIndex];
        this.pool[this.nextAvailableIndex] = null;
        this.nextAvailableIndex--;
        this.totalAllocationCount++;
        return item;
    }

    public free(item: T) {
        this.nextAvailableIndex++;
        this.pool[this.nextAvailableIndex] = item;
    }

    get capacity(): number {
        return this.pool.length;
    }

    get assigned(): number {
        return this.pool.length - this.nextAvailableIndex;
    }

    get totalAllocations(): number {
        return this.totalAllocationCount;
    }
}

const emptyNullArray = (count: number) => Array(count).fill(null);
const reverseOrder = (a: number, b: number) => b - a;
const entityRange = (start: number, len: number, factory: poolFactory<any>) =>
    emptyNullArray(len)
        .map((_, i) => factory(start + i))
        .sort(reverseOrder);
