import { System } from "./System";
import { Engine } from "./Engine";

export class Phase {
    public engine: Engine;
    public systems: System[];

    constructor() {
        this.systems = [];
    }

    public addSystem(system: System): System {
        this.engine.addPhaseSystemToEngine(system);
        this.systems.push(system);
        return system;
    }

    public updatePhase(dt: number, timestamp: number) {
        for (const system of this.systems) {
            system.updateSystem(dt, timestamp);
        }
    }
}
