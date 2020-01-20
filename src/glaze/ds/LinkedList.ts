import { Pool } from "../util/Pool";

export interface LinkedListNode {
    next?: LinkedListNode;
    previous?: LinkedListNode;
    length?: number;
}

export class PooledLinkedList<T extends LinkedListNode> {
    private head: T = null;
    private tail: T = null;
    private len: number;
    private nodePool: Pool<T>;

    constructor(poolSize: number, factory) {
        this.nodePool = new Pool(factory);
        this.nodePool.addCapacity(200);
        this.len = 0;
    }

    get length() {
        return this.len;
    }

    public insertAfter(node: T): T {
        const newNode = this.nodePool.reserve();
        newNode.previous = node;
        newNode.next = node.next;
        if (node.next == null) this.tail = newNode;
        else node.next.previous = newNode;
        node.next = newNode;
        return newNode;
    }

    public insertBefore(node: T): T {
        const newNode = this.nodePool.reserve();
        newNode.previous = node.previous;
        newNode.next = node;
        if (node.previous == null) this.head = newNode;
        else node.previous.next = newNode;
        node.previous = newNode;
        return newNode;
    }

    public insertBeginning(): T {
        if (this.head == null) {
            const newNode = this.nodePool.reserve();
            this.head = newNode;
            this.tail = newNode;
            newNode.previous = null;
            newNode.next = null;
            return newNode;
        } else return this.insertBefore(this.head);
    }

    public insertEnd(): T {
        if (this.tail == null) return this.insertBeginning();
        else return this.insertAfter(this.tail);
    }

    public remove(node: LinkedListNode) {
        if (node.previous == null) this.head = <T>node.next;
        else node.previous.next = node.next;
        if (node.next == null) this.tail = <T>node.previous;
        else node.next.previous = node.previous;
        node.previous = node.next = null;
    }

    public clear() {
        var node = this.head;
        while (node) {
            this.nodePool.free(node);
        }
        this.head = this.tail = null;
    }
}
