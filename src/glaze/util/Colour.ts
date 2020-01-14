export class Color {
    public r: number;
    public g: number;
    public b: number;
    
    constructor(r: number, g: number, b: number) {
        this.fromRGB(r, g, b);
    }

    fromRGB(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    fromHex(hex: number) {
        hex = Math.floor(hex);

        this.r = ((hex >> 16) & 255) / 255;
        this.g = ((hex >> 8) & 255) / 255;
        this.b = (hex & 255) / 255;

        return this;
    }

    fromHSL(h: number, s: number, l: number) {
        if (s === 0) {
            this.r = this.g = this.b = l;
        } else {
            var p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
            var q = 2 * l - p;

            this.r = hue2rgb(q, p, h + 1 / 3);
            this.g = hue2rgb(q, p, h);
            this.b = hue2rgb(q, p, h - 1 / 3);
        }
        return this;
    }
}

const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
    return p;
};
