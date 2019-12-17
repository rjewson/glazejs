import { Vector2 } from "../geom/Vector2";

export const MapSize = 256;
export const BufferSize = Int32Array.BYTES_PER_ELEMENT * MapSize;
const FrameRef = 0;
const PlayerInputA = 200;
const MousePositionX = 210;
const MousePositionY = 211;
const PreviousMousePositionX = 212;
const PreviousMousePositionY = 213;


export class DigitalInput {
    public mousePosition: Vector2;
    public mousePreviousPosition: Vector2;
    public mouseOffset: Vector2;
    public inputCorrection: Vector2;

    public sharedArray: Uint32Array;

    private frameRef: number;
    private target: EventTarget;

    constructor(array: Uint32Array = null) {
        this.sharedArray = array || new Uint32Array(new ArrayBuffer(BufferSize));
        
        for (var i = 0; i < MapSize; i++) {
            this.sharedArray[i] = 0;
        }
        this.mousePosition = new Vector2();
        this.mousePreviousPosition = new Vector2();
        this.mouseOffset = new Vector2();
        this.frameRef = 2;
    }

    public InputTarget(target: EventTarget, inputCorrection: Vector2): void {
        this.target = target;
        target.addEventListener("keydown", this.KeyDown.bind(this));
        target.addEventListener("keyup", this.KeyUp.bind(this));
        target.addEventListener("mousedown", this.MouseDown.bind(this));
        //target.addEventListener("touchstart",MouseDow);

        target.addEventListener("mouseup", this.MouseUp.bind(this));
        target.addEventListener("mousemove", this.MouseMove.bind(this));
        // target.addEventListener(MouseEvent.RIGHT_MOUSE_DOWN, RightMouseDown, false, 0, true);
        // target.addEventListener(MouseEvent.RIGHT_MOUSE_UP, RightMouseUp, false, 0, true);
        this.inputCorrection = inputCorrection;
    }

    public ViewCorrectedMousePosition(position: Vector2) {
        position.x = this.sharedArray[MousePositionX] + this.mouseOffset.x;
        position.y = this.sharedArray[MousePositionY] + this.mouseOffset.y;
    }

    public Update(x: number, y: number): void {
        this.mouseOffset.x = x;
        this.mouseOffset.y = y;
        this.frameRef++;
        this.sharedArray[FrameRef] = this.frameRef;
        // mousePreviousPosition.x = mousePosition.x;
        // mousePreviousPosition.y = mousePosition.y;
        // mousePosition.x = target.mouseX + screenOffset.x;
        // mousePosition.y = target.mouseY + screenOffset.y;
    }

    public KeyDown(event: KeyboardEvent): void {
        if (this.sharedArray[event.keyCode] == 0) {
            this.sharedArray[event.keyCode] = this.frameRef;
        }
        event.preventDefault();
    }

    public KeyUp(event: KeyboardEvent): void {
        this.sharedArray[event.keyCode] = 0;
        event.preventDefault();
    }

    public MouseDown(event: KeyboardEvent): void {
        this.sharedArray[PlayerInputA] = this.frameRef;
        event.preventDefault();
    }

    public MouseUp(event: KeyboardEvent): void {
        this.sharedArray[PlayerInputA] = 0;
        event.preventDefault();
    }

    public MouseMove(event: MouseEvent): void {
        this.sharedArray[PreviousMousePositionX] = this.sharedArray[MousePositionX];
        this.sharedArray[PreviousMousePositionY] = this.sharedArray[MousePositionY];
        this.sharedArray[MousePositionX] = event.clientX - this.inputCorrection.x;
        this.sharedArray[MousePositionY] = event.clientY - this.inputCorrection.y;
        event.preventDefault();
    }

    // public  RightMouseDown(event : MouseEvent) : Void {
    //     keyMap[201] = frameRef;
    // }

    // public  RightMouseUp(event : MouseEvent) : Void {
    //     keyMap[201] = 0;
    // }

    public Pressed(keyCode: number): boolean {
        return this.sharedArray[keyCode] > 0;
    }

    public JustPressed(keyCode: number): boolean {
        return this.sharedArray[keyCode] == this.frameRef - 1;
    }

    public PressedDuration(keyCode: number): number {
        var duration = this.sharedArray[keyCode];
        return duration > 0 ? this.frameRef - duration : -1;
    }

    public Released(keyCode: number): boolean {
        return this.sharedArray[keyCode] == 0;
    }
}
