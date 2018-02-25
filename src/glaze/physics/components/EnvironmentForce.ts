import { Vector2 } from "../../geom/Vector2";

export class ForceData {
    public direction: Vector2;
    public minForce: number;
    public maxForce: number;
    public minDuration: number;
    public maxDuration: number;

    constructor(direction: number, minForce: number, maxForce: number, minDuration: number, maxDuration: number) {
        this.direction = new Vector2();
        this.direction.setUnitRotation(direction - 90);
        this.minForce = minForce;
        this.maxForce = maxForce;
        this.minDuration = minDuration;
        this.maxDuration = maxDuration;
    }
}

export class EnvironmentForce {
    public data: Array<ForceData>;

    public direction: Vector2 = new Vector2();
    public power: number = 0;
    public ttl: number = 0;

    public currentIndex: number;

    constructor(data: Array<ForceData>) {
        this.data = data;
    }
}
