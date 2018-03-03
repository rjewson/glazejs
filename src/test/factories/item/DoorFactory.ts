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
import { State } from "../../../glaze/core/components/State";
import { SimpleFSMStates } from "../../../glaze/ai/fsm/SimpleFSM";

export class DoorFactory {
    static mapping: string = "door";

    static states: SimpleFSMStates = {
        open: function(engine: Engine, entity: Entity) {
            var door = engine.getComponentForEntity(entity, Door);
            var tileDisplay = engine.getComponentForEntity(entity, TileGraphics);
            tileDisplay.setTileFrameId( door.type + "Open");
            var pc = engine.getComponentForEntity(entity, PhysicsCollision);
            pc.proxy.responseBias.x = 0;
            pc.proxy.isActive = false;
        },
        close: function(engine: Engine, entity: Entity) {
            var door = engine.getComponentForEntity(entity, Door);
            var tileDisplay = engine.getComponentForEntity(entity, TileGraphics);
            tileDisplay.setTileFrameId(door.type + "Closed");
            var pc = engine.getComponentForEntity(entity, PhysicsCollision);
            pc.proxy.responseBias.x = 1;
            pc.proxy.isActive = true;
        },
    };

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
            new State(DoorFactory.states, "open", ["open", "close"],["doorA"]),
            new Active(),
        ]);

        return door;
    }
    static onDestroy(engine: Engine, entity: Entity) {}
    static createTMXEntity(engine: Engine, object: TMXObject): Entity {
        const extents = TMXObjectExtents(object);
        extents.halfWidths.y /= 2;
        return DoorFactory.create(engine, TMXObjectPosition(object), extents, "doorOpen", "doorClosed");
    }
}
