import { Rectangle } from "../../../geom/Rectangle";

export class SpriteParticleSequence {
    public id: number;
    public name: String;
    public sequence: Array<Rectangle>;
    public fps: number;
    public len: number;

    public constructor(id: number, name: String, sequence: Array<Rectangle>, fps: number) {
        this.id = id;
        this.name = name;
        this.sequence = sequence;
        this.fps = fps;
        this.len = sequence.length;
    }

    public ttl(): number {
        return (this.sequence.length / this.fps) * 1000;
    }
}
