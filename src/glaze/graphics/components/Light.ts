export class Light {
    public range: number;
    public attenuation: number;
    public intensity: number;
    public flicker: number;
    public red: number;
    public green: number;
    public blue: number;

    constructor(
        range: number,
        attenuation: number,
        intensity: number,
        flicker: number,
        red: number,
        green: number,
        blue: number,
    ) {
        this.range = range;
        this.attenuation = attenuation;
        this.intensity = intensity;
        this.flicker = flicker;
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
}
