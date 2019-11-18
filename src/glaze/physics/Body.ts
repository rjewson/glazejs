import { Vector2 } from "../geom/Vector2";
import { Material } from "./Material";
import { Contact } from "./collision/contact/Contact";
import { MAXINT } from "../util/Maths";

const SLEEP_BIAS: number = 0.99332805041467;
const SLEEP_EPSILON: number = 0.0009;
const WAKE_MOTION: number = 10;
const MASS_SCALE: number = 1 / 10;

export class Body {
    public position: Vector2 = new Vector2();
    public positionCorrection: Vector2 = new Vector2();
    public predictedPosition: Vector2 = new Vector2();
    public delta: Vector2 = new Vector2();
    public previousPosition: Vector2 = new Vector2();

    public velocity: Vector2 = new Vector2();
    public originalVelocity: Vector2 = new Vector2();
    public previousVelocity: Vector2 = new Vector2();

    public contactNormal: Vector2 = new Vector2();
    public prevContactNormal: Vector2 = new Vector2();

    public tangent: Vector2 = new Vector2();
    public toi: number;

    public stepContactCount: number = 0;

    public maxScalarVelocity: number = 1000;
    public maxVelocity: Vector2 = new Vector2();

    public material: Material;

    public forces: Vector2 = new Vector2();
    private accumulatedForces: Vector2 = new Vector2();

    public isBullet: boolean = false;

    public damping: number = 1;
    public globalForceFactor: number = 1;

    public mass: number = 1;
    public invMass: number = 1;

    public dt: number = 0;

    public motion: number = WAKE_MOTION;
    public canSleep: boolean = false;
    public isSleeping: boolean = false;

    public onGround: boolean = false;
    public onGroundPrev: boolean = false;

    public inWater: boolean = false;
    public inWaterPrev: boolean = false;
    public usesStairs: boolean = true;
    public collideOneWay: boolean = true;

    public totalBounceCount: number = 0;
    public bounceCount: number = 0;

    public debug: number = 0;

    public skip: boolean = false;

    // public var sweep:AABB2 = new glaze.geom.AABB2();

    constructor(material: Material = null, mass: number = 1) {
        this.material = material == null ? new Material() : material;
        this.setMass(mass);
    }

    public update(dt: number, globalForces: Vector2, globalDamping: number) {
        this.dt = dt;
        this.onGroundPrev = this.onGround;
        this.onGround = false;
        this.inWaterPrev = this.inWater;
        this.inWater = false;

        if (this.skip || this.isSleeping) return;

        this.motion = SLEEP_BIAS * this.motion + (1 - SLEEP_BIAS) * this.velocity.lengthSqrd();
        this.motion = Math.min(this.motion, 10 * SLEEP_EPSILON);
        this.canSleep = this.motion < SLEEP_EPSILON;

        this.previousVelocity.copy(this.velocity);

        //Add global forces to local ones
        this.forces.plusMultEquals(globalForces, this.globalForceFactor);
        this.velocity.plusEquals(this.forces);
        this.velocity.multEquals(globalDamping * this.damping);

        //Which velocity limiting type?
        // if (!isBullet) {
        if (this.maxScalarVelocity > 0) {
            this.velocity.clampScalar(this.maxScalarVelocity);
        } else {
            this.velocity.clampVector(this.maxVelocity);
        }
        // }

        this.originalVelocity.copy(this.velocity);

        this.predictedPosition.copy(this.position);
        this.predictedPosition.plusMultEquals(this.velocity, dt);
        this.previousPosition.copy(this.position);

        this.delta.copy(this.predictedPosition);
        this.delta.minusEquals(this.position);

        this.prevContactNormal.copy(this.contactNormal);
        this.contactNormal.setTo(0, 0);

        this.forces.setTo(0, 0);
        this.damping = 1;

        this.stepContactCount = 0;

        this.toi = MAXINT;
    }

    public respondStaticCollision(contact: Contact): boolean {
        if (this.skip) return false;
        var seperation = Math.max(contact.distance, 0);
        var penetration = Math.min(contact.distance, 0);

        //positionCorrection.x -= contact.normal.x * (penetration/dt);
        //positionCorrection.y -= contact.normal.y * (penetration/dt);
        this.positionCorrection.minusMultEquals(contact.normal, penetration / this.dt);

        var nv = this.velocity.dot(contact.normal) + seperation / this.dt;

        if (nv < 0) {
            this.stepContactCount++;

            //Cancel normal vel
            // velocity.x -= contact.normal.x * nv;
            // velocity.y -= contact.normal.y * nv;
            this.velocity.minusMultEquals(contact.normal, nv);

            //Item doesnt bounce? Surface is updwards?
            if (!this.canBounce && contact.normal.y < 0) {
                this.onGround = true;
                //Apply Friction here?
                // var tangent:Vector2 = contact.normal.rightHandNormal();
                // var tv:number = velocity.dot(tangent) * material.friction;
                // velocity.x -= tangent.x * tv;
                // velocity.y -= tangent.y * tv;
            }

            //store contact normal for later reflection
            this.contactNormal.copy(contact.normal);

            return true;
        }
        return false;
    }

