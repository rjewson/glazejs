export class StateUpdater {
    public sequence: string[];
    public channel: string;
    public onChange: () => void;

    constructor(channel: string, sequence: Array<string>) {
        this.channel = channel;
        this.sequence = sequence;
    }
}
