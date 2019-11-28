import { DisplayObjectContainer } from "./DisplayObjectContainer";

export class Stage extends DisplayObjectContainer {
    constructor() {
        super();
        this.id = "Stage";
        this.worldAlpha = this.alpha;
    }

    public updateTransform() {
        var child = this.head;
        while (child != null) {
            child.updateTransform();
            child = child.next;
        }
    }
}
