import { Entity } from "../ecs/Entity";
import { AABB } from "../geom/AABB";
import { Extents } from "../core/components/Extents";
import { Position } from "../core/components/Position";

export type SpaceManagerCb = (entity: Entity, b: boolean) => void;

export interface ISpaceManager {
    addEntity(entity:Entity, position:Position, extents:Extents, name: string): void;
    search(viewAABB: AABB, callback: SpaceManagerCb): void;
}
