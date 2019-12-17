import { Engine } from "./ecs/Engine";
import { Rectangle } from "./geom/Rectangle";
import { DebugRenderer, NullDebugRenderer } from "./graphics/render/debug/DebugRenderer";
import { Vector2 } from "./geom/Vector2";

export class GZE {
    static engine: Engine = null;

    static tileSize: number = 16;
    static maxComponentTypes: number = 128;
    static resolution: Vector2 = new Vector2(1280, 720);
    static bounds: Rectangle;

    // FIXME Hacky debug stuff
    static nullDebuggingRender: DebugRenderer = new NullDebugRenderer();
    static debuggingRender: DebugRenderer = new NullDebugRenderer();
    static debugRender: DebugRenderer = GZE.nullDebuggingRender;
    private static _debug: boolean = false;
    
    static get debug() { return GZE._debug; }
    static set debug(v: boolean) {
        GZE._debug = v;
        GZE.debugRender.Clear();
        GZE.debugRender = GZE._debug ? GZE.debuggingRender : GZE.nullDebuggingRender;
    }
}
