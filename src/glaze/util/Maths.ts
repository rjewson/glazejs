import { Vector2 } from "../geom/Vector2";

export const ZERO_TOLERANCE = 1e-8;

export const RAD_DEG = 180 / Math.PI;

export const DEG_RAD = Math.PI / 180;

export const LN2 = 0.6931471805599453;

export const LN10 = 2.302585092994046;

export const PIHALF = 1.5707963267948966;

export const PI = 3.141592653589793;

export const PI2 = 6.283185307179586;

export const EPS = 1e-6;

export const SQRT2 = 1.414213562373095;

export function toRad(deg: number): number {
    return deg * DEG_RAD;
}

export function toDeg(rad: number): number {
    return rad * RAD_DEG;
}

export function Clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function ScaleRectangleWithRatio(containerRect: Vector2, itemRect: Vector2): number {
    //var sX = itemRect.x / containerRect.x;
    //var sY = itemRect.y / containerRect.y;

    var sX = containerRect.x / itemRect.x;
    var sY = containerRect.y / itemRect.y;

    var rD = containerRect.x / containerRect.y;
    var rR = itemRect.x / itemRect.y;

    return rD < rR ? sX : sY;
}
