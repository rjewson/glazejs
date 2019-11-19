import { Rectangle } from "../../../geom/Rectangle";
import { JSONParticles, JSONParticleSequencePattern } from "./types";
import { SpriteParticleSequence } from "./SpriteParticleSequence";
import { TexturePackerItem } from "../../../graphics/texture/TextureManager";

export class SpriteParticleManager {
    public frames: Map<String, Rectangle>;
    public sequences: Map<String, SpriteParticleSequence>;
    public sequencesList: Array<SpriteParticleSequence>;
    private count: number = 0;

    public constructor() {
        this.frames = new Map<String, Rectangle>();
        this.sequences = new Map<String, SpriteParticleSequence>();
        this.sequencesList = new Array<SpriteParticleSequence>();
    }

    public ParseSequenceJSON(sequenceConfig: JSONParticles) {
        if (!(typeof sequenceConfig === "string")) {
            return;
        }
        sequenceConfig = JSON.parse(sequenceConfig);
        Object.keys(sequenceConfig).forEach(prop => {
            const pattern = sequenceConfig[prop];
            //  pattern:JSONParticleSequencePattern = Reflect.field(sequenceData, prop);
            const seq = this.fromParticleSequencePattern(prop, pattern);
            this.sequences.set(prop, seq);
            this.sequencesList[seq.id] = seq;
        });
    }

    public ParseTexturePackerJSON(textureConfig: any) {
        if (!(typeof textureConfig === "string")) {
            return;
        }
        textureConfig = JSON.parse(textureConfig);
        const width = textureConfig.meta.size.w;
        const height = textureConfig.meta.size.h;
        Object.keys(textureConfig.frames).forEach(prop => {
            const frame: TexturePackerItem = textureConfig.frames[prop];
            const pF = new Rectangle(
                frame.frame.x / width,
                frame.frame.y / height,
                frame.frame.w / width,
                frame.frame.h / height
            );
            this.frames.set(prop, pF);
        });
    }

    public fromParticleSequencePattern(name: String, pattern: JSONParticleSequencePattern): SpriteParticleSequence {
        const list = new Array<Rectangle>();
        for (var i = pattern.start; i <= pattern.end; i++) {
            const frame = this.frames.get(pattern.pattern.replace("{x}", i + ""));
            list.push(frame);
        }
        const sequence = new SpriteParticleSequence(this.count++, name, list, pattern.fps);
        return sequence;
    }
}
