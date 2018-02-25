package glaze.ai.navigation;
import glaze.geom.Vector2;
import haxe.ds.StringMap;


/**
 * ...
 * @author rje
 */

class Graph 
{

	public var nodes : Array<Node>;
	public var nodeLookup : StringMap<Node>;
	
	public var pathfinder:IPathfinder;
	
	public function new() 
	{
		nodes = new Array<Node>();
		nodeLookup = new StringMap<Node>();
	}
	
	public function Reset():Void {
		for (node in nodes) {
			node.reset();
		} 
	}
	
	public function GetCreateNode(x:Int, y:Int):Node {
		var hash = HashCoords(x, y);
		var node = nodeLookup.get(hash);
				
		if (node == null) {
			node = new Node(x, y);
			nodes.push(node);
			nodeLookup.set(hash, node);
		}		
		
		return node;
	}
	
	public function GetNode(x:Int, y:Int):Node {
		return nodeLookup.get(HashCoords(x, y));
	}
	
	public function HashCoords(x:Int, y:Int):String {
		return x + ":" + y;
	}
	
	public function Search(start:Node, finish:Node):Array<Node> {
		Reset();
		return (pathfinder != null) ? pathfinder.FindPath(nodes, start, finish) : null;
	}
	
	public static function ConvertNodeListToWorldCoords(nodes:Array<Node>, tileSize:Int):Array<Vector2> {
		var result = new Array<Vector2>();
		var count = nodes.length;
		var tileHalfSize = new Vector2(tileSize / 2, tileSize / 2);
		
		for (i in 0...count) {
			var coord = nodes[count - 1 - i].position.clone();
			coord.multEquals(tileSize);
			coord.plusEquals(tileHalfSize);
			result.push(coord);
		}
		return result;
	}
	
}