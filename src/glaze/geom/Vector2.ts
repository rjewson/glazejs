export class Vector2 {
    static ZERO_TOLERANCE = 1e-8;

    public x: number;
    public y: number;

    constructor(x: number = 0.0, y: number = 0.0) {
        this.x = x;
        this.y = y;
    }

    setTo(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    copy(v: Vector2) {
        this.x = v.x;
        this.y = v.y;
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    normalize(): number {
        var t = Math.sqrt(this.x * this.x + this.y * this.y) + Vector2.ZERO_TOLERANCE;
        this.x /= t;
        this.y /= t;
        return t;
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    lengthSqrd(): number {
        return this.x * this.x + this.y * this.y;
    }

    clampScalar(max: number) {
        var l = this.length();
        if (l > max) {
            this.multEquals(max / l);
        }
    }

    clampVector(v: Vector2) {
        this.x = Math.min(Math.max(this.x, -v.x), v.x);
        this.y = Math.min(Math.max(this.y, -v.y), v.y);
    }

    plusEquals(v: Vector2) {
        this.x += v.x;
        this.y += v.y;
    }

    minusEquals(v: Vector2) {
        this.x -= v.x;
        this.y -= v.y;
    }

    multEquals(s: number) {
        this.x *= s;
        this.y *= s;
    }

    plusMultEquals(v: Vector2, s: number) {
        this.x += v.x * s;
        this.y += v.y * s;
    }

    minusMultEquals(v: Vector2, s: number) {
        this.x -= v.x * s;
        this.y -= v.y * s;
    }

    dot(v: Vector2): number {
        return this.x * v.x + this.y * v.y;
    }

    cross(v: Vector2): number {
        return this.x * v.y - this.y * v.x;
    }

    leftHandNormal(): Vector2 {
        return new Vector2(this.y, -this.x);
    }

    leftHandNormalEquals() {
        var t = this.x;
        this.x = this.y;
        this.y = -t;
    }

    rightHandNormal(): Vector2 {
        return new Vector2(-this.y, this.x);
    }

    rightHandNormalEquals() {
        var t = this.x;
        this.x = -this.y;
        this.y = t;
    }

    reflectEquals(normal: Vector2) {
        var d = this.dot(normal);
        this.x -= 2 * d * normal.x;
        this.y -= 2 * d * normal.y;
    }

    interpolate(v1: Vector2, v2: Vector2, t: number) {
        this.copy(v1);
        this.multEquals(1 - t);
        this.plusMultEquals(v2, t);
        // return v1.mult(1 - t).plus(v2.mult(t));
    }

    setAngle(angle: number) {
        var len = this.length();
        this.x = Math.cos(angle) * len;
        this.y = Math.sin(angle) * len;
    }

    rotateEquals(angle: number) {
        var a: number = angle * (Math.PI / 180);
        var cos: number = Math.cos(a);
        var sin: number = Math.sin(a);
        this.x = cos * this.x - sin * this.y;
        this.y = cos * this.y + sin * this.x;
    }

    setUnitRotation(angle: number) {
        var a: number = angle * (Math.PI / 180);
        this.x = Math.cos(a);
        this.y = Math.sin(a);
    }

    heading(): number {
        return Math.atan2(this.y, this.x);
    }

    distSqrd(v: Vector2): number {
        var dX = this.x - v.x;
        var dY = this.y - v.y;
        return dX * dX + dY * dY;
    }

    roundDown(closest): Vector2 {
        this.x = Math.floor(this.x / closest) * closest;
        this.y = Math.floor(this.y / closest) * closest;
        return this;
    }
}
