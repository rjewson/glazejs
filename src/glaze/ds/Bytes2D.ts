export class Bytes2D {
    public data: ArrayBuffer;
    private data8: Uint8Array;

    public width: number;
    public height: number;

    private numberernalWidth: number;

    public cellSize: number;
    public invCellSize: number;

    public bytesPerCell: number;

    constructor(width: number, height: number, cellSize: number, bytesPerCell: number, data?: ArrayBuffer) {
        this.initalize(width, height, cellSize, bytesPerCell, data);
    }

    public initalize(width: number, height: number, cellSize: number, bytesPerCell: number, data?: ArrayBuffer): void {
        this.width = width;
        this.height = height;

        this.numberernalWidth = width * bytesPerCell;

        this.cellSize = cellSize;
        this.invCellSize = 1 / cellSize;

        this.bytesPerCell = bytesPerCell;

        if (data == null) this.data = new ArrayBuffer(width * height * bytesPerCell);
        else this.data = data;
        this.data8 = new Uint8Array(this.data);
    }

    public get(x: number, y: number, offset: number): number {
        return this.data8[y * this.numberernalWidth + x * this.bytesPerCell + offset];
    }

    public set(x: number, y: number, offset: number, value: number) {
        this.data8[y * this.numberernalWidth + x * this.bytesPerCell + offset] = value;
    }

    public getReal(x: number, y: number, offset: number): number {
        return this.get(this.Index(x), this.Index(y), offset);
    }

    public Index(value: number): number {
        return (value * this.invCellSize) | 0;
    }

}
