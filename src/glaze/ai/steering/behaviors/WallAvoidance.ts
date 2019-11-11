import { Behavior } from "./Behavior";
import { Vector2 } from "../../../geom/Vector2";
import { Feeler } from "./Feeler";
import { TileMapCollision } from "../../../physics/collision/broadphase/TileMapCollision";
import { SteeringSettings } from "../SteeringSettings";
import { SteeringAgentParameters } from "../SteeringAgentParameters";
import { Body } from "../../../physics/Body";
import { AABB2 } from "../../../geom/AABB2";
import { toRad, MAXINT } from "../../../util/Maths";
import { AABB } from "../../../geom/AABB";

export class WallAvoidance extends Behavior {
    public feelerLength: number;

    feelers: Array<Feeler>;

    ptv1: Vector2;
    ptv2: Vector2;

    lastPos: Vector2;

    pA: Vector2 = new Vector2();
    pB: Vector2 = new Vector2();

    top: Vector2 = new Vector2(0, -1);
    right: Vector2 = new Vector2(1, 0);
    bottom: Vector2 = new Vector2(0, 1);
    left: Vector2 = new Vector2(-1, 0);
    searchAABB: AABB2 = new AABB2();

    tempVector: Vector2 = new Vector2();

    closestFeeler: Feeler = null;
    closestDist: number = MAXINT;

    constructor(feelerLength: number) {
        super(SteeringSettings.wallAvoidanceWeight, SteeringSettings.wallAvoidancePriority);
        this.feelerLength = feelerLength;

        this.ptv1 = new Vector2();
        this.ptv2 = new Vector2();

        this.feelers = new Array<Feeler>();
        this.feelers.push(new Feeler(0, feelerLength));
        this.feelers.push(new Feeler(toRad(-40), feelerLength * 0.5));
        this.feelers.push(new Feeler(toRad(40), feelerLength * 0.5));

        this.lastPos = new Vector2();
    }

    // function check(shape:GeometricShape, pos:Vector2):Void {

    // 	var tile:Tile = cast shape;

    // 	var tv1 : Vector2 = tile.transformedVertices[0];
    // 	var tv2 : Vector2 = tile.transformedVertices[1];

    // 	for (i in 0...tile.vertexCount) {
    // 		ptv1.x = tv1.x + pos.x;
    // 		ptv1.y = tv1.y + pos.y;
    // 		ptv2.x = tv2.x + pos.x;
    // 		ptv2.y = tv2.y + pos.y;

    // 		for (feeler in feelers) {

    // 			//if (feeler.dot(ta.n) > 0)
    // 			//	continue;

    // 			feeler.TestSegment(ptv1, ptv2, tile.transformedAxes[i].n);

    // 		}

    // 		tv1 = tv2;
    // 		tv2 = tile.transformedVertices[(i + 2) % tile.vertexCount];
    // 	}
    // }

    calculate(agent: Body, params: SteeringAgentParameters, result: Vector2) {
        if (this.lastPos.distSqrd(agent.position) < 1) return;
        this.lastPos.copy(agent.position);

        this.tempVector.copy(agent.velocity);
        this.tempVector.normalize();

        this.searchAABB.reset();
        this.searchAABB.addPoint(agent.position.x, agent.position.y);
        for (var i = 0; i < this.feelers.length; i++) {
            const feeler = this.feelers[i];
            feeler.Reset(this.tempVector, agent.position);
            this.searchAABB.addPoint(feeler.tip.x, feeler.tip.y);
        }

        this.closestFeeler = null;
        this.closestDist = MAXINT;
        // searchAABB.expand(20);
        params.map.iterateCells(this.searchAABB, this.checkAABB);

        if (this.closestFeeler != null) {
            this.closestFeeler.CalculateForce(result);
        }
    }

    checkAABB = (aabb: AABB) => {
        for (var i = 0; i < this.feelers.length; i++) {
            // for (feeler in feelers) {
            const feeler = this.feelers[i];
            //top
            this.pA.setTo(aabb.l, aabb.t);
            this.pB.setTo(aabb.r, aabb.t);
            feeler.TestSegment(this.pA, this.pB, this.top);
            //right
            this.pA.setTo(aabb.r, aabb.b);
            feeler.TestSegment(this.pB, this.pA, this.right);
            //bottom
            this.pB.setTo(aabb.l, aabb.b);
            feeler.TestSegment(this.pA, this.pB, this.bottom);
            //left
            this.pA.setTo(aabb.l, aabb.t);
            feeler.TestSegment(this.pB, this.pA, this.left);

            if (feeler.distToClosestIP < this.closestDist) {
                this.closestDist = feeler.distToClosestIP;
                this.closestFeeler = feeler;
            }
        }
    };
}
