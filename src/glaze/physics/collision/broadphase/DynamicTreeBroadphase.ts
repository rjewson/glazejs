import { IBroadphase, QueryCallback } from "./IBroadphase";
import { BFProxy } from "../BFProxy";
import { Collide, RayAABB } from "../Intersect";
import { TileMapCollision } from "./TileMapCollision";
import { AABB } from "../../../geom/AABB";
import { Ray } from "../Ray";
import { DynamicTree } from "./DynamicTree";
import { AABB2 } from "../../../geom/AABB2";

export class DynamicTreeBroadphase implements IBroadphase {
    public staticProxies: Array<BFProxy>;
    public dynamicProxies: Array<BFProxy>;
    public sleepingProxies: Array<BFProxy>;

    public map: TileMapCollision;

    public tree: DynamicTree;

    public tempArea: AABB2;

    constructor(map: TileMapCollision) {
        this.map = map;
        this.staticProxies = new Array<BFProxy>();
        this.dynamicProxies = new Array<BFProxy>();
        this.sleepingProxies = new Array<BFProxy>();

        this.tree = new DynamicTree();
        this.tempArea = new AABB2();
    }

    public addProxy(proxy: BFProxy) {
        var target = proxy.isStatic ? this.staticProxies : this.dynamicProxies;
        target.push(proxy);
        this.tree.trackBody(proxy);
    }

    public removeProxy(proxy: BFProxy) {
        var target = proxy.isStatic ? this.staticProxies : this.dynamicProxies;
        target.splice(target.indexOf(proxy), 1);
        this.tree.untrackBody(proxy);
    }

    public collide() {
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

            this.tree.updateBody(dynamicProxy);
        }

        var k = this.dynamicProxies.length;
        while (--k >= 0) {
            var dynamicProxy = this.dynamicProxies[k];
            this.tree.query(dynamicProxy);
            // this.tree.query(dynamicProxy, (other: BFProxy) => {
            //     Collide(dynamicProxy, other);
            //     return false;
            // });
        }
    }

    public QueryArea(aabb: AABB, result: QueryCallback, checkDynamic: boolean = true, checkStatic: boolean = true) {
        this.tempArea.copyAABB(aabb);
        this.tree.queryArea(this.tempArea,result);
    }

    public CastRay(ray: Ray, result: QueryCallback, checkDynamic: boolean = true, checkStatic: boolean = true) {
        this.map.castRay(ray);

        // TODO
        // this.tree.rayCastQuery(ray, 1000, (other: BFProxy) => {
        //     console.log("zap");
        //     return false;
        // });

        // if (checkDynamic) {
        //     for (let i = 0; i < this.sleepingProxies.length; i++) {
        //         const proxy = this.sleepingProxies[i];
        //         if (!proxy.isSensor) RayAABB(ray, proxy);
        //     }
        //     for (let i = 0; i < this.dynamicProxies.length; i++) {
        //         const proxy = this.dynamicProxies[i];
        //         if (!proxy.isSensor) RayAABB(ray, proxy);
        //     }
        // }

        // if (checkStatic) {
        //     for (let i = 0; i < this.staticProxies.length; i++) {
        //         const proxy = this.staticProxies[i];
        //         if (!proxy.isSensor) RayAABB(ray, proxy);
        //     }
        // }
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
