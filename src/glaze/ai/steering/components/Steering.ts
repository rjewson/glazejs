import { Behavior } from "../behaviors/Behavior";
import { SteeringAgentParameters, DEFAULT_STEERING_PARAMS } from "../SteeringAgentParameters";
import { IComponentFactory } from "../../../ecs/Component";

export class Steering  {
    
	static CALCULATE_SUM:number = 0;
	// Simply adds up all of the behaviors and truncates them to the max acceleration
	static CALCULATE_SPEED:number = 1;
	// Prioritized Dithering
	static CALCULATE_ACCURACY:number = 2;
    
	public behaviors:Array<Behavior>;
	public calculateMethod:number;
    public steeringParameters:SteeringAgentParameters;
    public hasChanged:boolean;

	constructor(behaviors:Array<Behavior>, params:SteeringAgentParameters = null,calculationMethod:number = Steering.CALCULATE_SUM) {
		this.behaviors = behaviors;
		this.steeringParameters = params==null ? DEFAULT_STEERING_PARAMS : params;
		this.hasChanged = true;
	}

	public addBehavior(behavior:Behavior) {
		this.behaviors.push(behavior);
		this.hasChanged = true;
	}
	
	public removeBehaviour(behavior:Behavior) {
		this.behaviors.splice(this.behaviors.indexOf(behavior),1);
		this.hasChanged = true;
	}

	public getBehaviour(type:IComponentFactory):Behavior {
		return this.behaviors.find(behaviour=>(behaviour as any).constructor.name === type.name);
	}

}