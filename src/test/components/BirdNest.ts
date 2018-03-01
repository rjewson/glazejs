import { EntityGroup } from "../../glaze/util/EntityGroup";
import { Entity } from "../../glaze/ecs/Entity";
import { IntervalDelay } from "../../glaze/util/IntervalDelay";

export class BirdNest {
    public group: EntityGroup;

    public trigger: Entity;
    public triggered: boolean = false;

    public radius: number = 100;

    public intervalDelay: IntervalDelay;

    constructor(maxBirds: number) {
        this.group = new EntityGroup(maxBirds);
        this.intervalDelay = new IntervalDelay(1000);
    }
}
