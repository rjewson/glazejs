import { Behavior } from "./behaviors/Behavior";
import { Body } from "../../physics/Body";
import { Vector2 } from "../../geom/Vector2";
import { SteeringAgentParameters } from "./SteeringAgentParameters";

export class SteeringBehavior {
    static CALCULATE_SUM: number = 0;
    // Simply adds up all of the behaviors and truncates them to the max acceleration
    static CALCULATE_SPEED: number = 1;
    // Prioritized Dithering
    static CALCULATE_ACCURACY: number = 2;
    // Weighted Truncated Running Sum with Prioritization
    public behaviors: Array<Behavior>;
    public neighbors: Array<Body>;

    public calculateMethod: number;
    private hasChanged: boolean;
    private hasGroupBehavior: boolean;
    private force: Vector2;
    private behaviorForce: Vector2;
    private agentParameters: SteeringAgentParameters;

    constructor(agentParameters: SteeringAgentParameters, calculationMethod: number = SteeringBehavior.CALCULATE_SUM) {
        this.agentParameters = agentParameters;
        this.calculateMethod = calculationMethod;
        this.force = new Vector2();
        this.behaviorForce = new Vector2();
        this.behaviors = new Array<Behavior>();
        //neighbors = new Array<Body>();
    }

    public addBehavior(behavior: Behavior) {
        this.behaviors.push(behavior);
        behavior.steering = this;
        this.hasChanged = true;
        //if ( behavior is IGroupBehavior ) hasGroupBehavior = true;
    }

    public removeBehaviour(behavior: Behavior) {
        this.behaviors.splice(this.behaviors.indexOf(behavior), 1);
        // behaviors.remove(behavior);
    }

    public calculate(agent: Body): Vector2 {
        if (this.hasChanged) {
            this.sort();
            this.hasChanged = false;
        }
        this.force.x = 0;
        this.force.y = 0;
        // FIXME
        // if ( m_hasGroupBehavior ) {
        // neighbors = [];
        // var dist : Number = m_agent.neighborDistance * m_agent.neighborDistance;
        // for each ( var entity:Entity in m_agent.parent.getChildren() ) {
        // if ( entity is Boid && entity.actualPos.distanceSqTo(m_agent.actualPos) < dist ) {
        // neighbors.push(entity);
        // }
        // }
        // }

        switch (this.calculateMethod) {
            case SteeringBehavior.CALCULATE_SUM:
                this.runningSum(agent);
            case SteeringBehavior.CALCULATE_SPEED:
                this.prioritizedDithering();
            case SteeringBehavior.CALCULATE_ACCURACY:
                this.wtrsWithPriorization();
        }

        // agent.addForce(force);
        agent.addProportionalForce(this.force);

        return this.force;
    }

    private prioritizedDithering(): void {
        // for (behavior in behaviors) {
        // 	if ( Math.random() < behavior.probability ) {
        // 		force.plusEquals(behavior.calculate().mult(behavior.weight));
        // 	}
        // 	if ( !force.equalsZero() ) {
        // 		force.clampMax(agent.maxAcceleration);
        // 		return;
        // 	}
        // }
    }

    private wtrsWithPriorization(): void {
        // for (behavior in behaviors) {
        // 	if ( !accumulateForce(force, behavior.calculate().mult(behavior.weight)))
        // 		return;
        // }
    }

    private runningSum(agent: Body): void {
        for (var i = 0; i < this.behaviors.length; i++) {
            // for (behavior in behaviors) {
            const behavior = this.behaviors[i];
            behavior.calculate(agent, this.agentParameters, this.behaviorForce);
            this.behaviorForce.multEquals(behavior.weight);
            this.force.plusEquals(this.behaviorForce);
            //force.plusEquals(behavior.calculate().mult(behavior.weight));
        }
        this.force.clampScalar(this.agentParameters.maxAcceleration);
    }

    private accumulateForce(a_runningTotal: Vector2, a_forceToAdd: Vector2): boolean {
        // var magnitudeSoFar : Float = a_runningTotal.length();
        // var magnitudeRemaining : Float = agent.maxAcceleration - magnitudeSoFar;
        // if ( magnitudeRemaining <= 0 )
        // 	return false;

        // var magnitudeToAdd : Float = a_forceToAdd.length();

        // if ( magnitudeToAdd < magnitudeRemaining ) {
        // 	a_runningTotal.x += a_forceToAdd.x;
        // 	a_runningTotal.y += a_forceToAdd.y;
        // 	return true;
        // } else {
        // 	a_runningTotal.plusEquals(a_forceToAdd.unit().multEquals(magnitudeRemaining));
        // 	return false;
        // }
        return false;
    }

    private sort(): void {
        this.behaviors.sort(this.behaviorsCompare);
    }

    private behaviorsCompare(a: Behavior, b: Behavior): number {
        if (a.priority < b.priority) return -1;
        if (a.priority == b.priority) return 0;
        return 1;
    }
}
