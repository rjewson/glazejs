import { Vector2 } from "./Vector2";

export class Plane {
    public n: Vector2 = new Vector2();
    public d: number = 0;

    constructor() {}

    public set(n: Vector2, q: Vector2) {
        this.n.copy(n);
        this.d = this.n.dot(q);
    }

    public setFromSegment(s: Vector2, e: Vector2) {
        this.n.copy(s);
        this.n.minusEquals(e);
        this.n.normalize();
        this.n.leftHandNormalEquals();
        this.d = this.n.dot(s);
    }

    public distancePoint(q: Vector2): number {
        return this.n.dot(q) - this.d;
    }
}