    public t(msg: String) {
        if (this.debug > 0) {
            this.debug--;
        }
    }

    public respondBulletCollision(contact: Contact): boolean {
        //Record the closest time
        if (contact.time <= this.toi) {
            this.toi = contact.time;
            this.positionCorrection.copy(contact.sweepPosition);
            this.contactNormal.copy(contact.normal);
            return true;
        }
        return false;
    }

    public updatePosition() {
        if (this.skip || this.isSleeping) return;
        //Its a bullet and it hit something?
        if (this.isBullet) {
            if (this.toi < MAXINT) {
                this.position.copy(this.positionCorrection);
                this.originalVelocity.reflectEquals(this.contactNormal);
                //Fixme
                this.originalVelocity.multEquals(this.material.elasticity);
                this.velocity.copy(this.originalVelocity);
            } else {
                this.position.copy(this.predictedPosition);
            }
            return;
        }

        //This body isnt a bullet so...

        //apply Friction here
        if (this.stepContactCount > 0 && !this.canBounce && this.contactNormal.y < 0) {
            // if (stepContactCount>0 && contactNormal.y < 0) {
            //onGround = true;
            // var tangent:Vector2 = contactNormal.rightHandNormal();
            this.tangent.copy(this.contactNormal);
            this.tangent.rightHandNormalEquals();
            var tv: number = this.originalVelocity.dot(this.tangent) * this.material.friction;
            this.velocity.x -= this.tangent.x * tv;
            this.velocity.y -= this.tangent.y * tv;
        }

        this.positionCorrection.plusEquals(this.velocity);
        this.positionCorrection.multEquals(this.dt);
        this.position.plusEquals(this.positionCorrection);
        this.positionCorrection.setTo(0, 0);

        //Anything hit? Any bounces left?
        if (this.stepContactCount > 0 && this.canBounce) {
            //Reflect it...
            this.originalVelocity.reflectEquals(this.contactNormal);
            //Remove velocity
            this.originalVelocity.multEquals(this.material.elasticity);
            //Set the new velocity
            this.velocity.copy(this.originalVelocity);
            this.bounceCount++;
        }
    }

    public addForce(f: Vector2) {
        this.forces.plusMultEquals(f, this.invMass);
        this.wake();
    }

    public addMasslessForce(f: Vector2) {
        this.forces.plusEquals(f);
        this.wake();
    }

    public addProportionalForce(f: Vector2) {
        this.forces.plusMultEquals(f, this.mass);
        this.wake();
    }

    public setMass(mass) {
        this.mass = mass;
        this.invMass = 1 / mass;
    }

    public setMassFromVolumeMaterial(volume: number) {
        this.setMass(this.material.density * volume * MASS_SCALE);
    }

    public setStaticPosition(x: number, y: number) {
        this.position.setTo(x, y);
        this.positionCorrection.setTo(0, 0);
        this.predictedPosition.setTo(0, 0);
        this.forces.setTo(0, 0);
        this.accumulatedForces.setTo(0, 0);
        this.velocity.setTo(0, 0);
        this.originalVelocity.setTo(0, 0);
        this.delta.setTo(0, 0);
        this.wake();
    }

    public setBounces(count: number) {
        this.totalBounceCount = count;
        this.bounceCount = 0;
    }

    get canBounce(): boolean {
        return this.totalBounceCount != 0 && this.bounceCount < this.totalBounceCount;
    }

    public wake() {
        this.canSleep = false;
        this.motion = WAKE_MOTION;
        this.bounceCount = 0;
    }

    get down(): boolean {
        return this.contactNormal.y < 0;
    }
    get downPrev(): boolean {
        return this.prevContactNormal.y < 0;
    }
    get up(): boolean {
        return this.contactNormal.y > 0;
    }
    get upPrev(): boolean {
        return this.prevContactNormal.y > 0;
    }
    get left(): boolean {
        return this.contactNormal.x < 0;
    }
    get leftPrev(): boolean {
        return this.prevContactNormal.x < 0;
    }
    get right(): boolean {
        return this.contactNormal.x > 0;
    }
    get rightPrev(): boolean {
        return this.prevContactNormal.x > 0;
    }

    static Create(
        material: Material,
        mass: number,
        bounces: number,
        globalForceFactor: number,
        maxScalarVelocity: number,
    ): Body {
        var body = new Body(material);
        body.setMass(mass);
        body.setBounces(bounces);
        body.globalForceFactor = globalForceFactor;
        body.maxScalarVelocity = maxScalarVelocity;
        return body;
    }
}
