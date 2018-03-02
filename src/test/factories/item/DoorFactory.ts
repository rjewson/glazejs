import { Engine } from "../../../glaze/ecs/Engine";
import { Entity } from "../../../glaze/ecs/Entity";
import { Extents } from "../../../glaze/core/components/Extents";
import { TileGraphics } from "../../../glaze/graphics/components/TileGraphics";
import { PhysicsCollision } from "../../../glaze/physics/components/PhysicsCollision";
import { Fixed } from "../../../glaze/core/components/Fixed";
import { Door } from "../../components/Door";
import { Active } from "../../../glaze/core/components/Active";
import { TMXObject } from "../../../glaze/tmx/TMXMap";
import { TMXObjectPosition, TMXObjectExtents } from "../../../glaze/tmx/TMXComponentUtils";
import { Position } from "../../../glaze/core/components/Position";
import { Filter } from "../../../glaze/physics/collision/Filter";
import { TestFilters } from "../../config/Filters";

export class DoorFactory {

    static mapping: string = "door";

    static create(engine: Engine, position: Position, extents: Extents, open: string, closed: string): Entity {
        var door = engine.createEntity();
        var filter = new Filter();
        filter.groupIndex = TestFilters.SOLID_OBJECT_GROUP;
        engine.addComponentsToEntity(door, [
            position,
            extents,
            new TileGraphics(closed),
            new PhysicsCollision(false, null, []),
            new Fixed(),
            new Door("door", false, ""),
            // new State(['closed','open'],0,["doorA"]),
            // new ECState(states,"open",["open","close"]),
            new Active(),
        ]);

        var pc = engine.getComponentForEntity(door,PhysicsCollision);
        pc.proxy.responseBias.x = 1;
        pc.proxy.isActive = true;

        return door;
    }
    static onDestroy(engine: Engine, entity: Entity) {}
    static createTMXEntity(engine: Engine, object: TMXObject): Entity {
        const extents = TMXObjectExtents(object);
        extents.halfWidths.y/=2;
        return DoorFactory.create(
            engine,
            TMXObjectPosition(object),
            extents,
            "doorOpen",
            "doorClosed",
        );
    }
    // "open" => function(entity:Entity) {
    //     var door = entity.getComponent(Door);
    //     var tileDisplay = entity.getComponent(TileDisplay);
    //     tileDisplay.tileFrameId = door.type+"Open";
    //     var pc = entity.getComponent(PhysicsCollision);
    //     pc.proxy.responseBias.x=0;
    //     pc.proxy.isActive = false;
    // },
    // "close" => function(entity:Entity) {
    //     var door = entity.getComponent(Door);
    //     var tileDisplay = entity.getComponent(TileDisplay);
    //     tileDisplay.tileFrameId = door.type+"Closed";
    //     var pc = entity.getComponent(PhysicsCollision);
    //     pc.proxy.responseBias.x=1;
    //        pc.proxy.isActive = true;
    // }
}
