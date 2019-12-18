import Worker from "worker-loader!./engineWorker.ts";

import { DigitalInput } from "./glaze/util/DigitalInput";
import { Vector2 } from "./glaze/geom/Vector2";

const canvas: HTMLCanvasElement = document.getElementById("view") as HTMLCanvasElement;
const offscreen = canvas.transferControlToOffscreen();

const buffer = new Uint32Array(new SharedArrayBuffer(1024));

const input = new DigitalInput(buffer);
const rect = canvas.getBoundingClientRect();
input.InputTarget(document, new Vector2(rect.left, rect.top));

// Hackish: if were in an iframe refocus each time we click
if (window.location !== window.parent.location) {
    window.onclick = () => {
        if (!document.hasFocus()) {
            window.focus();
        }
    };
}

const worker = new Worker();
worker.postMessage({ msg: "init", offscreen, buffer }, [offscreen]);
