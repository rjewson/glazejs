import { Vector2 } from "../geom/Vector2";

export function lineIntersection(A: Vector2, B: Vector2, C: Vector2, D: Vector2, point: Vector2): number {
    const rTop: number = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
    const sTop: number = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
    const rBot: number = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
    const sBot: number = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);

    if (rBot == 0 || sBot == 0) {
        //lines are parallel
        return -1;
    }

    const r: number = rTop / rBot;
    const s: number = sTop / sBot;

    if (r > 0 && r < 1 && s > 0 && s < 1) {
        //A + r * (B - A)
        point.x = A.x + r * (B.x - A.x);
        point.y = A.y + r * (B.y - A.y);

        return A.distSqrd(B) * r;
    }

    return 0;
}
