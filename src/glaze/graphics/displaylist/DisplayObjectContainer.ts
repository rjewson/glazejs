import { DisplayObject } from "./DIsplayObject";
import { AABB2 } from "../../geom/AABB2";
import { Stage } from "./Stage";

export class DisplayObjectContainer extends DisplayObject {
    public head: DisplayObject;
    public tail: DisplayObject;
    public childCount: number;

    public subTreeAABB: AABB2;

    constructor() {
        super();
        this.subTreeAABB = new AABB2();
        this.childCount = 0;
    }

    public addChild(child: DisplayObject) {
        if (child.parent != null) child.parent.removeChild(child);
        this.insertEnd(child);
        this.childAdded(child);
    }

    public addChildAt(child: DisplayObject, index: number) {
        if (index >= this.childCount) {
            this.addChild(child);
            return;
        }
        if (index == 0) {
            this.insertBeginning(child);
        } else {
            this.insertBefore(this.findChildByIndex(index), child);
        }
        this.childAdded(child);
    }

    private childAdded(child: DisplayObject) {
        this.childCount++;
        child.parent = this;
    }

    private findChildByIndex(index: number): DisplayObject {
        var child = this.head;
        var count = 0;
        while (child != null) {
            if (count++ == index) return child;
            child = child.next;
        }
        return this.tail;
    }

    public removeChild(child: DisplayObject) {
        if (child.parent == this) {
            this.remove(child);
            this.childRemoved(child);
        }
    }

    public removeChildAt(index: number): DisplayObject {
        var child = this.findChildByIndex(index);
        this.removeChild(child);
        return child;
    }

    private childRemoved(child: DisplayObject) {
        this.childCount--;
        child.parent = null;
    }

    public updateTransform() {
        //Reset AABB
        this.aabb.reset();
        super.updateTransform();
        this.calcExtents();
        this.subTreeAABB.reset();
        this.subTreeAABB.addAABB(this.aabb);
        //Expand AAABB to this DisplayObject -> New required
        var child = this.head;
        while (child != null) {
            child.updateTransform();
            //Inflate this AABB to encapsulate child
            this.subTreeAABB.addAABB(child.aabb);
            child = child.next;
        }
    }

    // public apply(slot:DisplayObject->Dynamic->Void,p:Dynamic=null) {

    // }

    //TODO Probably get rid of this...

    //Linked Lists
    public insertAfter(node: DisplayObject, newNode: DisplayObject) {
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next == null) this.tail = newNode;
        else node.next.prev = newNode;
        node.next = newNode;
    }

    public insertBefore(node: DisplayObject, newNode: DisplayObject) {
        newNode.prev = node.prev;
        newNode.next = node;
        if (node.prev == null) this.head = newNode;
        else node.prev.next = newNode;
        node.prev = newNode;
    }

    public insertBeginning(newNode: DisplayObject) {
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
            newNode.prev = null;
            newNode.next = null;
        } else this.insertBefore(this.head, newNode);
    }

    public insertEnd(newNode: DisplayObject) {
        if (this.tail == null) this.insertBeginning(newNode);
        else this.insertAfter(this.tail, newNode);
    }

    public remove(node: DisplayObject) {
        if (node.prev == null) this.head = node.next;
        else node.prev.next = node.next;
        if (node.next == null) this.tail = node.prev;
        else node.next.prev = node.prev;
        node.prev = node.next = null;
    }

    public debug() {
        var child = this.head;
        while (child != null) {
            child = child.next;
        }
    }
}
