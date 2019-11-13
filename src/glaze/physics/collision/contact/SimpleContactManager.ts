import { BFProxy } from "../BFProxy";
import { Contact } from "./Contact";
import { ContactManager } from "./types";

export class SimpleContactManager implements ContactManager {

    constructor() {
    }

    public UpdateContacts(proxyA: BFProxy, proxyB: BFProxy, contact: Contact) {
        proxyA.collide(proxyB, contact);
        proxyB.collide(proxyA, contact);
    }

    public ProcessContacts() {
    }
}
