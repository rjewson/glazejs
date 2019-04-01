import { System } from "../../ecs/System";
import { Entity } from "../../ecs/Entity";
import { Position } from "../components/Position";
import { Attachment } from "../components/Attachment";
import { Hierachy } from "../components/Hierachy";

export class AttachmentSystem extends System {
    constructor() {
        super([Position, Attachment, Hierachy]);
    }

    updateEntity(entity: Entity, position: Position, attachment: Attachment, hierachy: Hierachy) {
       position.prevCoords.copy(position.coords);
       const parentPosition: Position = this.engine.getComponentForEntity(hierachy.parent, Position);
       position.coords.x = parentPosition.coords.x + attachment.point.x * parentPosition.direction.x;
       position.coords.y = parentPosition.coords.y + attachment.point.y * parentPosition.direction.y;
    }
}
