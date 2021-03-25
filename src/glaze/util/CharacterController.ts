import { Body } from "../physics/Body";
import { Vector2 } from "../geom/Vector2";
import { DigitalInput } from "./DigitalInput";

export class CharacterController {

    public isWalking: boolean = false;

    public originalFriction: number = 0;
    public originalVelocityClamp: Vector2;

    public burn: number = 0;

    public left: number;
    public right: number;
    public up: boolean;
    public down: number;
    public boost: number;

    private body: Body;
    private input: DigitalInput;

    private controlForce: Vector2 = new Vector2();

    private jumpUnit: Vector2 = new Vector2();

    private BASE_FORCE: number;

    private WALK_FORCE: number;
    private AIR_CONTROL_FORCE: number;
    private JUMP_FORCE: number;

    private MAX_AIR_HORIZONTAL_VELOCITY: number;

    private MAX_BURN: number;

    private BOOST_FACTOR: number;

    private jumping: boolean = false;

    constructor(input: DigitalInput, body: Body, baseForce: number) {
        this.input = input;
        this.body = body;
        this.originalFriction = body.material.friction;
        this.originalVelocityClamp = body.maxVelocity.clone();
        this.setBaseForce(baseForce);
    }

    public setBaseForce(baseForce: number) {
        this.BASE_FORCE = 600;

        this.WALK_FORCE = 2 * this.BASE_FORCE;
        this.AIR_CONTROL_FORCE = 1 * this.BASE_FORCE;
        this.JUMP_FORCE = 30 * this.BASE_FORCE;

        this.MAX_AIR_HORIZONTAL_VELOCITY = 0.5 * this.BASE_FORCE;

        this.MAX_BURN = 5 * this.BASE_FORCE;

        this.BOOST_FACTOR = 1.4;
    }

    public update() {
        this.controlForce.setTo(0.0, 0.0);

        this.left = this.input.PressedDuration(65); //a
        this.right = this.input.PressedDuration(68); //d
        var up = this.input.JustPressed(87); //w
        var upDuration = this.input.PressedDuration(87); //w
        this.down = this.input.PressedDuration(83); //s
        this.boost = this.input.PressedDuration(16);

        //Just jumped?
        if (!this.jumping && this.body.onGround && up) {
            this.jumping = true;
            this.controlForce.y -= this.JUMP_FORCE / 5;
        }

        if ((this.jumping && this.input.Released(87)) || this.body.contactNormal.y > 0) {
            this.jumping = false;
        }

        //Just landed?
        if (this.body.onGround && !this.body.onGroundPrev) {
            this.burn = 0;
        }

        // if (this.body.inWater) {
        //     if (this.left>0)     this.controlForce.x -= WALK_FORCE;
        //     if (this.right>0)    this.controlForce.x += WALK_FORCE;
        //     if (up)         this.controlForce.y -= 400;
        //     if (down>0)       this.controlForce.y += WALK_FORCE;
        // } else
        if (this.body.onGround) {
            if (this.left > 0) this.controlForce.x -= this.WALK_FORCE;
            if (this.right > 0) this.controlForce.x += this.WALK_FORCE;
            if (up) {
                this.controlForce.y -= this.JUMP_FORCE;
                //burn = MAX_BURN;
            }
            // if (upDuration>0) this.controlForce.y -= 4000;
        } else {
            if (this.left > 0) this.controlForce.x -= this.AIR_CONTROL_FORCE;
            if (this.right > 0) this.controlForce.x += this.AIR_CONTROL_FORCE;
            var d = 10;
            // if (jumping&&upDuration>1&&upDuration<d) this.controlForce.y -= 800/d;//(d-upDuration);
            // if (up) burn-=10000;
            if (up) this.burn = this.MAX_BURN;
            if (upDuration > 0) this.burn += this.BASE_FORCE;
        }
        if (this.boost > 0) {
            this.burn = Math.min(this.burn, this.MAX_BURN * this.BOOST_FACTOR);
        } else {
            this.burn = Math.min(this.burn, this.MAX_BURN);
        }
        this.controlForce.y -= this.burn;
        this.burn *= 0.95;

        this.isWalking = this.body.onGround && (this.left > 0 || this.right > 0);
        if (this.isWalking) {
            //this.body.material.friction = this.originalFriction/2;
        } else {
            //this.body.material.friction = this.originalFriction*3;
            // originalVelocityClamp
        }

        this.body.addForce(this.controlForce);
    }
}
