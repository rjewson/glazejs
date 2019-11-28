import { Vector2 } from "../../geom/Vector2";
import { Create } from "../../geom/Matrix3";
import { AABB2 } from "../../geom/AABB2";

export class DisplayTransform {
    public id: string;
    public position: Vector2;
    public scale: Vector2;
    public pivot: Vector2;
    public alpha: number;
    public renderable: boolean;

    public worldTransform: Float32Array;
    public worldAlpha: number;
    public localTransform: Float32Array;
    public transformedVerts: Float32Array;

    public parent: DisplayTransform;
    public prev: DisplayTransform;
    public next: DisplayTransform;

    public head: DisplayTransform;
    public tail: DisplayTransform;
    public childCount: number;

    public subTreeAABB: AABB2;

    public anchor: Vector2;
    public texture: Texture;

    private _visible: boolean;
    private _rotation: number;
    private _rotationComponents: Vector2;

    constructor() {
        this.position = new Vector2();
        this.scale = new Vector2(1, 1);
        this.pivot = new Vector2();
        this.anchor = new Vector2();

        this._rotationComponents = new Vector2();
        this.rotation = 0;
        this.alpha = 1;
        this.visible = true;
        this.renderable = false;
        // this.aabb = new AABB2();
        this.parent = null;
        this.worldTransform = Create();
        this.localTransform = Create();
    }

    get rotation(): number {
        return this._rotation;
    }

    set rotation(v: number) {
        this._rotation = v;
        this._rotationComponents.x = Math.cos(this._rotation);
        this._rotationComponents.y = Math.sin(this._rotation);
    }

    public get visible(): boolean {
        return this._visible;
    }

    public set visible(v: boolean) {
        this._visible = v;
    }

    public RoundFunction(v: number): number {
        return v;
        // return Math.round(v);
        // return Math.round( v * 10) / 10;
    }

    //TODO Rounding at the moment...
    //position.x = Math.round(position.x);
    //position.y = Math.round(position.y);

    //JS hack, much faster...
    // var positionx:number = untyped{(0.5 + position.x) >> 0;};
    // var positiony:number = untyped{(0.5 + position.y) >> 0;};
    //positionx = cast Math.round( position.x * 10) / 10;
    //positiony = cast Math.round( position.y * 10) / 10;

    // var positionx = position.x;
    // var positiony = position.y;
    public updateTransform() {
        //Reset AABB
        //this.aabb.reset();
        // super.updateTransform();

        const positionx: number = Math.floor(this.position.x);
        const positiony: number = Math.floor(this.position.y);

        const sinR = this._rotationComponents.y; //Math.sin(rotation);
        const cosR = this._rotationComponents.x; //Math.cos(rotation);

        this.localTransform[0] = cosR * this.scale.x;
        this.localTransform[1] = -sinR * this.scale.y;
        this.localTransform[3] = sinR * this.scale.x;
        this.localTransform[4] = cosR * this.scale.y;

        const parentTransform = this.parent.worldTransform;

        const a00 = this.localTransform[0];
        const a01 = this.localTransform[1];
        const a02 = positionx - (this.localTransform[0] * this.pivot.x - this.pivot.y * this.localTransform[1]);
        const a10 = this.localTransform[3];
        const a11 = this.localTransform[4];
        const a12 = positiony - (this.localTransform[4] * this.pivot.y - this.pivot.x * this.localTransform[3]);
        const b00 = parentTransform[0];
        const b01 = parentTransform[1];
        const b02 = parentTransform[2];
        const b10 = parentTransform[3];
        const b11 = parentTransform[4];
        const b12 = parentTransform[5];

        this.localTransform[2] = a02;
        this.localTransform[5] = a12;

        this.worldTransform[0] = b00 * a00 + b01 * a10;
        this.worldTransform[1] = b00 * a01 + b01 * a11;
        this.worldTransform[2] = b00 * a02 + b01 * a12 + b02;

        this.worldTransform[3] = b10 * a00 + b11 * a10;
        this.worldTransform[4] = b10 * a01 + b11 * a11;
        this.worldTransform[5] = b10 * a02 + b11 * a12 + b12;

        this.worldAlpha = this.alpha * this.parent.worldAlpha;

        this.calcExtents();
        //this.subTreeAABB.reset();
        //this.subTreeAABB.addAABB(this.aabb);
        //Expand AAABB to this DisplayObject -> New required
        var child = this.head;
        while (child != null) {
            child.updateTransform();
            //Inflate this AABB to encapsulate child
            //this.subTreeAABB.addAABB(child.aabb);
            child = child.next;
        }
    }

