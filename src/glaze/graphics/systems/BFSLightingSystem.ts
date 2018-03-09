import { System } from "../../ecs/System";
import { Bytes2D } from "../../ds/Bytes2D";
import { PointBlockParticleRender } from "../render/particle/PointBlockParticleRender";
import { Light } from "../components/Light";
import { Position } from "../../core/components/Position";
import { Entity } from "../../ecs/Entity";
import { Vector2 } from "../../geom/Vector2";
import { Viewable } from "../../core/components/Viewable";

export class BFSLightingSystem extends System {
    public renderer: PointBlockParticleRender;

    public lightGrid: Bytes2D;
    public count: number;
    public map: Bytes2D;
    public queue: Array<number>;
    private queueLength: number;

    constructor(map: Bytes2D) {
        super([Position, Light, Viewable]);
        this.map = map;
        this.renderer = new PointBlockParticleRender(1280 / 16 * (720 / 16));
        // renderer.ResizeBatch(32*32);
        this.lightGrid = new Bytes2D(1280 / 16, 720 / 16, 16, 1);
        this.count = 0;
        this.queue = new Array(1000 * 2);
    }

    public preUpdate(): boolean {
        this.renderer.ResetBatch();
        this.lightGrid.data8.fill(0);
        this.count = 0;
        this.queueLength = 0;
        return true;
    }

    updateEntity(entity: Entity, position: Position, light: Light) {
        this.renderFunc1(this.lightGrid.Index(position.coords.x), this.lightGrid.Index(position.coords.y), 255);
    }

    public postUpdate() {
        for (var ypos = 0; ypos < this.lightGrid.height; ypos++) {
            for (var xpos = 0; xpos < this.lightGrid.width; xpos++) {
                var v = this.lightGrid.get(xpos, ypos, 0);
                this.renderer.AddSpriteToBatch(xpos * 16 - 8, ypos * 16 - 8, 16, 255 - v, 0x00, 0x00, 0x00);
            }
        }
        console.log(this.count);
    }

    public renderFunc1(positionx: number, positiony: number, lastLight: number) {
        this.queue[this.queueLength++] = (lastLight << 16) | (positionx << 8) | positiony;
        while (this.queueLength) {
            let cell = this.queue[--this.queueLength];
            const l = (cell >> 16) & 0xff;
            const x = (cell >> 8) & 0xff;
            const y = cell & 0xff;
            if (x < 0 || y < 0 || x > 80 || y > 40) continue;
            const newLight = l - (this.map.get(x, y, 0) ? 50 : 25); //lastLight-map.getLightBlockingAmmoutAt(currentx, currenty);
            if (newLight < this.lightGrid.get(x, y, 0)) continue;

            this.lightGrid.set(x, y, 0, newLight);

            this.queue[this.queueLength++] = (newLight << 16) | ((x + 1) << 8) | y;
            this.queue[this.queueLength++] = (newLight << 16) | (x << 8) | (y + 1);
            this.queue[this.queueLength++] = (newLight << 16) | ((x - 1) << 8) | y;
            this.queue[this.queueLength++] = (newLight << 16) | (x << 8) | (y - 1);

            this.count++;
        }
    }
}
