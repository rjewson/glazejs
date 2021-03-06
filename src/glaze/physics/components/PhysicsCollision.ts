import { BFProxy } from "../collision/BFProxy";
import { Filter } from "../collision/Filter";
import { ContactCallback } from "../collision/Contact";
import { Body } from "../Body";

export class PhysicsCollision {
    public proxy: BFProxy;

    constructor(
        isSensor: boolean,
        filter: Filter,
        contactCallbacks: Array<ContactCallback>,
        limitToStaticCheck: boolean = false,
        forceAttachBody:Body = null
    ) {
        this.proxy = new BFProxy();
        this.proxy.isSensor = isSensor;
        this.proxy.filter = filter;
        this.proxy.contactCallbacks = contactCallbacks;
        this.proxy.limitToStaticCheck = limitToStaticCheck;
        if (forceAttachBody) {
            this.proxy.body = forceAttachBody;
        }
    }
}
