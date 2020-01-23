import { Vector2 } from "../geom/Vector2";
import { IParticleEngine } from "../particle/engines/types";
import { RandomInteger } from "./Random";
import { SpriteTexture } from "../graphics/texture/SpriteTexture";

export function textureAsParticles(particleEngine: IParticleEngine,position:Vector2,direction:Vector2,texture: SpriteTexture) {
    const {width, height} = texture.frame;
    const imageData = texture.baseTexture.imageData;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            const _x = texture.frame.x + x;
            const _y = texture.frame.y + y;

            var offset = (_x + _y*imageData.width) * 4;
            var red = imageData.data[offset];
            var green = imageData.data[offset+1];
            var blue = imageData.data[offset+2];
            var alpha = imageData.data[offset+3]; 
            const m = 2;
            const vX = RandomInteger(-m,m);
            const vY = RandomInteger(-m,m);
            particleEngine.EmitParticle(
                position.x-(width)+x*2,
                position.y-(height)+y*2,
                vX,
                vY,
                0,
                0,
                5000,
                0.99999,
                true,
                true,
                null,
                2,
                alpha,
                red,
                green,
                blue
            );
        }
    }
}

export function emitRectangle(
    particleEngine: IParticleEngine,
    position: Vector2,
    extents: Vector2,
    particleSize: number,
    ttl: number = 1500,
    xV: number = 100,
    yV: number = 100,
    f: number = 10
) {
    const xCount = Math.floor((extents.x * 2) / particleSize);
    const yCount = Math.floor((extents.y * 2) / particleSize);
    for (var x = 0; x < xCount; x++) {
        for (var y = 0; y < yCount; y++) {
            const xPos = Math.floor(position.x - extents.x) + x * particleSize;
            const yPos = Math.floor(position.y - extents.y) + y * particleSize;
            const vX = RandomInteger(-xV,xV);
            const vY = RandomInteger(-yV,yV);

            particleEngine.EmitParticle(
                xPos,
                yPos,
                vX,
                vY,
                0,
                f,
                ttl,
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
