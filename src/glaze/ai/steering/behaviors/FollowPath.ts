import { Behavior } from "./Behavior";
import { SteeringSettings } from "../SteeringSettings";
import { SteeringAgentParameters } from "../SteeringAgentParameters";
import { Vector2 } from "../../../geom/Vector2";
import { Body } from "../../../physics/Body";
import { Seek } from "./Seek";
import { Node } from "../../navigation/Node";

export class FollowPath extends Behavior
{

	public  path:Array<Node>;
	public  loop:boolean;
	public  seekDist : number;
	
	public currentIndex:number;
	
	constructor(path : Array<Node>, loop:boolean=false, seekDist : number = 32) {
		super(SteeringSettings.followPathWeight, SteeringSettings.followPathPriority);
		
		this.path = path;
		this.loop = loop;
		this.seekDist = seekDist;
		
		this.currentIndex = 0;
	}

	public calculate(agent:Body,params:SteeringAgentParameters,result:Vector2) {
		if (this.loop&&this.currentIndex==this.path.length)
			return;
		if (!Seek.calc(agent,params,result,this.path[this.currentIndex].position,this.seekDist)) {
			this.currentIndex++;
		}
	}
	
}