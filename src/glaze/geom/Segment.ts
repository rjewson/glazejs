import { Vector2 } from "./Vector2";

export class Segment {
    public start: Vector2 = new Vector2();
    public end: Vector2 = new Vector2();
    public delta: Vector2 = new Vector2();
    public scale: Vector2 = new Vector2();
    public sign: Vector2 = new Vector2();

    constructor() {}

    public set(s: Vector2, e: Vector2) {
        this.start.copy(s);
        this.end.copy(e);
        this.delta.copy(this.end);
        this.delta.minusEquals(this.start);
        this.scale.setTo(1 / this.delta.x, 1 / this.delta.y);
        this.sign.x = this.delta.x < 0 ? -1 : 1;
        this.sign.y = this.delta.y < 0 ? -1 : 1;
    }
}
