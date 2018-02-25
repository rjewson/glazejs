import { Body } from "../../../physics/Body";
import { Vector2 } from "../../../geom/Vector2";
import { SteeringAgentParameters } from "../SteeringAgentParameters";
import { SteeringBehavior } from "../SteeringBehavior";

export class Behavior {
    public weight: number;
    public probability: number;
    public priority: number;
    public agent: Body;
    public active: boolean;

    public steering: SteeringBehavior;

    constructor(weight: number = 1.0, priority: number = 1, probability: number = 1, active: boolean = true) {
        this.weight = weight;
        this.priority = priority;
        this.probability = probability;
        this.active = active;
    }

    public calculate(agent: Body, params: SteeringAgentParameters, result: Vector2) {}
}
