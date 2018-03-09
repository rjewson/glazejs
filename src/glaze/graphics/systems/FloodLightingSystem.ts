import { System } from "../../ecs/System";
import { Bytes2D } from "../../ds/Bytes2D";
import { PointBlockParticleRender } from "../render/particle/PointBlockParticleRender";
import { Light } from "../components/Light";
import { Position } from "../../core/components/Position";
import { Entity } from "../../ecs/Entity";
import { Vector2 } from "../../geom/Vector2";
import { Viewable } from "../../core/components/Viewable";

export class FloodLightingSystem extends System {
    public renderer: PointBlockParticleRender;

    public lightGrid: Bytes2D;

    public map: Bytes2D;

    constructor(map: Bytes2D) {
        super([Position, Light, Viewable]);
        this.map = map;
        this.renderer = new PointBlockParticleRender(1280 / 16 * (720 / 16));
        // renderer.ResizeBatch(32*32);
        this.lightGrid = new Bytes2D(1280 / 16, 720 / 16, 16, 1);
    }

    public preUpdate(): boolean {
        this.renderer.ResetBatch();
        this.lightGrid.data8.fill(255);
        return true;
    }

    updateEntity(entity: Entity, position: Position, light: Light) {
        this.renderFunc1(position.coords, light.range);
    }

    public postUpdate() {
        for (var ypos = 0; ypos < this.lightGrid.height; ypos++) {
            for (var xpos = 0; xpos < this.lightGrid.width; xpos++) {
                var v = this.lightGrid.get(xpos, ypos, 0);
                this.renderer.AddSpriteToBatch(xpos * 16 - 8, ypos * 16 - 8, 16, v, 0x00, 0x00, 0x00);
            }
        }
    }

    public renderFunc1(position: Vector2, range: number) {
        var startX = this.lightGrid.Index(Math.max(0, position.x - range));
        var startY = this.lightGrid.Index(Math.max(0, position.y - range));
        var endX = this.lightGrid.Index(Math.min(this.lightGrid.width * 16, position.x + range)) + 1;
        var endY = this.lightGrid.Index(Math.min(this.lightGrid.height * 16, position.y + range)) + 1;
        // trace(startX,endX,startY,endY);
        for (var ypos = startY; ypos < endY; ypos++) {
            for (var xpos = startX; xpos < endX; xpos++) {
                var dX = position.x - xpos * 16 + 8;
                var dY = position.y - ypos * 16 + 8;
                var pcent = (dX * dX + dY * dY) / (range * range);
                if (pcent >= 1) continue;
                var iv = Math.min(Math.max(pcent * 255, 0), 255) | 0; // WAS INT
                var currentLight = this.lightGrid.get(xpos, ypos, 0);
                if (currentLight < iv) continue;
                this.lightGrid.set(xpos, ypos, 0, iv);
            }
        }
    }
}
