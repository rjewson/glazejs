import { GameTestA } from "./test/GameTestA";
import { DigitalInput } from "./glaze/util/DigitalInput";

let game = null;

self.addEventListener(
    "message",
    event => {
        switch (event.data.msg) {
            case "init":
                game = new GameTestA(event.data.offscreen, new DigitalInput(event.data.buffer));
                break;
            case "initCanvas":
                console.log(ctx);
                break;
        }
    },
    false
);
