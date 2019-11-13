import { ContactPair } from "./ContactPair";
import { BFProxy } from "../BFProxy";
import { Pool } from "../../../util/Pool";
import { Contact } from "./Contact";
import { ContactManager } from "./types";

export class PostContactManager implements ContactManager {
    private contacts: Map<number, ContactPair>;
    private contactPairPool: Pool<ContactPair>;
    private stamp: number;

    constructor() {
        this.contacts = new Map();
        this.contactPairPool = new Pool(i => new ContactPair());
        this.stamp = 0;
        this.contactPairPool.addCapacity(5000);
    }

    public UpdateContacts(proxyA: BFProxy, proxyB: BFProxy, contact: Contact) {
        const bodyHash = BFProxy.HashBodyIDs(proxyA.id, proxyB.id);

        var bodyContact: ContactPair = this.contacts.get(bodyHash);

        if (bodyContact != null) {
            if (bodyContact.stamp < this.stamp) {
                bodyContact.contactCount = 0;
                bodyContact.stamp = this.stamp;
            }
            bodyContact.contactCount++;
        } else {
            bodyContact = this.contactPairPool.reserve();
            bodyContact.hash = bodyHash;
            bodyContact.stamp = this.stamp;
            bodyContact.contactCount = 1;
            bodyContact.startContact = true;
            bodyContact.endContact = false;
            bodyContact.proxyA = proxyA;
            bodyContact.proxyB = proxyB;
            this.contacts.set(bodyHash, bodyContact);
        }
        bodyContact.contact.setTo(contact);
    }

    public ProcessContacts() {
        var c = 0;
        for (const contact of this.contacts.values()) {
            if (contact.stamp < this.stamp) {
                contact.endContact = true;
            } 
            contact.proxyA.collide(contact.proxyB, contact.contact);
            contact.proxyB.collide(contact.proxyA, contact.contact);
            

            // contact.proxyA.collide(contact.proxyB, c);

            // if (contact.proxyA.collisionProcessingMask > 0) {
            //     if (contact.proxyA.collisionProcessingMask & (1 > 0) && contact.startContact)
            //         contact.proxyA.OnStartCollision(contact);
            //     if (contact.proxyA.collisionProcessingMask & (2 > 0)) contact.proxyA.OnCollision(contact);
            //     if (contact.proxyA.collisionProcessingMask & (4 > 0) && contact.endContact)
            //         contact.proxyA.OnEndCollision(contact);
            // }
            // if (contact.proxyB.collisionProcessingMask > 0) {
            //     if (contact.proxyB.collisionProcessingMask & (1 > 0) && contact.startContact)
            //         contact.proxyB.OnStartCollision(contact);
            //     if (contact.proxyB.collisionProcessingMask & (2 > 0)) contact.proxyB.OnCollision(contact);
            //     if (contact.proxyB.collisionProcessingMask & (4 > 0) && contact.endContact)
            //         contact.proxyB.OnEndCollision(contact);
            // }

            contact.startContact = false;

            if (contact.endContact) {
                this.contacts.delete(contact.hash);
                this.contactPairPool.free(contact);
            }
            this.stamp++;
            c++;
        }
        // console.log(c);
    }
}
