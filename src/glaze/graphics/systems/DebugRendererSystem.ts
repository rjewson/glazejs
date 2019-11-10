import { System } from "../../ecs/System";
import { Position } from "../../core/components/Position";
import { Entity } from "../../ecs/Entity";
import { DebugGraphics } from "../components/DebugGraphics";
import { Extents } from "../../core/components/Extents";
import { GlazeEngine } from "../../GlazeEngine";
import { GZE } from "../../GZE";

export class DebugRenderSystem extends System {
    constructor() {
        super([Position, Extents, DebugGraphics]);
    }

    public preUpdate(): boolean {
        if (!GZE.debug) {
            return false;
        }
    }

    updateEntity(entity: Entity, position: Position, extents: Extents, graphics: DebugGraphics) {
        GZE.debugRender.DrawCross(position.coords.x, position.coords.y, 15);
    }
}
