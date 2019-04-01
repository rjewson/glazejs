import { Engine } from "./ecs/Engine";
import { Rectangle } from "./geom/Rectangle";

export class GZE {
    static tileSize: number = 16;
    static bounds: Rectangle;
    static engine: Engine = null;
}