import { DigitalInput } from "./util/DigitalInput";
import { Engine } from "./ecs/Engine";
import { AssetLoader } from "./util/AssetLoader";
import { GameLoop } from "./util/GameLoop";
import { Vector2 } from "./geom/Vector2";
import { Entity } from "./ecs/Entity";

export interface GlazeEngineParams {
    tileSize: number;
    debug: boolean;
}

export class GlazeEngine {
    public assets: AssetLoader;
    public loop: GameLoop;
    public input: DigitalInput;
    public engine: Engine;

    public canvas: HTMLCanvasElement;

    static params: GlazeEngineParams = {
        tileSize: 16,
        debug: false
    };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.loop = new GameLoop();
        this.loop.updateFunc = this.update.bind(this);

        this.input = new DigitalInput();
        var rect = canvas.getBoundingClientRect();
        this.input.InputTarget(document, new Vector2(rect.left, rect.top));

        this.engine = new Engine();
    }

    public loadAssets(assetList: Array<string>) {
        this.assets = new AssetLoader();
        this.assets.loaded.add(this.initalize.bind(this));
        this.assets.SetImagesToLoad(assetList);
        this.assets.Load();
    }

    public initalize() {}

    public update(delta: number, now: number) {
        this.preUpdate();
        this.engine.update(delta, now);
        this.postUpdate();
    }

    public preUpdate() {}

    public postUpdate() {}
}

export type EntityCb = (engine: Engine, entity: Entity) => void;
