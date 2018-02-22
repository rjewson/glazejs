export class Array2D<T> {
    public data: Array<T>;

    public gridWidth: number;
    public gridHeight: number;

    public cellSize: number;
    public invCellSize: number;

    constructor(gridWidth: number, gridHeight: number, cellSize: number) {
        this.initalize(gridWidth, gridHeight, cellSize);
    }

    public initalize(gridWidth: number, gridHeight: number, cellSize: number): void {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;

        this.cellSize = cellSize;
        this.invCellSize = 1 / cellSize;

        this.data = new Array<T>(this.gridWidth * this.gridHeight);
    }

    public get(x: number, y: number): T {
        return this.data[y * this.gridWidth + x];
    }

    public getSafe(x: number, y: number): T {
        return x >= this.gridWidth || y >= this.gridHeight || x < 0 || y < 0 ? null : this.data[y * this.gridWidth + x];
    }

    public set(x: number, y: number, value: T): void {
        this.data[y * this.gridWidth + x] = value;
    }

    public Index(value: number): number {
        //FIXME Not sure this always works...
        //return Std.number(value / cellSize);
        //return Math.floor(value * invCellSize);
        return (value * this.invCellSize) | 0;
    }

    public Width(): number {
        return this.gridWidth * this.cellSize;
    }

    public Height(): number {
        return this.gridHeight * this.cellSize;
    }
}
