import { Vector2 } from "../geom/Vector2";
import { IParticleEngine } from "../particle/engines/types";
import { RandomInteger } from "./Random";

export function emitRectangle(
    particleEngine: IParticleEngine,
    position: Vector2,
    extents: Vector2,
    particleSize: number
) {
    const xCount = Math.floor((extents.x * 2) / particleSize);
    const yCount = Math.floor((extents.y * 2) / particleSize);
    for (var x = 0; x < xCount; x++) {
        for (var y = 0; y < yCount; y++) {
            const xPos = Math.floor(position.x - extents.x) + x * particleSize;
            const yPos = Math.floor(position.y - extents.y) + y * particleSize;
            const vX = RandomInteger(-100,100);
            const vY = RandomInteger(-100,100);

            particleEngine.EmitParticle(
                xPos,
                yPos,
                vX,
                vY,
                0,
                10,
                1500,
                0.99,
                true,
                true,
                null,
                particleSize,
                255,
                255,
                255,
                255
            );
        }
    }
}
