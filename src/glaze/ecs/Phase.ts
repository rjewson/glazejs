import { System } from "./System";
import { Engine } from "./Engine";

export class Phase {
    public engine: Engine;
    public systems: System[];

    constructor() {
        this.systems = [];
    }

    public addSystem(system: System) {
        this.engine.addPhaseSystemToEngine(system);
        this.systems.push(system);
    }

    public updatePhase(dt: number, timestamp: number) {
        this.systems.forEach(system => system.updateSystem(dt, timestamp));
    }
}
