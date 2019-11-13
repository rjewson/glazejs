import { Vector2 } from "../../geom/Vector2";
import { AABB2 } from "../../geom/AABB2";
import { AABB } from "../../geom/AABB";
import { Entity } from "../../ecs/Entity";
import { Contact, ContactCallback } from "./contact/Contact";
import { Filter } from "./Filter";
import { Body } from "../Body";

export class BFProxy {
    public id: number;
    static nextID: number = 0;

    public aabb: AABB;

    public offset: Vector2;
    public responseBias: Vector2;

    public body: Body;
    public entity: Entity;

    public isStatic: boolean = false;
    public isSensor: boolean = false;
    public isActive: boolean = true;
    public limitToStaticCheck: boolean = false;

    public filter: Filter;

    public userData1: number = -1;
    public userData2: number = -1;

    public contactCallbacks: Array<ContactCallback> = [];

    constructor() {
        this.aabb = new AABB();
        this.offset = new Vector2();
        this.responseBias = new Vector2(1, 1);
        this.id = BFProxy.nextID++;
    }

    public setBody(body: Body) {
        this.body = body;
        this.aabb.position = body.position;
        this.isStatic = false; //bodies are always dynamic
    }

    public collide(proxy: BFProxy, contact: Contact) {
        for (const callback of this.contactCallbacks) {
            callback(this, proxy, contact);
        }
    }

    static HashBodyIDs(a: number, b: number): number {
        return a < b ? (a << 16) | b : (b << 16) | a;
    }
}
