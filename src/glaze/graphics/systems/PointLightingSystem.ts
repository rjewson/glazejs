import { System } from "../../ecs/System";
import { LightRenderer } from "../render/lighting/LightRenderer";
import { TileMapCollision } from "../../physics/collision/broadphase/TileMapCollision";
import { Position } from "../../core/components/Position";
import { Viewable } from "../../core/components/Viewable";
import { Entity } from "../../ecs/Entity";
import { RandomFloat } from "../../util/Random";
import { Clamp } from "../../util/Maths";
import { Light } from "../components/Light";
import { TileLayer } from "../render/tile/TileLayer";
import { Component } from "../../ecs/Component";

export class PointLightingSystem extends System {
    public renderer: LightRenderer;

    public map: TileMapCollision;

    constructor(map: TileMapCollision, layer: TileLayer) {
        super([Position, Light, Viewable]);
        this.map = map;
        this.renderer = new LightRenderer([64, 160, 256, 320, 480], layer);
    }

    public preUpdate():boolean {
        this.renderer.reset();
        return true;
    }
    //#region stuff
    updateEntity(entity: Entity, position: Position, light: Light, viewable: Viewable) {
        if (light.flicker > 0) {
            // light.intensity = this.nexLightIntensity(light.intensity);
            this.renderer.addBlockedLight(
                position.coords.x + RandomFloat(-10, 10),
                position.coords.y + RandomFloat(-10, 10),
                light.range * light.intensity,
                light.red,
                light.green,
                light.blue,
                light.arc,
                light.angle
            );
        } else {
            this.renderer.addBlockedLight(
                position.coords.x,
                position.coords.y,
                light.range * light.intensity,
                light.red,
                light.green,
                light.blue,
                light.arc,
                light.angle
            );
        }
    }
    //#endregion
    public onEntityRemoved(entity: Entity, ...components: Component[]) {
        console.log("removed light");
    }

    nexLightIntensity(lastIntensity: number) {
        return Clamp(lastIntensity + (Math.random() - 0.3) / 10, 0, 1);
    }
}
