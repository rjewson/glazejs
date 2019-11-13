import { BFProxy } from "../BFProxy";
import { Contact } from "./Contact";

export interface ContactManager {
    UpdateContacts(proxyA: BFProxy, proxyB: BFProxy, contact: Contact);
    ProcessContacts();
}