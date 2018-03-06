import { Vector2 } from "../../geom/Vector2";
import { Contact } from "./Contact";
import { BFProxy } from "./BFProxy";
import { AABB2 } from "../../geom/AABB2";

interface RayCallback {
    (proxy: BFProxy): number;
}

export class Ray {
    public origin: Vector2 = new Vector2();
    public target: Vector2 = new Vector2();
    public range: number = 0;

    public delta: Vector2 = new Vector2();
    public direction: Vector2 = new Vector2();

    public contact: Contact = new Contact();

    public hit: boolean;

    public callback: RayCallback;

    public bounds: AABB2 = new AABB2();

    constructor() {}

    public initalize(origin: Vector2, target: Vector2, range: number, callback: RayCallback) {
        this.reset();
        this.origin.copy(origin);
        this.target.copy(target);

        this.delta.copy(target);
        this.delta.minusEquals(origin);

        this.direction.copy(this.delta);
        this.direction.normalize();

        if (range <= 0) {
            this.range = this.delta.length();
        } else {
            this.range = range;
            //scale the delta correctly now
            this.delta.copy(this.direction);
            this.delta.multEquals(range);
        }

        this.bounds.addPoint(this.origin.x, this.origin.y);
        this.bounds.addPoint(this.origin.x + this.delta.x, this.origin.y + this.delta.y);

        this.callback = callback;
    }

    public reset() {
        this.contact.distance = 9999999999;
        this.hit = false;
    }

    public report(distX: number, distY: number, normalX: number, normalY: number, proxy: BFProxy = null) {
        if (this.callback != null && proxy != null) {
            if (this.callback(proxy) < 0) {
                return;
            }
        }

        var distSqrd = distX * distX + distY * distY;
        if (distSqrd < this.contact.distance * this.contact.distance) {
            this.contact.position.setTo(this.origin.x + distX, this.origin.y + distY);
            this.contact.normal.setTo(normalX, normalY);
            this.contact.distance = Math.sqrt(distSqrd);
            this.hit = true;
        }
    }
}
