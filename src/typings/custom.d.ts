// typings/custom.d.ts
declare module "worker-loader!*" {
    class WebpackWorker extends Worker {
        constructor();
    }

    export default WebpackWorker;
}

declare module "*.glsl" {
    const value: string;
    export default value;
}

declare const __IN_DEBUG__: boolean;
declare const __IN_WORKER__: boolean;
