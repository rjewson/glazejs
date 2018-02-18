import { Vector2 } from "../../geom/Vector2";
import { Create } from "../../geom/Matrix3";
import { DisplayObjectContainer } from "./DisplayObjectContainer";
import { AABB2 } from "../../geom/AABB2";
import { Stage } from "./Stage";


export class DisplayObject 
{
    public id:string;
    public position:Vector2;
    public scale:Vector2;
    public pivot:Vector2;
    private _rotation:number;
    private _rotationComponents:Vector2;
    public alpha:number;
    private _visible:boolean;
    public renderable:boolean;

    public aabb:AABB2;

    public parent:DisplayObjectContainer;

    public worldTransform:Float32Array;
    public worldAlpha:number;
    public localTransform:Float32Array;

    public prev:DisplayObject;
    public next:DisplayObject;

    constructor() {
        this.position = new Vector2();
        this.scale = new Vector2(1,1);
        this.pivot = new Vector2();
        this._rotationComponents = new Vector2();
        this.rotation = 0;
        this.alpha = 1;
        this.visible = true;
        this.renderable = false;
        this.aabb = new AABB2();
        this.parent = null;
        this.worldTransform = Create();
        this.localTransform = Create();
    }

    get rotation():number {  
        return this._rotation;
    }

    set rotation(v:number) {
        this._rotation = v;
        this._rotationComponents.x = Math.cos(this._rotation);
        this._rotationComponents.y = Math.sin(this._rotation);
    }

    public get visible():boolean {  
        return this._visible;
    }

    public set visible(v:boolean) {
        this._visible = v;
    }
    public RoundFunction(v:number):number {
        return v;
        // return Math.round(v);
        // return Math.round( v * 10) / 10;
    }

    public updateTransform() {
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

        var positionx:number = Math.floor(this.position.x);
        var positiony:number = Math.floor(this.position.y);

        var sinR = this._rotationComponents.y;//Math.sin(rotation);
        var cosR = this._rotationComponents.x;//Math.cos(rotation);
        
        this.localTransform[0] =  cosR * this.scale.x;
        this.localTransform[1] = -sinR * this.scale.y;
        this.localTransform[3] =  sinR * this.scale.x;
        this.localTransform[4] =  cosR * this.scale.y;

        var px = this.pivot.x;
        var py = this.pivot.y;

        var parentTransform = this.parent.worldTransform;

        var a00 = this.localTransform[0];
        var a01 = this.localTransform[1];
        var a02 = positionx - this.localTransform[0] * px - py * this.localTransform[1];
        var a10 = this.localTransform[3];
        var a11 = this.localTransform[4];
        var a12 = positiony - this.localTransform[4] * py - px * this.localTransform[3];
        var b00 = parentTransform[0];
        var b01 = parentTransform[1];
        var b02 = parentTransform[2];
        var b10 = parentTransform[3];
        var b11 = parentTransform[4];
        var b12 = parentTransform[5];

        this.localTransform[2] = a02;
        this.localTransform[5] = a12;

        this.worldTransform[0] = b00 * a00 + b01 * a10;
        this.worldTransform[1] = b00 * a01 + b01 * a11;
        this.worldTransform[2] = b00 * a02 + b01 * a12 + b02;

        this.worldTransform[3] = b10 * a00 + b11 * a10;
        this.worldTransform[4] = b10 * a01 + b11 * a11;
        this.worldTransform[5] = b10 * a02 + b11 * a12 + b12;

        this.worldAlpha = this.alpha*this.parent.worldAlpha;

    }

    public calcExtents() {
        
    }


}