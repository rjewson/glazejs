import { Behavior } from "./Behavior";
import { Vector2 } from "../../../geom/Vector2";
import { SteeringSettings } from "../SteeringSettings";
import { SteeringAgentParameters } from "../SteeringAgentParameters";
import { Body } from "../../../physics/Body";

export class Seek extends Behavior {
    public target: Vector2;
    public seekDist: number;

    constructor(target: Vector2, seekDist: number = 0) {
        super(SteeringSettings.seekWeight, SteeringSettings.seekPriority);
        this.target = target;
        this.seekDist = seekDist;
    }

    public calculate(agent: Body, params: SteeringAgentParameters, result: Vector2) {
        Seek.calc(agent, params, result, this.target, this.seekDist);
    }

    //Hand optimized as called so often
    static calc(
        agent: Body,
        params: SteeringAgentParameters,
        result: Vector2,
        target: Vector2,
        seekDist: number = 0
    ): boolean {
        const dX: number = target.x - agent.position.x + 0.000001;
        const dY: number = target.y - agent.position.y + 0.000001;
        const d: number = dX * dX + dY * dY;

        if (seekDist > 0 && d < seekDist * seekDist) {
            return false;
        }

        const t = Math.sqrt(d);

        result.x = dX / t;
        result.x *= params.maxSteeringForcePerStep;
        result.x -= agent.velocity.x * (60 / 1000);

        result.y = dY / t;
        result.y *= params.maxSteeringForcePerStep;
        result.y -= agent.velocity.y * (60 / 1000);

        return true;
    }
}
