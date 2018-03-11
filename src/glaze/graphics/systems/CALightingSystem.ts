import { System } from "../../ecs/System";
import { Bytes2D } from "../../ds/Bytes2D";
import { PointBlockParticleRender } from "../render/particle/PointBlockParticleRender";
import { Light } from "../components/Light";
import { Position } from "../../core/components/Position";
import { Entity } from "../../ecs/Entity";
import { Vector2 } from "../../geom/Vector2";
import { Viewable } from "../../core/components/Viewable";

export class CALightingSystem extends System {
    public renderer: PointBlockParticleRender;

    public lightGrid1: Bytes2D;
    public lightGrid2: Bytes2D;

    public count: number;
    public map: Bytes2D;
    public swapped: boolean;

    constructor(map: Bytes2D) {
        super([Position, Light, Viewable]);
        this.map = map;
        this.renderer = new PointBlockParticleRender(1280 / 16 * (720 / 16));
        // renderer.ResizeBatch(32*32);
        this.lightGrid1 = new Bytes2D(1280 / 16, 720 / 16, 16, 1);
        this.lightGrid2 = new Bytes2D(1280 / 16, 720 / 16, 16, 1);
        this.lightGrid1.set(20,20,0,255);
        this.lightGrid2.set(20,20,0,255);

        this.count = 0;
        this.swapped = false;
    }

    public preUpdate(): boolean {
        this.renderer.ResetBatch();
        // this.lightGrid.data8.fill(0);
        this.count = 0;
        // this.queueLength = 0;
        return true;
    }

    updateEntity(entity: Entity, position: Position, light: Light) {
        // this.renderFunc1(this.lightGrid.Index(position.coords.x), this.lightGrid.Index(position.coords.y), 255);
    }

    public postUpdate() {
        // debugger;
        const source = this.swapped ? this.lightGrid2 : this.lightGrid1;
        const dest = this.swapped ? this.lightGrid1 : this.lightGrid2;

        for (var ypos = 1; ypos < this.lightGrid1.height-1; ypos++) {
            for (var xpos = 1; xpos < this.lightGrid1.width-1; xpos++) {
                //if (source.get(xpos, ypos, 0) >= 0) {  // light can propigate
                // if (this.map.get(xpos, ypos, 0)) {
                    const v = Math.max(
                        Math.max(
                            Math.max(
                                Math.max(source.get(xpos - 1, ypos, 0), source.get(xpos, ypos - 1, 0)),
                                source.get(xpos + 1, ypos, 0),
                            ),
                            source.get(xpos, ypos + 1, 0),
                        ) - 1,
                        0,
                    );
                    if (v>0) {
                        // debugger;
                    }
                    dest.set(xpos,ypos,0,v);
                    this.renderer.AddSpriteToBatch(xpos * 16 + 8, ypos * 16 + 8, 16, 255- (v*10), 0, 0, 0);
                // }
            }
        }
        // debugger;
        if (dest.get(20,20,0) >= 0) dest.set(20,20,0,255);
        // for (var ypos = 1; ypos < this.lightGrid1.height-1; ypos++) {
        //     for (var xpos = 1; xpos < this.lightGrid1.width-1; xpos++) {
        //         const v = dest.get(xpos,ypos,0);
        //         this.renderer.AddSpriteToBatch(xpos * 16 + 8, ypos * 16 + 8, 16, v, 0, 0, 0);
        //     }
        // }
        this.swapped = !this.swapped;
    }

    // this.adv = function() {
    //     var tmpcel;

    //     var i, j;
    //     for (i = 1; i < dim - 1; i++)
    //         for (j = 1; j < dim - 1; j++)
    //             if (ocel[i][j] >= 0)
    //                 cel[i][j] = Math.max(
    //                     Math.max(Math.max(Math.max(ocel[i - 1][j], ocel[i][j - 1]), ocel[i + 1][j]), ocel[i][j + 1]) -
    //                         1,
    //                     0,
    //                 );

    //     if (cel[dimp2][dimp2] >= 0) cel[dimp2][dimp2] = source;

    //     tmpcel = cel;
    //     cel = ocel;
    //     ocel = tmpcel;
    // };

}
