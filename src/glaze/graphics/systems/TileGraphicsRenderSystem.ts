import { System } from "../../ecs/System";
import { TileMapRenderer } from "../render/tile/TileMapRenderer";
import { TileMapCollision } from "../../physics/collision/broadphase/TileMapCollision";
import { Entity } from "../../ecs/Entity";
import { TileGraphics } from "../components/TileGraphics";
import { Position } from "../../core/components/Position";

interface TileFrames {
    sheets: TileFrameConfig[];
}

interface TileFrameConfig {
    [key: string]: number[];
}

export class TileGraphicsRenderSystem extends System {
    public updates: Array<Entity>;

    public frames: Map<string, Array<number>>;

    public tileMap: TileMapRenderer;
    public map: TileMapCollision;

    constructor(tileFramesConfig: any, tileMap: TileMapRenderer, map: TileMapCollision) {
        super([Position, TileGraphics]);
        this.updates = new Array();
        this.frames = new Map();
        this.tileMap = tileMap;
        this.map = map;
        this.parseFramesConfig(tileFramesConfig);
    }

    //Format
    // "switchOn":[x,y,w,h,cx,cy] 64 32 32 32 32
    //                               5  4 4 4 4
    //                              16 12 8 4 0

    public parseFramesConfig(config: any) {
        var data: TileFrames = JSON.parse(config);
        data.sheets.forEach((sheet, i) => {
            Object.keys(sheet).forEach(frameId => {
                sheet[frameId].push(i);
                this.frames.set(frameId, sheet[frameId]);
            });
        });
    }

    onEntityAdded(entity: Entity, position: Position, tileGraphics: TileGraphics) {
        tileGraphics.onChange = this.onChange.bind(this, entity);
        if (tileGraphics.tileFrameId != null) this.onChange(entity);
    }

    public onChange(entity: Entity) {
        this.updates.push(entity);
    }

    updateAllEntities() {
        const updateLayer = this.tileMap.layersMap.get("Foreground1");
        while (this.updates.length > 0) {
            var entity = this.updates.pop();
            var position = this.engine.getComponentForEntity(entity, Position);
            var tileDisplay = this.engine.getComponentForEntity(entity, TileGraphics);
            if (tileDisplay.tileFrameId != "")
            updateLayer.updateMap(
                    this.map.data.Index(position.coords.x),
                    this.map.data.Index(position.coords.y),
                    this.frames.get(tileDisplay.tileFrameId),
                );
        }
    }
}
