import { ShaderWrapper } from "../util/ShaderWrapper";

export class LightGroup {

    public radius: number;
    public maxLights: number;
    public lights: Array<LightData>;
    public activeLights: number;
    public lightingShader: ShaderWrapper;

    constructor(radius: number, maxLights: number, lightingShader: ShaderWrapper) {
        this.radius = radius;
        this.maxLights = maxLights;
        this.lightingShader = lightingShader;
        this.lights = [];
        for (let i = 0; i < this.maxLights; i++) {
            this.lights.push(new LightData());
        }
        this.reset();
    }

    public reset() {
        this.activeLights = 0;
    }

    public addLight(x: number, y: number, intensity: number, red: number, green: number, blue: number) {
        const nextLight = this.lights[this.activeLights++];
        nextLight.x = x;
        nextLight.y = y;
        nextLight.intensity = intensity;
        nextLight.red = red;
        nextLight.green = green;
        nextLight.blue = blue;
    }
}

class LightData {
    public x: number;
    public y: number;
    public intensity: number;
    public red: number;
    public green: number;
    public blue: number;
}