    public calcExtents() {
        const width = this.texture.frame.width;
        const height = this.texture.frame.height;

        const aX = this.anchor.x;
        const aY = this.anchor.y;
        const w0 = width * (1 - aX);
        const w1 = width * -aX;

        const h0 = height * (1 - aY);
        const h1 = height * -aY;

        const a = this.worldTransform[0];
        const b = this.worldTransform[3];
        const c = this.worldTransform[1];
        const d = this.worldTransform[4];
        const tx = this.worldTransform[2];
        const ty = this.worldTransform[5];

        this.transformedVerts[0] = a * w1 + c * h1 + tx;
        this.transformedVerts[1] = d * h1 + b * w1 + ty;

        this.transformedVerts[2] = a * w0 + c * h1 + tx;
        this.transformedVerts[3] = d * h1 + b * w0 + ty;

        this.transformedVerts[4] = a * w0 + c * h0 + tx;
        this.transformedVerts[5] = d * h0 + b * w0 + ty;

        this.transformedVerts[6] = a * w1 + c * h0 + tx;
        this.transformedVerts[7] = d * h0 + b * w1 + ty;

        // for (var i = 0; i < 4; i++) {
        //     this.aabb.addPoint(this.transformedVerts[i * 2], this.transformedVerts[i * 2 + 1]);
        // }
        // this.aabb.addPoint(this.transformedVerts[0], this.transformedVerts[1]);
        // this.aabb.addPoint(this.transformedVerts[2], this.transformedVerts[3]);
        // this.aabb.addPoint(this.transformedVerts[4], this.transformedVerts[5]);
        // this.aabb.addPoint(this.transformedVerts[6], this.transformedVerts[7]);
    }

    public addChild(child: DisplayTransform) {
        if (child.parent != null) child.parent.removeChild(child);
        this.insertEnd(child);
        this.childAdded(child);
    }

    public addChildAt(child: DisplayTransform, index: number) {
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

    public childAdded(child: DisplayTransform) {
        this.childCount++;
        child.parent = this;
    }

    public findChildByIndex(index: number): DisplayTransform {
        var child = this.head;
        var count = 0;
        while (child != null) {
            if (count++ == index) return child;
            child = child.next;
        }
        return this.tail;
    }

    public removeChild(child: DisplayTransform) {
        if (child.parent == this) {
            this.remove(child);
            this.childRemoved(child);
        }
    }

    public removeChildAt(index: number): DisplayTransform {
        var child = this.findChildByIndex(index);
        this.removeChild(child);
        return child;
    }

    public childRemoved(child: DisplayTransform) {
        this.childCount--;
        child.parent = null;
    }

    public insertAfter(node: DisplayTransform, newNode: DisplayTransform) {
        newNode.prev = node;
        newNode.next = node.next;
        if (node.next == null) this.tail = newNode;
        else node.next.prev = newNode;
        node.next = newNode;
    }

    public insertBefore(node: DisplayTransform, newNode: DisplayTransform) {
        newNode.prev = node.prev;
        newNode.next = node;
        if (node.prev == null) this.head = newNode;
        else node.prev.next = newNode;
        node.prev = newNode;
    }

    public insertBeginning(newNode: DisplayTransform) {
        if (this.head == null) {
            this.head = newNode;
            this.tail = newNode;
            newNode.prev = null;
            newNode.next = null;
        } else this.insertBefore(this.head, newNode);
    }

    public insertEnd(newNode: DisplayTransform) {
        if (this.tail == null) this.insertBeginning(newNode);
        else this.insertAfter(this.tail, newNode);
    }

    public remove(node: DisplayTransform) {
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
