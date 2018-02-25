import { TMXObject } from "./TMXMap";
import { Position } from "../core/components/Position";
import { Extents } from "../core/components/Extents";

export function TMXObjectPosition(tmxObject: TMXObject): Position {
    return new Position(SCALE(tmxObject.x + tmxObject.width / 2), SCALE(tmxObject.y + tmxObject.height / 2));
}

export function TMXObjectExtents(tmxObject: TMXObject): Extents {
    return new Extents(SCALE(tmxObject.width / 2), SCALE(tmxObject.height / 2));
}

export function SCALE(v: number): number {
    return v * 2;
}
