export class TileGraphics {
    public tileFrameId: string;
    public onChange: () => void;

    constructor(tileFrameId: string = "") {
        this.setTileFrameId(tileFrameId);
    }

    public setTileFrameId(value: string): string {
        this.tileFrameId = value;
        if (this.onChange != null) {
            this.onChange();
        }
        return value;
    }
}
