import { Camera } from "../../displaylist/Camera";
import { AABB } from "../../../geom/AABB";
import { AABB2 } from "../../../geom/AABB2";
import { Vector2 } from "../../../geom/Vector2";

export interface DebugRenderer {
    Resize(width: number, height: number);
    Clear();
    DrawAABB(aabb: AABB, colour: string);
    DrawAABB2(aabb: AABB2, colour: string);
    DrawCross(x: number, y: number, l: number);
}

export class NullDebugRenderer implements DebugRenderer {
    Resize(width: number, height: number) {}
    Clear() {}
    DrawAABB(aabb: AABB, colour: string) {}
    DrawAABB2(aabb: AABB2, colour: string) {}
    DrawCross(x: number, y: number, l: number) {}
}

export class CanvasDebugRenderer implements DebugRenderer {
    public view: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public camera: Camera;
    public width: number;
    public height: number;

    constructor(view: HTMLCanvasElement, camera: Camera, width: number = 800, height: number = 600) {
        this.view = view;
        this.camera = camera;
        this.ctx = view.getContext("2d");
        this.Resize(width, height);
    }

    public Resize(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.view.width = width;
        this.view.height = height;
    }

    public Clear() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.strokeStyle = "rgba(0,255,0,1)";
        this.ctx.translate(this.camera.position.x, this.camera.position.y);
    }

    public DrawRect(x: number, y: number, w: number, h: number, colour: string) {
        this.ctx.strokeRect(x, y, w, h);
    }

    // public DrawAABB(aabb: AABB) {
    //     this.ctx.strokeRect(aabb.l, aabb.t, aabb.width, aabb.height);
    // }

    public DrawAABB(aabb: AABB, colour: string = "white") {
        this.ctx.strokeStyle = colour;
        this.ctx.beginPath();
        this.ctx.moveTo(aabb.l, aabb.t);
        this.ctx.lineTo(aabb.r, aabb.t);
        this.ctx.moveTo(aabb.r, aabb.b);
        this.ctx.lineTo(aabb.l, aabb.b);
        this.ctx.stroke();
    }

    public DrawAABB2(aabb: AABB2, colour: string = "white") {
        this.ctx.strokeStyle = colour;
        this.ctx.beginPath();
        this.ctx.moveTo(aabb.l, aabb.t);
        this.ctx.lineTo(aabb.r, aabb.t);
        this.ctx.lineTo(aabb.r, aabb.b);
        this.ctx.lineTo(aabb.l, aabb.b);
        this.ctx.lineTo(aabb.l, aabb.t);
        this.ctx.stroke();
    }

    public DrawCross(x: number, y: number, l: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(x - l, y);
        this.ctx.lineTo(x + l, y);
        this.ctx.moveTo(x, y - l);
        this.ctx.lineTo(x, y + l);
        this.ctx.stroke();
    }
}
