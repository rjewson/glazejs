import { BitVector } from "../../ds/BitVector";

export class MetaData {
    public name: string;
    public matchMask: BitVector;

    constructor(name: string, matchMask: BitVector) {
        this.name = name;
        this.matchMask = matchMask;
    }
}
