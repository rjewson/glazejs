const BITS_PER_INT = 31;

export class BitVector {
    public bitCount: number;
    public wordCount: number;
    public maxBit: number;
    public values: Uint32Array;

    constructor(size: number) {
        this.reset(size);
    }

    public get(index: number): boolean {
        const word = this.getWord(index);
        return word === -1 ? false : ((this.values[word] >> index % BITS_PER_INT) & 1) === 1;
    }

    public set(index: number, value: boolean): boolean {
        const word = this.getWord(index);
        if (word === -1) return false;
        if (value) {
            this.values[word] |= 1 << index % BITS_PER_INT;
        } else {
            this.values[word] &= ~(1 << index % BITS_PER_INT);
        }
        return true;
    }

    public maskAll(mask: BitVector) {
        for (var i = 0; i < this.wordCount; i++) {
            const maskWord = mask.values[i];
            if ((maskWord & this.values[i]) !== maskWord) {
                return false;
            }
        }
        return true;
    }

    public maskNone(mask: BitVector) {
        for (var i = 0; i < this.wordCount; i++) {
            const maskWord = mask.values[i];
            if (maskWord & this.values[i]) {
                return false;
            }
        }
        return true;
    }

    public not() {
        for (var i = 0; i < this.wordCount; i++) {
            this.values[i] = ~this.values[i];
        }
    }

    public and(bv: BitVector) {
        for (var i = 0; i < this.wordCount; i++) {
            this.values[i] = this.values[i] & bv.values[i];
        }
    }

    public or(bv: BitVector) {
        for (var i = 0; i < this.wordCount; i++) {
            this.values[i] = this.values[i] | bv.values[i];
        }
    }

    public xor(bv: BitVector) {
        for (var i = 0; i < this.wordCount; i++) {
            this.values[i] = this.values[i] ^ bv.values[i];
        }
    }
    public getWord(index: number) {
        return index < 0 || index > this.maxBit ? -1 : ~~(index / BITS_PER_INT);
    }

    public reset(bitCount: number) {
        this.bitCount = bitCount;
        this.wordCount = Math.ceil(this.bitCount / BITS_PER_INT);
        this.values = new Uint32Array(this.wordCount);
        this.maxBit = this.bitCount - 1;
    }
}
