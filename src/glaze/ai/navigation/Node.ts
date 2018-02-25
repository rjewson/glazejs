import { Vector2 } from "../../geom/Vector2";
import { Edge } from "./Edge";

export class Node {
    public position: Vector2;
    public parent: Node;
    public f: number;
    public g: number;
    public h: number;

    public links: Array<Edge>;

    public walkable: boolean;

    constructor(x: number, y: number) {
        this.position = new Vector2(x, y);
        this.f = 0;
        this.g = 0;
        this.h = 0;

        this.links = new Array<Edge>();

        this.walkable = true;
    }

    public reset() {
        parent = null;
        this.f = this.g = this.h = 0;
    }

    public setG(o: Edge) {
        this.g = this.parent.g + o.distance;
    }

    public setF(finish: Node) {
        this.setH(finish);
        this.f = this.g + this.h;
    }

    public setH(finish: Node) {
        this.h = this.dist(finish);
    }

    public dist(n: Node): number {
        return this.position.distSqrd(n.position);
    }

    public connect(n: Node) {
        this.links.push(new Edge(n, this.dist(n)));
    }
}
