import { ComponentType, Component } from "./Component";
import { Entity } from "./Entity";
import { Engine } from "./Engine";
import { BitVector } from "../ds/BitVector";

interface EntityEntry {
    components: Component[];
    boundUpdate: () => void;
}

export class System {
    public engine: Engine;
    public componentTypes: ComponentType<Component>[];
    public matchMask: BitVector;
    public members: Map<Entity, EntityEntry>;

    protected dt: number;
    protected timestamp: number;

    constructor(componentTypes: ComponentType<Component>[]) {
        this.members = new Map();
        this.componentTypes = componentTypes;
    }

    public onAddedToEngine(engine: Engine, matchMask: BitVector) {
        this.engine = engine;
        this.matchMask = matchMask;
    }

    public addEntity(entity: Entity, components: Component[]) {
        if (this.members.has(entity)) return;
        const boundUpdate = this.updateEntity.bind(this, entity, ...components);
        const entry = { components, boundUpdate };
        this.members.set(entity, entry);
        this.onEntityAdded(entity, ...components);
    }

    public onEntityAdded(entity: Entity, ...components: Component[]) {}

    public removeEntity(entity: Entity) {
        if (!this.members.has(entity)) return;
        const entry = this.members.get(entity);
        this.onEntityRemoved(entity, ...entry.components);
        this.members.delete(entity);
    }

    public onEntityRemoved(entity: Entity, ...components: Component[]) {}

    public updateSystem(dt: number, timestamp: number) {
        this.dt = dt;
        this.timestamp = timestamp;
        if (!this.preUpdate()) {
            return;
        }
        this.updateAllEntities();
        this.postUpdate();
    }

    public preUpdate(): boolean {
        return true;
    }

    public updateAllEntities() {
        for (const entity of this.members) {
            entity[1].boundUpdate();
        }
        // for (const entity of this.members.values()) {
        //     entity.boundUpdate();
        // }
    }

    public postUpdate() {}

    public updateEntity(entity: Entity, ...components: Component[]) {}
}
