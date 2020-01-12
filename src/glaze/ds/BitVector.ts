export class BitVector {
    public size: number;
    public values: Uint32Array;

    constructor(size: number) {
        this.reset(size);
    }

    public get(index: number) {
        const r = index % 32;
        const pos = (index - r) / 32;
        return !!(this.values[pos] & (1 << r));
    }

    public set(index: number, value: boolean) {
        const r = index % 32;
        const pos = (index - r) / 32;
        if (value) {
            this.values[pos] |= (1 << r);
        } else {
            this.values[pos] &= ~(1 << r);
        }
    }

    public maskAll(mask: BitVector) {
        for (var i = 0; i < this.size; i++) {
            const maskWord = mask.values[i];
            // FIXME Bug with 32'nd position
            if ((maskWord & this.values[i]) !== maskWord) {
                return false;
            }
        }
        return true;
    }

    public maskNone(mask: BitVector) {
        for (var i = 0; i < this.size; i++) {
            const maskWord = mask.values[i];
            if (maskWord & this.values[i]) {
                return false;
            }
        }
        return true;
    }

    public not() {
        for (var i = 0; i < this.size; i++) {
            this.values[i] = ~this.values[i];
        }
    }

    public and(bv: BitVector) {
        for (var i = 0; i < this.size; i++) {
            this.values[i] = this.values[i] & bv.values[i];
        }
    }

    public or(bv: BitVector) {
        for (var i = 0; i < this.size; i++) {
            this.values[i] = this.values[i] | bv.values[i];
        }
    }

    public xor(bv: BitVector) {
        for (var i = 0; i < this.size; i++) {
            this.values[i] = this.values[i] ^ bv.values[i];
        }
    }

    public reset(size: number) {
        this.size = size;
        this.values = new Uint32Array(this.size);
        for (var i = 0; i < Math.ceil(this.size / 32); i++) {
            this.values[i] = 0;
        }
    }
}
