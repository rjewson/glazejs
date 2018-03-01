import { EntityGroup } from "../../glaze/util/EntityGroup";

export class BeeHive {
    public group: EntityGroup;

    constructor(maxBees: number) {
        this.group = new EntityGroup(maxBees);
    }
}
