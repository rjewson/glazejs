import { Behavior } from "./Behavior";
import { Vector2 } from "../../../geom/Vector2";
import { SteeringSettings } from "../SteeringSettings";
import { RandomFloat } from "../../../util/Random";
import { SteeringAgentParameters } from "../SteeringAgentParameters";
import { Body } from "../../../physics/Body";
import { Seek } from "./Seek";

export class Wander extends Behavior {
    public circleRadius: number;
    public circleDistance: number;
    public wanderAngle: number;
    public wanderChange: number;

    circleCenter: Vector2 = new Vector2();
    displacement: Vector2 = new Vector2();

    constructor(circleRadius: number = 8, circleDistance: number = 1, wanderChange: number = 4) {
        super(SteeringSettings.wanderWeight, SteeringSettings.wanderPriority);
        this.circleRadius = circleRadius;
        this.circleDistance = circleDistance;
        this.wanderAngle = RandomFloat(0, Math.PI * 2);
        this.wanderChange = wanderChange;
    }

    public calculate(agent: Body, params: SteeringAgentParameters, result: Vector2) {
        this.wanderAngle += RandomFloat(-this.wanderChange, this.wanderChange);

        this.circleCenter.copy(agent.velocity);
        this.circleCenter.normalize();
        this.circleCenter.multEquals(this.circleDistance);
        this.circleCenter.plusEquals(agent.position);

        // glaze.debug.DebugEngine.DrawParticle(circleCenter.x,circleCenter.y,4,0,0,255);

        var h: number = Math.atan2(agent.velocity.y, agent.velocity.x);
        h += Math.PI / 2;
        this.displacement.setTo(
            this.circleRadius * Math.cos(this.wanderAngle + h),
            this.circleRadius * Math.sin(this.wanderAngle + h),
        );

        this.circleCenter.plusEquals(this.displacement);

        // glaze.debug.DebugEngine.DrawParticle(circleCenter.x,circleCenter.y,4,255,0,0);

        Seek.calc(agent, params, result, this.circleCenter, 0);
    }
}
