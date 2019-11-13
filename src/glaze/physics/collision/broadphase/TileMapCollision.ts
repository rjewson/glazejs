import { Bytes2D } from "../../../ds/Bytes2D";
import { Vector2 } from "../../../geom/Vector2";
import { Segment } from "../../../geom/Segment";
import { Contact } from "../contact/Contact";
import { BFProxy } from "../BFProxy";
import { Ray } from "../Ray";
import {
    StaticAABBvsSweeptAABB,
    IsSegVsAABB,
    AABBvsStaticSolidAABBFixedNormal,
    AABBvsStaticSolidAABB
} from "../Intersect";
import { Plane } from "../../../geom/Plane";
import { AABB2 } from "../../../geom/AABB2";
import { AABB } from "../../../geom/AABB";
import { MAXINT } from "../../../util/Maths";

const SOLID: number = 0x1 << 0;
const ONE_WAY: number = 0x1 << 1;
const STEP: number = 0x1 << 2;
const AABBCOLLIDABLE: number = SOLID | ONE_WAY | STEP;

const ONE_WAY_TOLLERANCE: number = -4.0;

const CORRECTION: number = 0.0;
const ROUNDDOWN: number = 0.01;
const ROUNDUP: number = 0.5;

export class TileMapCollision {
    public tileSize: number;
    public tileHalfSize: number;

    public data: Bytes2D;

    public tilePosition: Vector2 = new Vector2();
    public tileExtents: Vector2 = new Vector2();

    public halftilePosition: Vector2 = new Vector2();
    public halftileExtents: Vector2 = new Vector2();

    private workingAABB: AABB = new AABB();

    public bias: Vector2 = new Vector2(1, 1);
    public step: Vector2 = new Vector2(0, -1);

    public plane: Plane = new Plane();
    public segment: Segment = new Segment();

    public contact: Contact;
    public closestContact: Contact;

    constructor(data: Bytes2D) {
        this.data = data;
        this.tileSize = data.cellSize;
        this.tileHalfSize = this.tileSize / 2;
        this.tileExtents.setTo(this.tileHalfSize, this.tileHalfSize);
        this.halftileExtents.setTo(this.tileHalfSize / 4, this.tileHalfSize / 4);
        this.contact = new Contact();
        this.closestContact = new Contact();
    }

