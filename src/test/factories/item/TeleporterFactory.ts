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
import { StateUpdater } from "../../../glaze/core/components/StateUpdater";
import { Teleporter } from "../../components/Teleporter";
import { Vector2 } from "../../../glaze/geom/Vector2";
import { ParticleEmitter } from "../../../glaze/particle/components/ParticleEmitter";
import { ScanLine } from "../../../glaze/particle/emitter/ScanLine";

export class TeleporterFactory {
    static mapping: string = "teleporter";

    static states: SimpleFSMStates = {
        on: function(engine: Engine, entity: Entity) {
            var pc = engine.getComponentForEntity(entity, PhysicsCollision);
            pc.proxy.isActive = true;
            engine.addComponentsToEntity(entity, []);
        },
        off: function(engine: Engine, entity: Entity) {
            var pc = engine.getComponentForEntity(entity, PhysicsCollision);
            pc.proxy.isActive = true;
            engine.removeComponentsFromEntityByType(entity, [ParticleEmitter]);
        },
    };

    static create(engine: Engine, position: Position, extents: Extents): Entity {
        var telporter = engine.createEntity();
        var filter = new Filter();
        filter.groupIndex = TestFilters.SOLID_OBJECT_GROUP;
        engine.addComponentsToEntity(telporter, [
            position,
            extents,
            new PhysicsCollision(true, null, []),
            new Fixed(),
            new Door("door", false, ""),
            new Teleporter(new Vector2(16 * 12, 16 * 36)),
            new State(TeleporterFactory.states, "on", true),
            new StateUpdater("telporterA", ["on", "off"]),
            new Active(),
            new ParticleEmitter([new ScanLine(200, 100, 600, 10)])
        ]);

        return telporter;
    }
}
