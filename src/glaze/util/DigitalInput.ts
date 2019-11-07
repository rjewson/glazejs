import { Vector2 } from "../geom/Vector2";

export class DigitalInput {
    public keyMap: Array<number>;
    public mousePosition: Vector2;
    public mousePreviousPosition: Vector2;
    public mouseOffset: Vector2;
    public inputCorrection: Vector2;
    private frameRef: number;
    private target: EventTarget;

    constructor() {
        this.keyMap = new Array();
        for (var i = 0; i < 256; i++) {
            this.keyMap[i] = 0;
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

    public ViewCorrectedMousePosition() {
        var pos = this.mousePosition.clone();
        pos.plusEquals(this.mouseOffset);
        return pos;
    }

    public Update(x: number, y: number): void {
        this.mouseOffset.x = x;
        this.mouseOffset.y = y;
        this.frameRef++;
        // mousePreviousPosition.x = mousePosition.x;
        // mousePreviousPosition.y = mousePosition.y;
        // mousePosition.x = target.mouseX + screenOffset.x;
        // mousePosition.y = target.mouseY + screenOffset.y;
    }

    public KeyDown(event: KeyboardEvent): void {
        if (this.keyMap[event.keyCode] == 0) {
            this.keyMap[event.keyCode] = this.frameRef;
        }
        event.preventDefault();
    }

    public KeyUp(event: KeyboardEvent): void {
        this.keyMap[event.keyCode] = 0;
        event.preventDefault();
    }

    public MouseDown(event: KeyboardEvent): void {
        this.keyMap[200] = this.frameRef;
        event.preventDefault();
    }

    public MouseUp(event: KeyboardEvent): void {
        this.keyMap[200] = 0;
        event.preventDefault();
    }

    public MouseMove(event: MouseEvent): void {
        this.mousePreviousPosition.x = this.mousePosition.x;
        this.mousePreviousPosition.y = this.mousePosition.y;
        this.mousePosition.x = event.clientX - this.inputCorrection.x;
        this.mousePosition.y = event.clientY - this.inputCorrection.y;
        event.preventDefault();
    }

    // public  RightMouseDown(event : MouseEvent) : Void {
    //     keyMap[201] = frameRef;
    // }

    // public  RightMouseUp(event : MouseEvent) : Void {
    //     keyMap[201] = 0;
    // }

    public Pressed(keyCode: number): boolean {
        return this.keyMap[keyCode] > 0;
    }

    public JustPressed(keyCode: number): boolean {
        return this.keyMap[keyCode] == this.frameRef - 1;
    }

    public PressedDuration(keyCode: number): number {
        var duration = this.keyMap[keyCode];
        return duration > 0 ? this.frameRef - duration : -1;
    }

    public Released(keyCode: number): boolean {
        return this.keyMap[keyCode] == 0;
    }
}
