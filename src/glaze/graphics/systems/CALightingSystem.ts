import { System } from "../../ecs/System";
import { Bytes2D } from "../../ds/Bytes2D";
import { PointBlockParticleRender } from "../render/particle/PointBlockParticleRender";
import { Light } from "../components/Light";
import { Position } from "../../core/components/Position";
import { Entity } from "../../ecs/Entity";
import { Vector2 } from "../../geom/Vector2";
import { Viewable } from "../../core/components/Viewable";

const airLightDropOff = 3;
const groundLightDropOff = 25;

const cornerCoef = 0.7;

export class CALightingSystem extends System {
    public renderer: PointBlockParticleRender;

    public lightGrid1: Bytes2D;
    public lightGrid2: Bytes2D;

    public map: Bytes2D;
    public swapped: boolean;

    constructor(map: Bytes2D) {
        super([Position, Light, Viewable]);
        this.map = map;
        this.renderer = new PointBlockParticleRender(1280 / 16 * (720 / 16));

        this.lightGrid1 = new Bytes2D(1280 / 16, 720 / 16, 16, 1);
        this.lightGrid2 = new Bytes2D(1280 / 16, 720 / 16, 16, 1);
        this.lightGrid1.set(20, 20, 0, 128);
        this.lightGrid2.set(20, 20, 0, 128);

        this.swapped = false;
    }

    public preUpdate(): boolean {
        this.renderer.ResetBatch();
        // this.sourceLightMap.set(20, 20, 0, 255);
        // this.sourceLightMap.set(42, 10, 0, 255);
        // this.destinationLightMap.set(20, 20, 0, 255);
        // this.destinationLightMap.set(42, 10, 0, 255);
        return true;
    }

    updateEntity(entity: Entity, position: Position, light: Light) {
        const x = this.lightGrid1.Index(position.coords.x);
        const y = this.lightGrid1.Index(position.coords.y);
        if (this.map.get(x, y, 0) === 0) {
            this.sourceLightMap.set(x, y, 0, 255);
        }
    }

    public postUpdate() {
        const source = this.sourceLightMap;
        const dest = this.destinationLightMap;

        for (var ypos = 1; ypos < this.lightGrid1.height - 1; ypos++) {
            for (var xpos = 1; xpos < this.lightGrid1.width - 1; xpos++) {
                //if (source.get(xpos, ypos, 0) >= 0) {  // light can propigate
                // if (this.map.get(xpos, ypos, 0) == 0) {
                // const mapCell = (source.get(xpos, ypos, 0) >= 0);

                const l = source.get(xpos - 1, ypos, 0);
                const t = source.get(xpos, ypos - 1, 0);
                const r = source.get(xpos + 1, ypos, 0);
                const b = source.get(xpos, ypos + 1, 0);

                const tl = source.get(xpos - 1, ypos - 1, 0) * cornerCoef;
                const tr = source.get(xpos + 1, ypos - 1, 0) * cornerCoef;
                const bl = source.get(xpos - 1, ypos + 1, 0) * cornerCoef;
                const br = source.get(xpos + 1, ypos + 1, 0) * cornerCoef;

                // const v = Math.max(Math.max(Math.max(Math.max(l, t), r), b) - lightDropOff, 0);
                // Play with this to affect the drop off
                const lightDropOff = this.map.get(xpos, ypos, 0) === 0 ? airLightDropOff : groundLightDropOff;
                const newLight = Math.max(l, t, r, b, tl, tr, bl, br) - lightDropOff;

                // clamp
                // Math.min(Math.max(newLight, 0), 255)
                // or
                // Math.max(newLight, 0)
                dest.set(xpos, ypos, 0, Math.min(Math.max(newLight, 0), 255));
            }
        }

        // Set all the fixed lights to thier full values again...
        this.sourceLightMap.set(20, 20, 0, 255);
        this.sourceLightMap.set(42, 10, 0, 255);
        this.destinationLightMap.set(20, 20, 0, 255);
        this.destinationLightMap.set(42, 10, 0, 255);

        this.render(dest);

        this.swap();
    }

    render(lightMap: Bytes2D) {
        for (var ypos = 1; ypos < this.lightGrid1.height - 1; ypos++) {
            for (var xpos = 1; xpos < this.lightGrid1.width - 1; xpos++) {
                const v = lightMap.get(xpos, ypos, 0);
                this.renderer.AddSpriteToBatch(xpos * 16 + 8, ypos * 16 + 8, 16, 255 - v, 0, 0, 0);
            }
        }
    }

    renderAverage(lightMap: Bytes2D) {
        const blend = 1 / 9;
        for (var ypos = 1; ypos < this.lightGrid1.height - 1; ypos++) {
            for (var xpos = 1; xpos < this.lightGrid1.width - 1; xpos++) {
                const a = lightMap.get(xpos - 1, ypos - 1, 0) * blend;
                const b = lightMap.get(xpos, ypos - 1, 0) * blend;
                const c = lightMap.get(xpos + 1, ypos - 1, 0) * blend;
                const d = lightMap.get(xpos - 1, ypos, 0) * blend;
                const e = lightMap.get(xpos, ypos, 0) * blend;
                const f = lightMap.get(xpos + 1, ypos, 0) * blend;
                const g = lightMap.get(xpos - 1, ypos + 1, 0) * blend;
                const h = lightMap.get(xpos, ypos + 1, 0) * blend;
                const v = a + b + c + d + e + f + g + h;
                const cv = Math.min(Math.max(v, 0), 255);
                this.renderer.AddSpriteToBatch(xpos * 16 + 8, ypos * 16 + 8, 16, 255 - v, 0, 0, 0);
            }
        }
    }

    get sourceLightMap() {
        return this.swapped ? this.lightGrid2 : this.lightGrid1;
    }
    get destinationLightMap() {
        return this.swapped ? this.lightGrid1 : this.lightGrid2;
    }
    swap() {
        this.swapped = !this.swapped;
    }
}
