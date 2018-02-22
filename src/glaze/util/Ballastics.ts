import { Vector2 } from "../geom/Vector2";
import { Body } from "../physics/Body";

export class Ballistics {
    static calcProjectileVelocity(body: Body, target: Vector2, velocity: number) {
        var vel = target.clone();

        vel.minusEquals(body.position);
        vel.normalize();
        vel.multEquals(velocity);
        body.maxScalarVelocity = velocity;
        body.velocity.setTo(vel.x, vel.y);
    }

    static calcProjectileForce(body: Body, target: Vector2, force: number) {
        var newforce = target.clone();
        newforce.minusEquals(body.position);
        newforce.normalize();
        newforce.multEquals(force);
        // body.maxScalarVelocity = velocity;
        body.addForce(newforce);
    }
}
