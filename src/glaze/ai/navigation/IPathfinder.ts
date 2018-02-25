import { Node } from "./Node";

export interface IPathfinder {
    FindPath(nodes: Array<Node>, start: Node, finish: Node): Array<Node>;
}
