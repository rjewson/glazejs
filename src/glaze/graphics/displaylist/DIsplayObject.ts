import { Vector2 } from "../../geom/Vector2";
import { Create } from "../../geom/Matrix3";
import { DisplayObjectContainer } from "./DisplayObjectContainer";

export class DisplayObject {
    public id: string;
    public position: Vector2;
    public scale: Vector2;
    public pivot: Vector2;
    public _rotation: number;
    public _rotationComponents: Vector2;
    public alpha: number;
    private _visible: boolean;
    public renderable: boolean;

    //public aabb:AABB2;

    public parent: DisplayObjectContainer;

    public worldTransform: Float32Array;
    public worldAlpha: number;
    public localTransform: Float32Array;

    public prev: DisplayObject;
    public next: DisplayObject;

    constructor() {
        this.position = new Vector2();
        this.scale = new Vector2(1, 1);
        this.pivot = new Vector2();
        this._rotationComponents = new Vector2();
        this.rotation = 0;
        this.alpha = 1;
        this.visible = true;
        this.renderable = false;
        // this.aabb = new AABB2();
        this.parent = null;
        this.worldTransform = Create();
        this.localTransform = Create();
    }

    get rotation(): number {
        return this._rotation;
    }

    set rotation(v: number) {
        this._rotation = v;
        this._rotationComponents.x = Math.cos(this._rotation);
        this._rotationComponents.y = Math.sin(this._rotation);
    }

    public get visible(): boolean {
        return this._visible;
    }

    public set visible(v: boolean) {
        this._visible = v;
    }

    public RoundFunction(v: number): number {
        return v;
        // return Math.round(v);
        // return Math.round( v * 10) / 10;
    }

    //TODO Rounding at the moment...
    //position.x = Math.round(position.x);
    //position.y = Math.round(position.y);

    //JS hack, much faster...
    // var positionx:number = untyped{(0.5 + position.x) >> 0;};
    // var positiony:number = untyped{(0.5 + position.y) >> 0;};
    //positionx = cast Math.round( position.x * 10) / 10;
    //positiony = cast Math.round( position.y * 10) / 10;

    // var positionx = position.x;
    // var positiony = position.y;
    public updateTransform() {
        // const positionx: number = Math.floor(this.position.x);
        // const positiony: number = Math.floor(this.position.y);

        // const sinR = this._rotationComponents.y; //Math.sin(rotation);
        // const cosR = this._rotationComponents.x; //Math.cos(rotation);

        // this.localTransform[0] = cosR * this.scale.x;
        // this.localTransform[1] = -sinR * this.scale.y;
        // this.localTransform[3] = sinR * this.scale.x;
        // this.localTransform[4] = cosR * this.scale.y;

        // const parentTransform = this.parent.worldTransform;

        // const a00 = this.localTransform[0];
        // const a01 = this.localTransform[1];
        // const a02 = positionx - this.localTransform[0] * this.pivot.x - this.pivot.y * this.localTransform[1];
        // const a10 = this.localTransform[3];
        // const a11 = this.localTransform[4];
        // const a12 = positiony - this.localTransform[4] * this.pivot.y - this.pivot.x * this.localTransform[3];
        // const b00 = parentTransform[0];
        // const b01 = parentTransform[1];
        // const b02 = parentTransform[2];
        // const b10 = parentTransform[3];
        // const b11 = parentTransform[4];
        // const b12 = parentTransform[5];

        // this.localTransform[2] = a02;
        // this.localTransform[5] = a12;

        // this.worldTransform[0] = b00 * a00 + b01 * a10;
        // this.worldTransform[1] = b00 * a01 + b01 * a11;
        // this.worldTransform[2] = b00 * a02 + b01 * a12 + b02;

        // this.worldTransform[3] = b10 * a00 + b11 * a10;
        // this.worldTransform[4] = b10 * a01 + b11 * a11;
        // this.worldTransform[5] = b10 * a02 + b11 * a12 + b12;

        // this.worldAlpha = this.alpha * this.parent.worldAlpha;
    }

    public calcExtents() {}
}
