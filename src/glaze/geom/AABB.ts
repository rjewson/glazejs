import { Vector2 } from "./Vector2";
import { AABB2 } from "./AABB2";

export class AABB {
    public position: Vector2 = new Vector2();
    public extents: Vector2 = new Vector2();

    constructor() {}

    get l(): number {
        return this.position.x - this.extents.x;
    }
    get t(): number {
        return this.position.y - this.extents.y;
    }
    get r(): number {
        return this.position.x + this.extents.x;
    }
    get b(): number {
        return this.position.y + this.extents.y;
    }

    /*
     *  Standard AABB overlap.  Only returns a boolean, which isnt much use if you need to actually resolve anything.
     */
    overlap(aabb: AABB): boolean {
        if (Math.abs(this.position.x - aabb.position.x) > this.extents.x + aabb.extents.x) return false;
        if (Math.abs(this.position.y - aabb.position.y) > this.extents.y + aabb.extents.y) return false;
        return true;
    }

    containsAABB(aabb: AABB): boolean {
        return false;
    }

    containsPoint(point: Vector2): boolean {
        return (
            Math.abs(point.x - this.position.x) < this.extents.x && Math.abs(point.y - this.position.y) < this.extents.y
        );
    }

    overlapArea(aabb: AABB): number {
        var _l = Math.max(this.l, aabb.l);
        var _r = Math.min(this.r, aabb.r);
        var _t = Math.max(this.t, aabb.t);
        var _b = Math.min(this.b, aabb.b);
        return (_r - _l) * (_b - _t);
    }

    area(): number {
        return this.extents.x * this.extents.y * 4;
    }

    toAABB2(): AABB2 {
        return new AABB2(this.t, this.r, this.b, this.l);
    }

    copyToAABB2(aabb2: AABB2) {
        aabb2.t = this.t;
        aabb2.r = this.r;
        aabb2.b = this.b;
        aabb2.l = this.l;
    }

    clone(aabb: AABB): AABB {
        var aabb = new AABB();
        aabb.position.copy(this.position);
        aabb.extents.copy(this.extents);
        return aabb;
    }
}
