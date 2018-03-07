import { AABB } from "./AABB";
import { Vector2 } from "./Vector2";

export class AABB2 {
    public l: number = Number.POSITIVE_INFINITY;
    public t: number = Number.POSITIVE_INFINITY;
    public r: number = Number.NEGATIVE_INFINITY;
    public b: number = Number.NEGATIVE_INFINITY;

    constructor(t = 0.0, r = 0.0, b = 0.0, l = 0.0) {
        this.t = t;
        this.r = r;
        this.b = b;
        this.l = l;
    }

    setToSweeptAABB(aabb: AABB, preditcedPosition: Vector2) {
        this.l = aabb.position.x - aabb.extents.x;
        this.r = aabb.position.x + aabb.extents.x;
        this.t = aabb.position.y - aabb.extents.y;
        this.b = aabb.position.y + aabb.extents.y;
    }

    fromAABB(aabb: AABB) {}

    clone(): AABB2 {
        return new AABB2(this.t, this.r, this.b, this.l);
    }

    reset() {
        this.t = this.l = Number.POSITIVE_INFINITY;
        this.r = this.b = Number.NEGATIVE_INFINITY;
    }

    get width(): number {
        return this.r - this.l;
    }

    get height(): number {
        return this.b - this.t;
    }

    intersect(aabb: AABB2): boolean {
        if (this.l > aabb.r) return false;
        else if (this.r < aabb.l) return false;
        else if (this.t > aabb.b) return false;
        else if (this.b < aabb.t) return false;
        else return true;
    }

    addAABB(aabb: AABB2) {
        if (aabb.t < this.t) this.t = aabb.t;
        if (aabb.r > this.r) this.r = aabb.r;
        if (aabb.b > this.b) this.b = aabb.b;
        if (aabb.l < this.l) this.l = aabb.l;
    }

    combine(aabb: AABB2): AABB2 {
        const result = this.clone();
        result.addAABB(aabb);
        return result;
    }

    combine2(a: AABB2, b: AABB2):AABB2 {
        this.t = Math.min(a.t, b.t);
        this.r = Math.max(a.r, b.r);
        this.b = Math.max(a.b, b.b);
        this.l = Math.min(a.l, b.l);
        return this;
    }

    addPoint(x: number, y: number) {
        if (x < this.l) this.l = x;
        if (x > this.r) this.r = x;
        if (y < this.t) this.t = y;
        if (y > this.b) this.b = y;
    }

    fitPoint(point: Vector2) {
        if (point.x < this.l) point.x = this.l;
        if (point.x > this.r) point.x = this.r;
        if (point.y < this.t) point.y = this.t;
        if (point.y > this.b) point.y = this.b;
    }

    expand(i: number) {
        this.l -= i;
        this.r += i;
        this.t -= i;
        this.b += i;
    }

    expand2(width: number, height: number) {
        this.l += width / 2;
        this.r -= width / 2;
        this.t += height / 2;
        this.b -= height / 2;
    }

    contains(aabb: AABB2): boolean {
        if (this.l <= aabb.l && this.t <= aabb.t && aabb.b < this.b && aabb.r < this.r) {
            return true;
        }
        return false;
    }

    copy(aabb: AABB2) {
        this.l = aabb.l;
        this.r = aabb.r;
        this.t = aabb.t;
        this.b = aabb.b;
    }

    copyAABB(aabb: AABB) {
        this.l = aabb.l;
        this.r = aabb.r;
        this.t = aabb.t;
        this.b = aabb.b;
    }

    transform(displacement: Vector2) {
        this.l += displacement.x;
        this.r += displacement.x;
        this.t += displacement.y;
        this.b += displacement.y;
    }

    perimeter(): number {
        return 2 * (this.width + this.height);
    }
}
