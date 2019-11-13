import { BFProxy } from "../BFProxy";
import { Contact } from "./Contact";

export class ContactPair {
    public proxyA: BFProxy;
    public proxyB: BFProxy;

    public hash: number;

    public stamp: number;

    public startContact: boolean;
    public endContact: boolean;

    public contactCount: number;

    public contact: Contact = new Contact();

    public constructor() {}
}
