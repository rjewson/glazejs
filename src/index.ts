import { GameTestA } from "./test/GameTestA";
import { DigitalInput } from "./glaze/util/DigitalInput";
import { Vector2 } from "./glaze/geom/Vector2";
import { listenDebugButtons } from "./glaze/tools/HTMLDevTools";

// const useWorker = false;

const canvas: HTMLCanvasElement = document.getElementById("view") as HTMLCanvasElement;

// const buffer = useWorker ? new Uint32Array(new SharedArrayBuffer(1024)) : null;

const input = new DigitalInput();
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

const game = new GameTestA(canvas, input);
listenDebugButtons(game.engine);

