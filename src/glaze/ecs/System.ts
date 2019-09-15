import { ComponentType, ComponentInstance } from "./Component";
import { Entity } from "./Entity";
import { Engine } from "./Engine";
import { BitVector } from "../ds/BitVector";

interface EntityEntry {
    components: ComponentInstance[];
    boundUpdate: () => void;
}

export class System {
    public engine: Engine;
    public componentTypes: ComponentType[];
    public matchMask: BitVector
    public members: Map<Entity, EntityEntry>;

    protected dt: number;
    protected timestamp: number;

    constructor(componentTypes: ComponentType[]) {
        this.members = new Map();
        this.componentTypes = componentTypes;
    }

    public addEntity(entity: Entity, components: ComponentInstance[]) {
        if (this.members.has(entity)) return;
        const boundUpdate = this.updateEntity.bind(this, entity, ...components);
        const entry = { components, boundUpdate };
        this.members.set(entity, entry);
        this.onEntityAdded(entity, ...components);
    }

    public onEntityAdded(entity: Entity, ...components: ComponentInstance[]) {}

    public removeEntity(entity: Entity) {
        if (!this.members.has(entity)) return;
        const entry = this.members.get(entity);
        this.onEntityRemoved(entity, ...entry.components);
        this.members.delete(entity);
    }

    public onEntityRemoved(entity: Entity, ...components: ComponentInstance[]) {}

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
        for (const i of this.members) {
            i[1].boundUpdate();
        }
    }

    public postUpdate() {}

    public updateEntity(entity: Entity, ...components: ComponentInstance[]) {}
}
