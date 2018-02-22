import { ISpaceManager, SpaceManagerCb } from "./ISpaceManager";
import { Vector2 } from "../geom/Vector2";
import { Array2D } from "../ds/Array2D";
import { Entity } from "../ecs/Entity";
import { SpaceManagerProxy } from "./SpaceManagerProxy";
import { AABB } from "../geom/AABB";
import { Position } from "../core/components/Position";
import { Extents } from "../core/components/Extents";

export class RegularGridSpaceManager implements ISpaceManager {
    public grid: Array2D<Cell>;
    public currentCells: Array<Cell>;
    public count: number = 1;
    public lastUpdatePosition: Vector2;
    public updateDistanceDelta: number = 100 * 100;

    constructor(gridWidth: number, gridHeight: number, gridCellSize: number) {
        this.grid = new Array2D(gridWidth, gridHeight, gridCellSize);
        this.currentCells = new Array<Cell>();

        for (let y = 0; y < this.grid.gridWidth; y++) {
            for (let x = 0; x < this.grid.gridHeight; x++) {
                this.grid.set(x,y,new Cell());
            }
        }
    }

    public addEntity(entity: Entity, position: Position, extents: Extents) {
        var proxy = new SpaceManagerProxy();
        proxy.aabb.position = position.coords;
        proxy.aabb.extents = extents.halfWidths;
        proxy.isStatic = true;
        proxy.entity = entity;
        this.hashProxy(proxy);
    }

    public hashProxy(proxy: SpaceManagerProxy) {
        var startX = this.grid.Index(proxy.aabb.position.x - proxy.aabb.extents.x);
        var startY = this.grid.Index(proxy.aabb.position.y - proxy.aabb.extents.y);

        var endX = this.grid.Index(proxy.aabb.position.x + proxy.aabb.extents.x) + 1;
        var endY = this.grid.Index(proxy.aabb.position.y + proxy.aabb.extents.y) + 1;

        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                var cell = this.grid.get(x, y);
                cell.proxies.push(proxy);
            }
        }
    }

    public addActiveCell(cell: Cell, viewAABB: AABB, callback: SpaceManagerCb) {
        cell.proxies.forEach(proxy => {
            if (proxy.referenceCount++ == 0) {
                callback(proxy.entity, true);
            }
        });
        cell.updateCount = this.count;
    }

    public removeActiveCell(cell: Cell, viewAABB: AABB, callback: SpaceManagerCb) {
        cell.proxies.forEach(proxy => {
            if (--proxy.referenceCount == 0) {
                callback(proxy.entity, false);
            }
        });
        //Reset the update count
        cell.updateCount = 0;
    }

    public search(viewAABB: AABB, callback: (entity: Entity, b: boolean) => void) {
        if (this.lastUpdatePosition == null) {
            this.lastUpdatePosition = viewAABB.position.clone();
        } else {
            if (this.lastUpdatePosition.distSqrd(viewAABB.position) < this.updateDistanceDelta) return;
            this.lastUpdatePosition.copy(viewAABB.position);
        }
        var startX = this.grid.Index(viewAABB.position.x - viewAABB.extents.x);
        var startY = this.grid.Index(viewAABB.position.y - viewAABB.extents.y);

        var endX = this.grid.Index(viewAABB.position.x + viewAABB.extents.x) + 1;
        var endY = this.grid.Index(viewAABB.position.y + viewAABB.extents.y) + 1;

        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                var cell = this.grid.get(x, y);
                if (cell == null) continue;
                if (cell.updateCount == 0) this.currentCells.push(cell);
                else cell.updateCount = this.count;
            }
        }

        var i = this.currentCells.length;
        while (i-- > 0) {
            var cell = this.currentCells[i];
            if (cell.updateCount == 0) {
                this.addActiveCell(cell, viewAABB, callback);
            } else if (cell.updateCount < this.count) {
                this.removeActiveCell(cell, viewAABB, callback);
                this.currentCells.splice(i, 1);
            }
        }

        this.count++;
    }
}

class Cell {
    public proxies: Array<SpaceManagerProxy>;
    public updateCount: number;

    constructor() {
        this.proxies = new Array<SpaceManagerProxy>();
        this.updateCount = 0;
    }
}
