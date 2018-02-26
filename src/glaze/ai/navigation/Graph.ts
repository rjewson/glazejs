import { IPathfinder } from "./IPathfinder";
import { Node } from "./Node";
import { Vector2 } from "../../geom/Vector2";

export class Graph {
    public nodes: Array<Node>;
    public nodeLookup: Map<string, Node>;

    public pathfinder: IPathfinder;

    constructor() {
        this.nodes = new Array<Node>();
        this.nodeLookup = new Map();
    }

    public Reset() {
        this.nodes.forEach(node => node.reset());
    }

    public GetCreateNode(x: number, y: number): Node {
        var hash = this.HashCoords(x, y);
        var node = this.nodeLookup.get(hash);

        if (node == null) {
            node = new Node(x, y);
            this.nodes.push(node);
            this.nodeLookup.set(hash, node);
        }

        return node;
    }

    public GetNode(x: number, y: number): Node {
        return this.nodeLookup.get(this.HashCoords(x, y));
    }

    public HashCoords(x: number, y: number): string {
        return x + ":" + y;
    }

    public Search(start: Node, finish: Node): Array<Node> {
        this.Reset();
        return this.pathfinder != null ? this.pathfinder.FindPath(this.nodes, start, finish) : null;
    }

    public static ConvertNodeListToWorldCoords(nodes: Array<Node>, tileSize: number): Array<Vector2> {
        var result = new Array<Vector2>();
        var count = nodes.length;
        var tileHalfSize = new Vector2(tileSize / 2, tileSize / 2);

        for (var i = 0; i < count; i++) {
            var coord = nodes[count - 1 - i].position.clone();
            coord.multEquals(tileSize);
            coord.plusEquals(tileHalfSize);
            result.push(coord);
        }
        return result;
    }
}
