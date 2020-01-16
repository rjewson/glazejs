export class WaterHolder {

    public volume:number;
    public full: boolean;

    constructor(volume:number) {
        this.volume = volume;
        this.full = false;
    }
}