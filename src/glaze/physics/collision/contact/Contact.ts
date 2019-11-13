import { Vector2 } from "../../../geom/Vector2";
import { BFProxy } from "../BFProxy";

export interface ContactCallback {
    (proxyA: BFProxy, proxyB: BFProxy, contact: Contact): void;
}

export class Contact {
    public position: Vector2 = new Vector2();
    public delta: Vector2 = new Vector2();
    public normal: Vector2 = new Vector2();
    public distance: number = 0;
    public time: number = 0;
    public sweepPosition: Vector2 = new Vector2();

    constructor() {}

    public setTo(contact: Contact) {
        this.position.x = contact.position.x;
        this.position.y = contact.position.y;
        this.delta.x = contact.delta.x;
        this.delta.y = contact.delta.y;
        this.normal.x = contact.normal.x;
        this.normal.y = contact.normal.y;
        this.time = contact.time;
        this.distance = contact.distance;
        this.sweepPosition.x = contact.sweepPosition.x;
        this.sweepPosition.y = contact.sweepPosition.y;
    }
}
