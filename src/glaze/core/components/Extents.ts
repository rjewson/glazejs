import { Vector2 } from "../../geom/Vector2";

export class Extents {
    public halfWidths: Vector2;
    public offset: Vector2;

    constructor(width: number, height: number, offsetX: number = 0, offsetY: number = 0) {
        this.halfWidths = new Vector2(width, height);
        this.offset = new Vector2(offsetX, offsetY);
    }
}
