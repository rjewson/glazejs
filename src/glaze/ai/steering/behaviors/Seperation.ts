// import { Entity } from "../../../ecs/Entity";
// import { SteeringSettings } from "../SteeringSettings";
// import { Behavior } from "./Behavior";
// import { SteeringAgentParameters } from "../SteeringAgentParameters";
// import { Vector2 } from "../../../geom/Vector2";
// import { Body } from "../../../physics/Body";

// export class Seperation extends Behavior
// {

// 	public  seperationDistance:number;
// 	public  group:Array<Entity>;

// 	constructor(group:Array<Entity>,seperationDistance:number = 10) {
// 		super(SteeringSettings.wanderWeight, SteeringSettings.wanderPriority);
// 		this.group = group;
// 		this.seperationDistance = seperationDistance;
// 	}

//     calculate(agent: Body, params: SteeringAgentParameters, result: Vector2) {

// 		var count = 0;

//         this.group.forEach(entity=>{
// 			var body = entity.getComponent(PhysicsBody).body;
// 			if (body!=this.agent) {
// 				if (body.position.distSqrd(agent.position)<this.seperationDistance*this.seperationDistance) {
// 					result.plusEquals(body.position);
// 					result.minusEquals(agent.position);
// 					count++;
// 				}
// 			}
//         }
//     })

// 		if (count>0) {
// 			result.multEquals(-1/count);
// 		}
// 		result.normalize();
// 		result.multEquals(seperationDistance);

// 	}


// }