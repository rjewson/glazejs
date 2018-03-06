import { BFProxy } from "../BFProxy";
import { AABB } from "../../../geom/AABB";
import { Ray } from "../Ray";

export interface QueryCallback {
    (proxy: BFProxy): boolean;
}

export interface IBroadphase {
    addProxy(proxy: BFProxy): void;
    removeProxy(proxy: BFProxy): void;
    collide(): void;
    QueryArea(aabb: AABB, result: QueryCallback, checkDynamic: boolean, checkStatic: boolean): void;
    CastRay(ray: Ray, result: QueryCallback, checkDynamic: boolean, checkStatic: boolean): void;
    // dump(): void;
    // var staticProxies:Array<BFProxy>;
    // var dynamicProxies:Array<BFProxy>;
}
