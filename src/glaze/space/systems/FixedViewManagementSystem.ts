import { System } from "../../ecs/System";
import { Camera } from "../../graphics/displaylist/Camera";
import { ISpaceManager } from "../ISpaceManager";
import { AABB } from "../../geom/AABB";
import { Extents } from "../../core/components/Extents";
import { Position } from "../../core/components/Position";
import { Fixed } from "../../core/components/Fixed";
import { RegularGridSpaceManager } from "../RegularGridSpaceManager";
import { Entity } from "../../ecs/Entity";
import { Viewable } from "../../core/components/Viewable";

export class FixedViewManagementSystem extends System {
    private camera: Camera;
    private spaceManager: ISpaceManager;
    private activeSpaceAABB: AABB;

    constructor(camera: Camera) {
        super([Position, Extents, Fixed]);
        this.camera = camera;
        this.spaceManager = new RegularGridSpaceManager(10, 10, 500);
        this.activeSpaceAABB = new AABB();
        this.activeSpaceAABB.extents.setTo(800 / 2, 600 / 2);
        this.setEntityStatus = this.setEntityStatus.bind(this);
    }

    onEntityAdded(entity: Entity, position: Position, extents: Extents, fixed: Fixed) {
        this.spaceManager.addEntity(entity, position, extents);
    }

    updateAllEntities() {
        this.activeSpaceAABB.position.copy(this.camera.realPosition);
        this.spaceManager.search(this.activeSpaceAABB, this.setEntityStatus);
    }

    setEntityStatus(entity: Entity, status: boolean) {
        if (status == true) {
            this.engine.addComponentsToEntity(entity, [new Viewable()]);
        } else {
            this.engine.removeComponentsFromEntity(entity, [Viewable]);
        }
    }
}
