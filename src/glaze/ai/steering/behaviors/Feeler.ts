import { Vector2 } from "../../../geom/Vector2";
import { lineIntersection } from "../../../util/Geometry";

export class Feeler {
    public base: Vector2;
    public tip: Vector2;

    public length: number;
    public angle: number;

    public distToClosestIP: number;

    public closestIP: Vector2;
    public ip: Vector2;

    public normal: Vector2;

    constructor(angle: number, length: number) {
        this.angle = angle;
        this.length = length;

        this.base = new Vector2();
        this.tip = new Vector2();

        this.closestIP = new Vector2();
        this.ip = new Vector2();
        this.normal = new Vector2();
    }

    public Reset(unitDirection: Vector2, position: Vector2) {
        this.distToClosestIP = Number.POSITIVE_INFINITY;
        this.tip.copy(unitDirection);
        this.base.copy(position);
        if (this.angle != 0) {
            var a = Math.atan2(unitDirection.y, unitDirection.x);
            a += this.angle;
            this.tip.x = Math.cos(a);
            this.tip.y = Math.sin(a);
        }
        this.tip.multEquals(length);
        this.tip.plusEquals(this.base);

        //glaze.debug.DebugEngine.DrawParticle(tip.x,tip.y,4,255,0,0);
    }

    public TestSegment(a: Vector2, b: Vector2, normal: Vector2) {
        var distToThisIP = lineIntersection(this.base, this.tip, a, b, this.ip);
        if (distToThisIP > 0 && distToThisIP < this.distToClosestIP) {
            this.distToClosestIP = distToThisIP;
            this.closestIP.copy(this.ip);
            this.normal.copy(normal);
        }
    }

    public CalculateForce(force: Vector2) {
        if (this.distToClosestIP != Number.POSITIVE_INFINITY) {
            //glaze.debug.DebugEngine.DrawParticle(closestIP.x,closestIP.y,4,255,255,255);
            // var sf =  normal.mult( tip.minus( closestIP ).length() );
            var sf = this.tip.clone();
            sf.minusEquals(this.closestIP);
            this.normal.multEquals(sf.length());
            force.plusEquals(this.normal);
        }
    }
}
