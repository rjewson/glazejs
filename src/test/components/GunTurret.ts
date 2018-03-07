import { IntervalDelay } from "../../glaze/util/IntervalDelay";

export class GunTurret {
    public intervalDelay: IntervalDelay;

    constructor(interval: number) {
        this.intervalDelay = new IntervalDelay(interval);
    }
}
