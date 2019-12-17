import { DigitalInput } from "./util/DigitalInput";
import { Engine } from "./ecs/Engine";
import { AssetLoader } from "./util/AssetLoader";
import { GameLoop } from "./util/GameLoop";
import { GZE } from "./GZE";
import { RenderCanvas } from "./types";

export class GlazeEngine {
    public assets: AssetLoader;
    public loop: GameLoop;
    public input: DigitalInput;
    public engine: Engine;

    public canvas: RenderCanvas;

    constructor(canvas: RenderCanvas, input: DigitalInput) {
        this.canvas = canvas;
        this.input = input;
        this.loop = new GameLoop();
        this.loop.updateFunc = this.update.bind(this);
        GZE.engine = this.engine = new Engine();
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
