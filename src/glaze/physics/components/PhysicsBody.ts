import { Body } from "../Body";

export class PhysicsBody {
    public body: Body;
    public setMassFromVolume: boolean;

    constructor(body: Body, setMassFromVolume: boolean = false) {
        this.body = body;
        this.setMassFromVolume = setMassFromVolume;
    }
}
