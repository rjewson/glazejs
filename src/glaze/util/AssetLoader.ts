import { Signal } from "../signals/Signal";

interface ILoader {
    Init(url: string): void;
    Load(): void;
    getKey(): string;
    getValue(): any;
}

export class AssetLoader {
    public assets: Map<string, any>;
    public loaders: Array<ILoader>;
    public completeCount: number;
    public running: boolean;

    public loaded: Signal;

    constructor() {
        this.assets = new Map();
        this.loaded = new Signal();
        this.Reset();
    }

    public Reset() {
        this.running = false;
        this.loaders = new Array<ILoader>();
    }

    public SetImagesToLoad(urls: Array<string>) {
        urls.forEach(url => this.AddAsset(url));
    }

    public AddAsset(url: string): void {
        if (this.running == true) return;
        var loader = this.LoaderFactory(url);
        loader.Init(url);
        this.loaders.push(loader);
    }

    private LoaderFactory(url: string): ILoader {
        var extention = url.substring(url.length - 3, url.length);
        if (extention == "png") return new ImageAsset(this);
        if (extention == "tmx" || extention == "xml" || extention == "son") return new BlobAsset(this);
        return null;
    }

    public Load() {
        if (this.running == true || this.loaders.length == 0) return;
        this.completeCount = this.loaders.length;
        this.running = true;
        this.loaders.forEach(loader => loader.Load());
    }

    public onLoad(item: ILoader): void {
        this.completeCount--;
        this.assets.set(item.getKey(), item.getValue());
        if (this.completeCount == 0) {
            this.loaded.dispatch();
            this.running = false;
        }
    }
}

class ImageAsset implements ILoader {
    public mgr: AssetLoader;
    public image: HTMLImageElement;
    public url: string;

    constructor(mgr: AssetLoader) {
        this.mgr = mgr;
    }

    public Init(url: string) {
        this.url = url;
        this.image = new Image();
        this.image.onload = this.onLoad.bind(this);
        this.image.crossOrigin = "anonymous";
    }

    public Load(): void {
        this.image.src = this.url + "?cb=" + Date.now();
        if (this.image.complete == true) {
            this.onLoad(null);
        }
    }

    public onLoad(event: Event): void {
        if (this.mgr != null) {
            this.mgr.onLoad(this);
        }
    }

    public getKey(): string {
        return this.url;
    }

    public getValue(): any {
        return this.image;
    }
}

class BlobAsset implements ILoader {
    public mgr: AssetLoader;
    public xhr: XMLHttpRequest;
    public url: string;

    constructor(mgr: AssetLoader) {
        this.mgr = mgr;
    }

    public Init(url: string) {
        this.url = url;
        this.xhr = new XMLHttpRequest();
        this.xhr.responseType = "text";
        this.xhr.onload = this.onLoad.bind(this);
        this.xhr.open("GET", this.url + "?cb=" + Date.now(), true);
    }

    public Load(): void {
        this.xhr.send();
    }

    public onLoad(event: Event): void {
        if (this.mgr != null) {
            this.mgr.onLoad(this);
        }
    }

    public getKey(): string {
        return this.url;
    }

    public getValue(): any {
        return this.xhr.response;
    }
}
