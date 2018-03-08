import { System } from "../../ecs/System";
import { FBOLightingRenderer } from "../render/lighting/FBOLightingRenderer";
import { TileMapCollision } from "../../physics/collision/broadphase/TileMapCollision";
import { Position } from "../../core/components/Position";
import { Viewable } from "../../core/components/Viewable";
import { Entity } from "../../ecs/Entity";
import { RandomFloat } from "../../util/Random";
import { Clamp } from "../../util/Maths";
import { Light } from "../components/Light";

export class PointLightingSystem extends System {
    public renderer: FBOLightingRenderer;

    public map: TileMapCollision;

    constructor(map: TileMapCollision) {
        super([Position, Light, Viewable]);
        this.map = map;
        this.renderer = new FBOLightingRenderer();
    }

    public preUpdate():boolean {
        this.renderer.reset();
        return true;
    }

    updateEntity(entity: Entity, position: Position, light: Light, viewable: Viewable) {
        if (light.flicker > 0) {
            light.intensity = this.nexLightIntensity(light.intensity);
            this.renderer.addLight(
                position.coords.x + RandomFloat(-10, 10),
                position.coords.y + RandomFloat(-10, 10),
                light.range * light.intensity,
                light.red,
                light.green,
                light.blue,
            );
        } else {
            this.renderer.addLight(
                position.coords.x,
                position.coords.y,
                light.range * light.intensity,
                light.red,
                light.green,
                light.blue,
            );
        }
    }

    nexLightIntensity(lastIntensity: number) {
        return Clamp(lastIntensity + (Math.random() - 0.3) / 10, 0, 1);
    }
}
