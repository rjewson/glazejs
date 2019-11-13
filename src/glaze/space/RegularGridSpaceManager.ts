import { ISpaceManager, SpaceManagerCb } from "./ISpaceManager";
import { Vector2 } from "../geom/Vector2";
import { Array2D } from "../ds/Array2D";
import { Entity } from "../ecs/Entity";
import { SpaceManagerProxy } from "./SpaceManagerProxy";
import { AABB } from "../geom/AABB";
import { Position } from "../core/components/Position";
import { Extents } from "../core/components/Extents";
import { AABB2 } from "../geom/AABB2";
import { DebugRenderer } from "../graphics/render/debug/DebugRenderer";
import { GZE } from "../GZE";

export class RegularGridSpaceManager implements ISpaceManager {
    public grid: Array2D<Cell>;
    public currentCells: Array<Cell>;
    public count: number = 1;
    public lastUpdatePosition: Vector2;
    public updateDistanceDelta: number = 100 * 100;

    constructor(gridWidth: number, gridHeight: number, gridCellSize: number) {
        this.grid = new Array2D(gridWidth, gridHeight, gridCellSize);
        this.currentCells = new Array<Cell>();

        for (var y = 0; y < this.grid.gridWidth; y++) {
            for (var x = 0; x < this.grid.gridHeight; x++) {
                this.grid.set(
                    x,
                    y,
                    new Cell(
                        `${x}:${y}`,
                        new AABB2(y * gridCellSize, (x + 1) * gridCellSize, (y + 1) * gridCellSize, x * gridCellSize)
                    )
                );
            }
        }
    }

    public addEntity(entity: Entity, position: Position, extents: Extents, name: string) {
        var proxy = new SpaceManagerProxy();
        proxy.aabb.position = position.coords;
        proxy.aabb.extents = extents.halfWidths;
        proxy.isStatic = true;
        proxy.entity = entity;
        proxy.name = name;
        this.hashProxy(proxy);
    }

    public hashProxy(proxy: SpaceManagerProxy) {
        const startX = this.grid.Index(proxy.aabb.position.x - proxy.aabb.extents.x);
        const startY = this.grid.Index(proxy.aabb.position.y - proxy.aabb.extents.y);

        const endX = this.grid.Index(proxy.aabb.position.x + proxy.aabb.extents.x) + 1;
        const endY = this.grid.Index(proxy.aabb.position.y + proxy.aabb.extents.y) + 1;

        // We put the same proxy in all the cells it covers
        for (var y = startY; y < endY; y++) {
            for (var x = startX; x < endX; x++) {
                var cell = this.grid.get(x, y);
                cell.proxies.push(proxy);
            }
        }
    }

    public search(viewAABB: AABB, callback: (entity: Entity, b: boolean) => void) {
        if (this.lastUpdatePosition == null) {
            this.lastUpdatePosition = viewAABB.position.clone();
        } else {
            if (this.lastUpdatePosition.distSqrd(viewAABB.position) < this.updateDistanceDelta) return;
            this.lastUpdatePosition.copy(viewAABB.position);
        }
        const startX = this.grid.Index(viewAABB.position.x - viewAABB.extents.x);
        const startY = this.grid.Index(viewAABB.position.y - viewAABB.extents.y);

        const endX = this.grid.Index(viewAABB.position.x + viewAABB.extents.x) + 1;
        const endY = this.grid.Index(viewAABB.position.y + viewAABB.extents.y) + 1;
        
        if (__IN_DEBUG__) console.log(`search ${startX} ${startY} ${endX} ${endY}`);

        for (var y = startY; y < endY; y++) {
            for (var x = startX; x < endX; x++) {
                const cell = this.grid.get(x, y);
                if (!cell) continue; // if cell was out of bounds
                if (cell.updateCount == 0) {
                    // If cell was not active
                    this.currentCells.push(cell);
                } else {
                    // else update the count
                    cell.updateCount = this.count;
                }
            }
        }

        // Update all cells
        // Going backwards because were deleting
        var i = this.currentCells.length;
        while (i-- > 0) {
            const cell = this.currentCells[i];
            if (cell.updateCount == 0) {
                this.addActiveCell(cell, viewAABB, callback);
            } else if (cell.updateCount < this.count) {
                if (__IN_DEBUG__) console.log(`Removing bucket ${cell.id}`);
                this.removeActiveCell(cell, viewAABB, callback);
                this.currentCells.splice(i, 1);
            }
        }
        if (__IN_DEBUG__) {
            this.currentCells.forEach(
                c => {
                    const refCount = c.proxies.reduce<number>((sum, v) => sum + v.referenceCount,0);
                    if (__IN_DEBUG__ && refCount>0) {
                        console.log(`${c.id}[${refCount}]`);
                    }
                }
            );
        }

        this.count++;
    }

    private addActiveCell(cell: Cell, viewAABB: AABB, callback: SpaceManagerCb) {
        cell.proxies.forEach(proxy => {
            if (proxy.referenceCount++ == 0) {
                if (__IN_DEBUG__) console.log(`Adding ${proxy.name}[${proxy.entity}] to ${cell.id}`);
                callback(proxy.entity, true);
            }
        });
        cell.updateCount = this.count;
    }

    private removeActiveCell(cell: Cell, viewAABB: AABB, callback: SpaceManagerCb) {
        cell.proxies.forEach(proxy => {
            if (--proxy.referenceCount == 0) {
                if (__IN_DEBUG__) console.log(`Removing ${proxy.name}[${proxy.entity}] from ${cell.id}`);
                callback(proxy.entity, false);
            }
        });
        //Reset the update count
        cell.updateCount = 0;
    }

    public debugDraw() {
        // draw all the nodes in the Dynamic Tree
        this.currentCells.forEach((cell, i) => {
            GZE.debugRender.DrawAABB2(cell.aabb, "green");
        });
    }
}

class Cell {
    public id: string;
    public aabb: AABB2;
    public proxies: Array<SpaceManagerProxy>;
    public updateCount: number;

    constructor(id: string, aabb: AABB2) {
        this.id = id;
        this.aabb = aabb;
        this.proxies = new Array<SpaceManagerProxy>();
        this.updateCount = 0;
    }
}
