package glaze.ai.navigation;

import haxe.ds.GenericStack;

/**
 * ...
 * @author rje
 */

class AStar implements IPathfinder
{

	public function new() 
	{
		
	}
	
	public function FindPath(nodes:Array<Node>, start:Node, finish:Node):Array<Node> {
		
		var open = new GenericStack<Node>();
		var closed = new GenericStack<Node>();
		
		open.add(start);
		while (!open.isEmpty()) {
		//while(open.size() > 0){
			var lowest:Float = Math.POSITIVE_INFINITY;
			//float lowest = Float.MAX_VALUE;
			//int c = -1;
			var current:Node = null;
			for (node in open) {
				if (node.f < lowest)
					current = node;
			}
			open.remove(current);
			closed.add(current);
			if(current == finish){
				break;
			}
			
			for (edge in current.links) {
				var adjacent = edge.node;
				if (adjacent.walkable && Lambda.indexOf(closed, adjacent) < 0) {
					if (Lambda.indexOf(open, adjacent) < 0) {
						open.add(adjacent);
						adjacent.parent = current;
						adjacent.setG(edge);
						adjacent.setF(finish);
					} else if(adjacent.g > current.g + edge.distance){
						adjacent.parent = current;
						adjacent.setG(edge);
						adjacent.setF(finish);
					}
				}
			}
		}
		
		// Path generation
		var path = new Array<Node>();
		var pathNode:Node = finish;
		while(pathNode != null){
			path.push(pathNode);
			pathNode = pathNode.parent;
		}

		return path;
	}	
}