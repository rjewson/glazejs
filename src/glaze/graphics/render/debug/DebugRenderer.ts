import { Camera } from "../../displaylist/Camera";
import { AABB } from "../../../geom/AABB";
import { AABB2 } from "../../../geom/AABB2";
import { Vector2 } from "../../../geom/Vector2";

export enum DebugColors {
    WHITE = "white",
    RED = "red",
    BLUE = "blue"
}

export interface DebugRenderer {
    Resize(size: Vector2);
    Clear();
    DrawAABB(aabb: AABB, color?: string);
    DrawAABB2(aabb: AABB2, color?: string);
    DrawCross(x: number, y: number, l: number, color?: string);
    DrawLine(sx: number, sy: number, ex: number, ey: number, color?: string);
}

export class NullDebugRenderer implements DebugRenderer {
    Resize(size: Vector2) {}
    Clear() {}
    DrawAABB(aabb: AABB, color: string) {}
    DrawAABB2(aabb: AABB2, color: string) {}
    DrawCross(x: number, y: number, l: number, color: string) {}
    DrawLine(sx: number, sy: number, ex: number, ey: number, color: string) {}
}

export class CanvasDebugRenderer implements DebugRenderer {
    public view: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public camera: Camera;
    public size: Vector2;

    constructor(view: HTMLCanvasElement, camera: Camera, size: Vector2) {
        this.view = view;
        this.camera = camera;
        this.ctx = view.getContext("2d");
        this.Resize(size);
    }

    public Resize(size: Vector2) {
        this.size = size;
        this.view.width = size.x;
        this.view.height = size.y;
    }

    public Clear() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.size.x, this.size.y);
        this.ctx.strokeStyle = "rgba(0,255,0,1)";
        this.ctx.translate(this.camera.position.x, this.camera.position.y);
    }

    public DrawRect(x: number, y: number, w: number, h: number, color: string) {
        this.ctx.strokeRect(x, y, w, h);
    }

    public DrawAABB(aabb: AABB, color: string = DebugColors.WHITE) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(aabb.l, aabb.t);
        this.ctx.lineTo(aabb.r, aabb.t);
        this.ctx.moveTo(aabb.r, aabb.b);
        this.ctx.lineTo(aabb.l, aabb.b);
        this.ctx.stroke();
    }

    public DrawAABB2(aabb: AABB2, color: string = DebugColors.WHITE) {
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(aabb.l, aabb.t);
        this.ctx.lineTo(aabb.r, aabb.t);
        this.ctx.lineTo(aabb.r, aabb.b);
        this.ctx.lineTo(aabb.l, aabb.b);
        this.ctx.lineTo(aabb.l, aabb.t);
        this.ctx.stroke();
    }

    public DrawCross(x: number, y: number, l: number, color: string = DebugColors.WHITE) {
        this.ctx.beginPath();
        this.ctx.moveTo(x - l, y);
        this.ctx.lineTo(x + l, y);
        this.ctx.moveTo(x, y - l);
        this.ctx.lineTo(x, y + l);
        this.ctx.stroke();
    }
    public DrawLine(sx: number, sy: number, ex: number, ey: number, color: string = DebugColors.WHITE) {
        this.ctx.beginPath();
        this.ctx.moveTo(sx, sy);
        this.ctx.lineTo(ex, ey);
        this.ctx.stroke();
    }
}
