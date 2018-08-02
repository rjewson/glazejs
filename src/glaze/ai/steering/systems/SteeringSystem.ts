import { System } from "../../../ecs/System";
import { Vector2 } from "../../../geom/Vector2";
import { PhysicsBody } from "../../../physics/components/PhysicsBody";
import { Steering } from "../components/Steering";
import { Entity } from "../../../ecs/Entity";
import { Body } from "../../../physics/Body";
import { Behavior } from "../behaviors/Behavior";
import { TileMapCollision } from "../../../physics/collision/broadphase/TileMapCollision";

export class SteeringSystem extends System {
    public behaviorForce: Vector2;
    public totalForce: Vector2;
    public map: TileMapCollision;

    constructor(map: TileMapCollision) {
        super([PhysicsBody, Steering]);
        this.behaviorForce = new Vector2();
        this.totalForce = new Vector2();
        this.map = map;
    }

    updateEntity(entity: Entity, physicsBody: PhysicsBody, steering: Steering) {
        if (steering.hasChanged) {
            steering.steeringParameters.map = this.map;
            steering.behaviors.sort(this.behaviorsCompare);
            steering.hasChanged = false;
        }
        this.runningSum(steering, physicsBody.body);
        physicsBody.body.addProportionalForce(this.totalForce);
    }

    private runningSum(steering: Steering, agent: Body) {
        this.totalForce.setTo(0, 0);
        for (var i = 0; i < steering.behaviors.length; i++) {
            const behavior = steering.behaviors[i];
            if (behavior.active) {
                this.behaviorForce.setTo(0, 0);
                behavior.calculate(agent, steering.steeringParameters, this.behaviorForce);
                this.behaviorForce.multEquals(behavior.weight);
                this.totalForce.plusEquals(this.behaviorForce);
            }
        }
        this.totalForce.clampScalar(steering.steeringParameters.maxAcceleration);
    }

    private behaviorsCompare(a: Behavior, b: Behavior): number {
        if (a.priority < b.priority) return -1;
        if (a.priority == b.priority) return 0;
        return 1;
    }
}
