import { Node } from "./Node";

export class Edge {
    public node: Node;
    public distance: number;

    constructor(node: Node, distance: number) {
        this.node = node;
        this.distance = distance;
    }
}
