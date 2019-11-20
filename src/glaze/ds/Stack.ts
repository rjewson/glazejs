export class Stack<T> {
    private data: Array<T>;
    private size: number;
    constructor(size: number = 0) {
        this.size = size;
        this.data = [];
    }
    public push(value: T) {
        this.data.push(value);
        if (this.data.length === this.size) {
            return this.data.splice(0, 1);
        }
        return null;
    }
    public pop(): T {
        return this.data.pop();
    }
}
