import { Texture } from "../texture/Texture";
import { Vector2 } from "../../geom/Vector2";
import { Sprite } from "../displaylist/Sprite";

export class Frame {
    public name: string;
    public texture: Texture;
    public scale: Vector2;

    constructor(name: string, texture: Texture, scale: Vector2) {
        this.name = name;
        this.texture = texture;
        this.scale = scale;
    }

    public updateSprite(sprite: Sprite, flipX: number = 1, flipY: number = 1) {
        sprite.texture = this.texture;
        sprite.pivot.x = sprite.texture.frame.width * sprite.texture.pivot.x;
        sprite.pivot.y = (sprite.texture.frame.height + 2) * sprite.texture.pivot.y;
        sprite.scale.x = this.scale.x * flipX;
        sprite.scale.y = this.scale.y * flipY;
    }
}
