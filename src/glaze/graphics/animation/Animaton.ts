import { Randomnumber } from "../../util/Random";
import { Frame } from "../frame/Frame";

export class Animation {

    public name: string;
    public frameRate:number;    
    public frames: Array<Frame>;
    public looped: boolean;
    public flipX: boolean;
    public flipY: boolean;
    public msPerFrame: number;
    public length: number;

    constructor(
        name: string,
        frames: Array<Frame>,
        frameRate: number = 0,
        looped: boolean = true,
        flipX: boolean = false,
        flipY: boolean = false,
    ) {
        this.name = name;
        this.frameRate = frameRate;
        this.frames = frames;
        this.looped = looped;
        this.flipX = flipX;
        this.flipY = flipY;
        this.msPerFrame = 1000/this.frameRate;
        this.length = this.frames.length; 
    }

   
}
