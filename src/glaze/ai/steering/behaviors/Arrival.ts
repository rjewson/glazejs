import { Vector2 } from "../../../geom/Vector2";
import { Body } from "../../../physics/Body";
import { SteeringAgentParameters } from "../SteeringAgentParameters";
import { SteeringSettings } from "../SteeringSettings";
import { Behavior } from "./Behavior";

export class Arrival extends Behavior {
    public target: Vector2;
    public arrivalZone: number;
    public seekDist: number;

    constructor(target: Vector2, arrivalZone: number = 0, seekDist: number = 0) {
        super(SteeringSettings.seekWeight, SteeringSettings.seekPriority);
        this.target = target;
        this.arrivalZone = arrivalZone;
        this.seekDist = seekDist;
    }

    public calculate(agent: Body, params: SteeringAgentParameters, result: Vector2) {
        Arrival.calc(agent, params, result, this.target, this.arrivalZone, this.seekDist);
    }

    //Hand optimized as called so often
    public static calc(
        agent: Body,
        params: SteeringAgentParameters,
        result: Vector2,
        target: Vector2,
        arrivalZone: number,
        seekDist: number,
    ): boolean {
        var dX: number = target.x - agent.position.x + 0.000001;
        var dY: number = target.y - agent.position.y + 0.000001;
        var d: number = dX * dX + dY * dY;

        if (seekDist > 0 && d < seekDist * seekDist) {
            return false;
        }

        var t = Math.sqrt(d);

        var scale: number = 1.0;

        if (t < arrivalZone) {
            scale = t / arrivalZone;
        }

        result.x = dX / t;
        result.x *= params.maxSteeringForcePerStep;
        result.x -= agent.velocity.x * (60 / 1000);
        result.x *= scale;

        result.y = dY / t;
        result.y *= params.maxSteeringForcePerStep;
        result.y -= agent.velocity.y * (60 / 1000);
        result.x *= scale;

        return true;
    }
}
