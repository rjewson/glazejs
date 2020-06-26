import { Engine } from "../ecs/Engine";
import { engineToHTML } from "./HTMLUtils";
import { Player } from "../../test/components/Player";
import { Position } from "../core/components/Position";
import { ChickenFactory } from "../../test/factories/character/ChickenFactory";
import { PhysicsBody } from "../physics/components/PhysicsBody";
import { Vector2 } from "../geom/Vector2";
import { RandomInteger } from "../util/Random";
import { GZE } from "../GZE";

export const listenDebugButtons = (engine: Engine) => {
    document.getElementById("debugDump").addEventListener("click", () => {
        const targetNode = document.getElementById("debugResult");
        const htmlDump = engineToHTML(engine, 0, 100);
        targetNode.innerHTML = htmlDump;
    });
    document.getElementById("debugChickens").addEventListener("click", (e) => {
        const player = engine.query([Player])[0];
        const position = engine.getComponentForEntity(player, Position);

        for (let i = 0; i < 10; i++) {
            const chicken = ChickenFactory.create(engine, position.clone());
            const physics = engine.getComponentForEntity(chicken, PhysicsBody);

            physics.body.addForce(new Vector2(RandomInteger(-100000, 100000), RandomInteger(-100000, -5000)));
        }
        e.stopImmediatePropagation();
    });
    document.getElementById("debugDraw").addEventListener("click", (event: any) => {
        document.getElementById("viewDebug").style.display = event.target.checked ? "block" : "none";
        GZE.debug = event.target.checked;
    });
};
