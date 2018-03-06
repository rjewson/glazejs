import { IBroadphase, QueryCallback } from "./IBroadphase";
import { BFProxy } from "../BFProxy";
import { Collide, RayAABB } from "../Intersect";
import { TileMapCollision } from "./TileMapCollision";
import { AABB } from "../../../geom/AABB";
import { Ray } from "../Ray";

export class BruteforceBroadphase implements IBroadphase {
    public staticProxies: Array<BFProxy>;
    public dynamicProxies: Array<BFProxy>;
    public sleepingProxies: Array<BFProxy>;

    public map: TileMapCollision;

    constructor(map: TileMapCollision) {
        this.map = map;
        this.staticProxies = new Array<BFProxy>();
        this.dynamicProxies = new Array<BFProxy>();
        this.sleepingProxies = new Array<BFProxy>();
    }

    public addProxy(proxy: BFProxy) {
        var target = proxy.isStatic ? this.staticProxies : this.dynamicProxies;
        target.push(proxy);
    }

    public removeProxy(proxy: BFProxy) {
        var target = proxy.isStatic ? this.staticProxies : this.dynamicProxies;
        target.splice(target.indexOf(proxy), 1);
        // target.remove(proxy);
    }

    public collide() {
        console.time("Collide");

        //Loop back over the proxies
        var i = this.dynamicProxies.length;
        while (--i >= 0) {
            var dynamicProxy = this.dynamicProxies[i];

            //Has body (therefore is in control)
            if (dynamicProxy.body != null) {
                if (!dynamicProxy.isSensor)
                    //First test against map
                    this.map.testCollision(dynamicProxy);
                //if it can sleep, sleep it
                if (dynamicProxy.body.canSleep) {
                    this.sleep(dynamicProxy);
                }
            }

            //Next test against all static proxies
            for (let i = 0; i < this.staticProxies.length; i++) {
                Collide(dynamicProxy, this.staticProxies[i]);
            }

            //Now check against the sleepers
            var k = this.sleepingProxies.length;
            while (--k >= 0) {
                var sleepingProxy = this.sleepingProxies[k];
                //its awake now?
                if (!sleepingProxy.body.canSleep) {
                    this.wake(sleepingProxy);
                } else {
                    Collide(dynamicProxy, sleepingProxy);
                }
            }

            //Finally test against dynamic
            var j = i;
            while (--j >= 0) {
                var dynamicProxyB = this.dynamicProxies[j];
                Collide(dynamicProxy, dynamicProxyB);
            }
        }
        console.timeEnd("Collide");

    }

    public QueryArea(aabb: AABB, result: QueryCallback, checkDynamic: boolean = true, checkStatic: boolean = true) {
        if (checkDynamic) {
            for (let i = 0; i < this.sleepingProxies.length; i++) {
                const proxy = this.sleepingProxies[i];
                if (!proxy.isSensor && aabb.overlap(proxy.aabb)) result(proxy);
            }
            for (let i = 0; i < this.dynamicProxies.length; i++) {
                const proxy = this.dynamicProxies[i];
                if (!proxy.isSensor && aabb.overlap(proxy.aabb)) result(proxy);
            }
        }

        if (checkStatic) {
            for (let i = 0; i < this.staticProxies.length; i++) {
                const proxy = this.staticProxies[i];
                if (!proxy.isSensor && aabb.overlap(proxy.aabb)) result(proxy);
            }
        }
    }

    public CastRay(ray: Ray, result: QueryCallback, checkDynamic: boolean = true, checkStatic: boolean = true) {
        this.map.castRay(ray);
        if (checkDynamic) {
            for (let i = 0; i < this.sleepingProxies.length; i++) {
                const proxy = this.sleepingProxies[i];
                if (!proxy.isSensor) RayAABB(ray, proxy);
            }
            for (let i = 0; i < this.dynamicProxies.length; i++) {
                const proxy = this.dynamicProxies[i];
                if (!proxy.isSensor) RayAABB(ray, proxy);
            }
        }

        if (checkStatic) {
            for (let i = 0; i < this.staticProxies.length; i++) {
                const proxy = this.staticProxies[i];
                if (!proxy.isSensor) RayAABB(ray, proxy);
            }
        }
    }
    
    public wake(proxy: BFProxy) {
        return;
        // TODO fix sleeping
        // this.sleepingProxies.splice(this.sleepingProxies.indexOf(proxy), 1);
        // proxy.body.isSleeping = false;
        // this.dynamicProxies.push(proxy);
    }

    public sleep(proxy: BFProxy) {
        return;
        // TODO fix sleeping
        // this.dynamicProxies.splice(this.dynamicProxies.indexOf(proxy), 1);
        // proxy.body.isSleeping = true;
        // this.sleepingProxies.push(proxy);
    }
}
