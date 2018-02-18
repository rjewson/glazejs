export class TypedArray2D {
    public w: number;
    public h: number;

    public buffer: ArrayBuffer;
    public data32: Uint32Array;
    public data8: Uint8Array;

    constructor(width: number, height: number, buffer: ArrayBuffer = null) {
        this.w = width;
        this.h = height;

        if (buffer == null) this.buffer = new ArrayBuffer(this.w * this.h * 4);
        else this.buffer = buffer;
        this.data32 = new Uint32Array(this.buffer);
        this.data8 = new Uint8Array(this.buffer);
    }

    get(x: number, y: number): number {
        return this.data32[y * this.w + x];
    }

    set(x: number, y: number, v: number) {
        this.data32[y * this.w + x] = v;
    }

    // getIndex(x:number, y:number):number {
    //     return y * w + x;
    // }
}
