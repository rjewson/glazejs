export class Door {
    public type: string;
    public open: boolean;
    public triggerEvent: string;

    constructor(type: string, open: boolean, triggerEvent: string) {
        this.type = type;
        this.open = open;
        this.triggerEvent = triggerEvent;
    }
}