    //TODO
    //Can be improved
    public testCollision(proxy: BFProxy) {
        const body = proxy.body;

        const startX = this.data.Index(
            Math.min(body.position.x, body.predictedPosition.x) - proxy.aabb.extents.x - CORRECTION
        );
        const startY = this.data.Index(
            Math.min(body.position.y, body.predictedPosition.y) - proxy.aabb.extents.y - CORRECTION
        );

        const endX =
            this.data.Index(
                Math.max(body.position.x, body.predictedPosition.x) + proxy.aabb.extents.x + CORRECTION - ROUNDDOWN
            ) + 1;
        const endY =
            this.data.Index(Math.max(body.position.y, body.predictedPosition.y) + proxy.aabb.extents.y + CORRECTION) +
            1;

        if (body.isBullet) {
            this.plane.setFromSegment(body.predictedPosition, body.position);
            this.closestContact.time = MAXINT;
            for (var y = startY; y < endY; y++) {
                for (var x = startX; x < endX; x++) {
                    const cell = this.data.get(x, y, 0);
                    //Bullets dont collide with 1 ways at all
                    if ((cell & SOLID) == 1 && (cell & ONE_WAY) == 0) {
                        this.tilePosition.x = x * this.tileSize + this.tileHalfSize;
                        this.tilePosition.y = y * this.tileSize + this.tileHalfSize;
                        //yuk fix this,
                        if (Math.abs(this.plane.distancePoint(this.tilePosition)) < 40) {
                            if (
                                StaticAABBvsSweeptAABB(
                                    this.tilePosition,
                                    this.tileExtents,
                                    body.position,
                                    proxy.aabb.extents,
                                    body.delta,
                                    this.contact
                                ) == true
                            ) {
                                if (body.respondBulletCollision(this.contact)) {
                                    this.closestContact.setTo(this.contact);
                                }
                            }
                        }
                    }
                }
            }
            if (this.closestContact.time < MAXINT) {
                proxy.collide(null, this.contact);
            }
        } else {
            // plane.setFromSegment(body.predictedPosition,body.position);
            for (var y = startY; y < endY; y++) {
                for (var x = startX; x < endX; x++) {
                    const cell = this.data.get(x, y, 0);
                    if ((cell & AABBCOLLIDABLE) > 0) {
                        this.tilePosition.x = x * this.tileSize + this.tileHalfSize;
                        this.tilePosition.y = y * this.tileSize + this.tileHalfSize;

                        if ((cell & STEP) == STEP && body.usesStairs) {
                            this.segment.set(body.position, body.predictedPosition);
                            // js.Lib.debug();

                            //-4,+4
                            //+4,-4
                            //step 8
                            const stairstep = 2;
                            // var stairSize = 4;
                            // var startStair = -6;
                            for (var stair = 0; stair < 8; stair++) {
                                const p = 8 - stair * stairstep;
                                this.halftilePosition.copy(this.tilePosition);
                                this.halftilePosition.x += p * -1;
                                this.halftilePosition.y += p;
                                if (
                                    IsSegVsAABB(
                                        this.segment,
                                        this.halftilePosition,
                                        this.halftileExtents,
                                        proxy.aabb.extents.x,
                                        proxy.aabb.extents.y
                                    )
                                ) {
                                    AABBvsStaticSolidAABBFixedNormal(
                                        body.position,
                                        proxy.aabb.extents,
                                        this.halftilePosition,
                                        this.halftileExtents,
                                        this.step,
                                        this.contact
                                    );
                                    body.respondStaticCollision(this.contact);
                                    proxy.collide(null, this.contact);
                                }
                            }

                            // Intersect.AABBvsStaticSolidAABBSlope(body.position,proxy.aabb.extents,tilePosition,tileExtents,bias,contact);
                        } else {
                            AABBvsStaticSolidAABB(
                                body.position,
                                proxy.aabb.extents,
                                this.tilePosition,
                                this.tileExtents,
                                this.bias,
                                this.contact
                            );
                            // }

                            //if (Intersect.AABBvsStaticSolidAABB(body.position,proxy.aabb.extents,tilePosition,tileExtents,bias,contact)==true) {

                            //Check for 1 way platform?
                            if ((cell & ONE_WAY) == ONE_WAY) {
                                if (
                                    body.collideOneWay &&
                                    this.contact.normal.y < 0 &&
                                    this.contact.distance >= ONE_WAY_TOLLERANCE
                                ) {
                                    body.respondStaticCollision(this.contact);
                                    proxy.collide(null, this.contact);
                                }
                                // if ( contact.normal.x!=0 && contact.distance<16) {

                                //     contact.normal.setTo(0,-1);
                                // }
                                // body.respondStaticCollision(contact);
                            } else {
                                const nextX: number = x + this.contact.normal.x;
                                const nextY: number = y + this.contact.normal.y;
                                const nextCell = this.data.get(nextX, nextY, 0);
                                if ((nextCell & AABBCOLLIDABLE) == 0) {
                                    body.respondStaticCollision(this.contact);
                                    proxy.collide(null, this.contact);
                                }
                            }
                        }
                        // if (cell&ONE_WAY==0 || ( contact.normal.y<0&&contact.distance>=-4 ) )
                        // {
                        // var nextX:Int = x + Std.int(contact.normal.x);
                        // var nextY:Int = y + Std.int(contact.normal.y);
                        // var nextCell = data.get(nextX,nextY,0);
                        // if (nextCell&AABBCOLLIDABLE==0) {
                        //     body.respondStaticCollision(contact);
                        //     proxy.collide(null,contact);
                        // }
                        // }
                        //}
                    }
                }
            }
        }
        // trace(c);
        // if (c>100) {
        //     trace(startX,endX,startX,endY);
        //     js.Lib.debug();
        // }
        // plane.setFromSegment(body.predictedPosition,body.position);

        // for (x in startX...endX) {
        //     for (y in startY...endY) {
        //         var cell = data.get(x,y,1);
        //         if (cell&COLLIDABLE==1) {
        //             tilePosition.x = (x*tileSize)+tileHalfSize;
        //             tilePosition.y = (y*tileSize)+tileHalfSize;

        //             if (body.isBullet) {
        //                 //FIXME
        //                 if (Math.abs(plane.distancePoint(tilePosition))<40) {
        //                     if (Intersect.StaticAABBvsSweeptAABB(tilePosition,tileExtents,body.position,proxy.aabb.extents,body.delta,contact)==true) {
        //                         body.respondBulletCollision(contact);
        //                         if (proxy.contactCallback!=null) {
        //                             proxy.contactCallback(proxy,null,contact);
        //                         }
        //                     }
        //                 }
        //             } else {
        //                 if (Intersect.AABBvsStaticSolidAABB(body.position,proxy.aabb.extents,tilePosition,tileExtents,contact)==true) {
        //                     var nextX:Int = x + Std.int(contact.normal.x);
        //                     var nextY:Int = y + Std.int(contact.normal.y);
        //                     var nextCell = data.get(nextX,nextY,1);
        //                     if (nextCell&COLLIDABLE==0) {
        //                         body.respondStaticCollision(contact);
        //                         if (proxy.contactCallback!=null) {
        //                             proxy.contactCallback(proxy,null,contact);
        //                         }
        //                     } else {
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    public iterateCells(aabb: AABB2, cb: (aabb: AABB) => void) {
        const startX = this.data.Index(aabb.l);
        const startY = this.data.Index(aabb.t);

        const endX = this.data.Index(aabb.r) + 1;
        const endY = this.data.Index(aabb.b) + 1;

        this.workingAABB.extents.setTo(this.tileHalfSize, this.tileHalfSize);

        for (var y = startY; y < endY; y++) {
            for (var x = startX; x < endX; x++) {
                var cell = this.data.get(x, y, 0);
                if ((cell & SOLID) == SOLID) {
                    this.workingAABB.position.setTo(
                        x * this.tileSize + this.tileHalfSize,
                        y * this.tileSize + this.tileHalfSize
                    );
                    cb(this.workingAABB);
                }
            }
        }
    }

    public castRay(ray: Ray): boolean {
        var x = this.data.Index(ray.origin.x);
        var y = this.data.Index(ray.origin.y);
        const cX = x * this.tileSize;
        const cY = y * this.tileSize;
        const d = ray.direction;
        if (d.x == 0.0 && d.y == 0.0) return true;
        var stepX: number = 0.0;
        var tMaxX: number = 100000000.0;
        var tDeltaX: number = 0.0;
        if (d.x < 0) {
            stepX = -1;
            tMaxX = (cX - ray.origin.x) / d.x;
            tDeltaX = this.tileSize / -d.x;
        } else if (d.x > 0) {
            stepX = 1;
            tMaxX = (cX + this.tileSize - ray.origin.x) / d.x;
            tDeltaX = this.tileSize / d.x;
        }

        var stepY: number = 0;
        var tMaxY: number = 100000000;
        var tDeltaY: number = 0;
        if (d.y < 0) {
            stepY = -1;
            tMaxY = (cY - ray.origin.y) / d.y;
            tDeltaY = this.tileSize / -d.y;
        } else if (d.y > 0) {
            stepY = 1;
            tMaxY = (cY + this.tileSize - ray.origin.y) / d.y;
            tDeltaY = this.tileSize / d.y;
        }

        var distX = 0.0;
        var distY = 0.0;

        var transitionEdgeNormalX = 0;
        var transitionEdgeNormalY = 0;

        while (true) {
            if (tMaxX < tMaxY) {
                distX = tMaxX * d.x;
                distY = tMaxX * d.y;
                tMaxX += tDeltaX;
                x += stepX;
            } else {
                distX = tMaxY * d.x;
                distY = tMaxY * d.y;
                tMaxY += tDeltaY;
                y += stepY;
            }

            if (distX * distX + distY * distY > ray.range * ray.range) return false;

            const tile = this.data.get(x, y, 0);
            if ((tile & SOLID) == SOLID) {
                if (tMaxX < tMaxY) {
                    transitionEdgeNormalX = stepX < 0 ? 1 : -1;
                    transitionEdgeNormalY = 0;
                } else {
                    transitionEdgeNormalX = 0;
                    transitionEdgeNormalY = stepY < 0 ? 1 : -1;
                }
                ray.report(distX, distY, transitionEdgeNormalX, transitionEdgeNormalY);
                return true;
            }
        }
    }
}
