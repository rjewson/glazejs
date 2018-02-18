import { Vector2 } from "../../geom/Vector2";

export class Position {
    public coords: Vector2;
    public prevCoords: Vector2;
    public direction: Vector2;

    constructor(x: number, y: number) {
        this.coords = new Vector2(x, y);
        this.prevCoords = new Vector2(x, y);
        this.direction = new Vector2(1, 1);
    }

    public update(position: Vector2) {
        this.prevCoords.copy(this.coords);
        this.coords.copy(position);
    }

    public clone(): Position {
        var clone = new Position(this.coords.x, this.coords.y);
        clone.prevCoords.copy(this.prevCoords);
        clone.direction.copy(this.direction);
        return clone;
    }
}
