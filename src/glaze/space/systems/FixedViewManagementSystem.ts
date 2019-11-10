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
import { MetaData } from "../../core/components/MetaData";
/*  Class representing a system that manages adding and removing a (set of) components 
    from entities based on the intersection of the entity and another AABB (in this case)
    the camera */
export class FixedViewManagementSystem extends System {
    public spaceManager: RegularGridSpaceManager;

    private camera: Camera;
    private activeSpaceAABB: AABB;

    constructor(camera: Camera) {
        super([Position, Extents, Fixed]);
        this.camera = camera;
        this.spaceManager = new RegularGridSpaceManager(10, 10, 320); // FIXME calculate from camera
        this.activeSpaceAABB = new AABB();
    }

    onEntityAdded(entity: Entity, position: Position, extents: Extents, fixed: Fixed) {
        const name = this.engine.getComponentForEntity(entity,MetaData)?.name ?? "unknown";
        this.spaceManager.addEntity(entity, position, extents, name);
    }

    updateAllEntities() {
        this.activeSpaceAABB.extents.setTo(this.camera.viewportSize.x/2, this.camera.viewportSize.y/2); //800 / 2, 600 / 2);
        this.activeSpaceAABB.position.copy(this.camera.realPosition);
        this.spaceManager.search(this.activeSpaceAABB, this.setEntityStatus);
    }

    private setEntityStatus = (entity: Entity, status: boolean) => {
        if (status == true) {
            this.engine.addComponentsToEntity(entity, [new Viewable()]);
        } else {
            this.engine.removeComponentsFromEntityByType(entity, [Viewable]);
        }
    }
}
