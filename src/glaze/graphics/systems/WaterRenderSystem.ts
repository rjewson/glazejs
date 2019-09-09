import { System } from "../../ecs/System";
import { Bytes2D } from "../../ds/Bytes2D";
import { PointBlockParticleRender } from "../render/particle/PointBlockParticleRender";
import { Light } from "../components/Light";
import { Position } from "../../core/components/Position";
import { Entity } from "../../ecs/Entity";
import { Vector2 } from "../../geom/Vector2";
import { Viewable } from "../../core/components/Viewable";

const airLightDropOff = 1;
const groundLightDropOff = 25;

const cornerCoef = 0.8;

export class WaterRenderSystem extends System {
    public renderer: PointBlockParticleRender;

    public waterGrid1: Bytes2D;
    // public waterGrid2: Bytes2D;

    public map: Bytes2D;
    public swapped: boolean;

    constructor(map: Bytes2D) {
        super([Position, Light, Viewable]);
        this.map = map;
        this.renderer = new PointBlockParticleRender(1280 / 16 * (720 / 16));

        this.waterGrid1 = new Bytes2D(1280 / 16, 720 / 16, 16, 1);
        // this.waterGrid2 = new Bytes2D(1280 / 16, 720 / 16, 16, 1);
        // this.waterGrid1.set(60, 10, 0, 16);
        // this.waterGrid2.set(60, 10, 0, 16);

        this.swapped = false;
    }

    public preUpdate(): boolean {
        this.renderer.ResetBatch();
        // this.sourceWaterMap.set(20, 20, 0, 255);
        // this.sourceWaterMap.set(42, 10, 0, 255);
        // this.destinationWaterMap.set(20, 20, 0, 255);
        // this.destinationWaterMap.set(42, 10, 0, 255);
        return true;
    }

    updateEntity(entity: Entity, position: Position, light: Light) {
        // const x = this.waterGrid1.Index(position.coords.x);
        // const y = this.waterGrid1.Index(position.coords.y);
        // if (this.map.get(x, y, 0) === 0) {
        //     this.sourceWaterMap.set(x, y, 0, 64);
        // }
    }

    public postUpdate() {
        const source = this.waterGrid1;
        // const dest = this.sourceWaterMap;//this.destinationWaterMap;

        for (var ypos = this.waterGrid1.height-1; ypos >=0; ypos--) {
            for (var xpos = this.waterGrid1.width - 1; xpos >=0; xpos--) {
                //if (source.get(xpos, ypos, 0) >= 0) {  // light can propigate
                // if (this.map.get(xpos, ypos, 0) == 0) {
                // const mapCell = (source.get(xpos, ypos, 0) >= 0);
                if (this.map.get(xpos, ypos, 0)>0)
                    continue;

                let cellWater = source.get(xpos, ypos, 0);

                if (cellWater === 0) continue;

                // Bellow
                if (this.map.get(xpos, ypos + 1, 0) === 0) {
                    let cellBelowWater = source.get(xpos, ypos + 1, 0);
                    if (cellBelowWater < 16) {
                        const amount = Math.min(cellWater, 16 - cellBelowWater);
                        cellWater -= amount;
                        source.set(xpos, ypos + 1, 0, cellBelowWater+amount);
                        source.set(xpos, ypos, 0, cellWater);
                        continue;
                    }
                }
                // Bellow Left
                if (this.map.get(xpos - 1, ypos + 1, 0) === 0) {
                    let cellBelowLeftWater = source.get(xpos - 1, ypos + 1, 0);
                    if (cellWater > 0 && cellBelowLeftWater < 16) {
                        const amount = Math.min(cellWater, Math.ceil((16 - cellBelowLeftWater) / 2));
                        cellWater -= amount;
                        source.set(xpos - 1, ypos + 1, 0, cellBelowLeftWater+amount);
                        source.set(xpos, ypos, 0, cellWater);
                        continue;
                    }
                }
                // Bellow Right
                if (this.map.get(xpos + 1, ypos + 1, 0) === 0) {
                    let cellBelowRighttWater = source.get(xpos + 1, ypos + 1, 0);
                    if (cellWater > 0 && cellBelowRighttWater < 16) {
                        const amount = Math.min(cellWater, Math.ceil((16 - cellBelowRighttWater) / 2));
                        cellWater -= amount;
                        source.set(xpos + 1, ypos + 1, 0, cellBelowRighttWater+amount);
                        source.set(xpos, ypos, 0, cellWater);
                        continue;
                    }
                }
                //Left
                if (this.map.get(xpos - 1, ypos, 0) === 0) {
                    let cellLeftWater = source.get(xpos - 1, ypos, 0);
                    if (cellWater > 0 && cellLeftWater < 16) {
                        const amount = Math.min(cellWater, Math.ceil((16 - cellLeftWater) / 1));
                        cellWater -= amount;
                        source.set(xpos - 1, ypos, 0, cellLeftWater+amount);
                        source.set(xpos, ypos, 0, cellWater);
                        continue;
                    }
                }
                //Right
                if (this.map.get(xpos + 1, ypos, 0) === 0) {
                    debugger;
                    let cellRightWater = source.get(xpos + 1, ypos, 0);
                    if (cellWater > 0 && cellRightWater < 16) {
                        const amount = Math.min(cellWater, Math.ceil((16 - cellRightWater) / 1));
                        cellWater -= amount;
                        source.set(xpos + 1, ypos, 0, cellRightWater+amount);
                        // source.set(xpos + 1, ypos, 0, cellWater);
                        source.set(xpos, ypos, 0, cellWater);
                        continue;
                    }
                }
                // source.set(xpos, ypos, 0, cellWater);

            }
        }

        // Set all the fixed lights to thier full values again...
        // this.sourceWaterMap.set(60, 10, 0, 16);
        source.set(60, 10, 0, 16);

        this.render(source);

    }

    render(waterMap: Bytes2D) {
        for (var ypos = 1; ypos < this.waterGrid1.height - 1; ypos++) {
            for (var xpos = 1; xpos < this.waterGrid1.width - 1; xpos++) {
                const v = waterMap.get(xpos, ypos, 0);
                this.renderer.AddSpriteToBatch(xpos * 16 + 8, ypos * 16 + 8, 16, v * 8, 0, 0, 255);
            }
        }
    }

}
