import { IComponentFactory } from "./Component";
import { Entity } from "./Entity";
import { Engine } from "./Engine";

interface EntityEntry {
    components: any[];
    boundUpdate: () => void;
}
export class System {
    public engine: Engine;
    public components: string[];
    public members: Map<Entity, EntityEntry>;

    protected dt: number;
    protected timestamp: number;

    constructor(components: IComponentFactory[]) {
        this.members = new Map();
        this.components = components.map(factory => factory.name);
    }

    public addEntity(entity: Entity, components: any[]) {
        if (this.members.has(entity)) return;
        // console.log("adding "+this.constructor.name+" "+entity);
        const boundUpdate = this.updateEntity.bind(this, entity, ...components);
        const entry = { components, boundUpdate };
        this.members.set(entity, entry);
        this.onEntityAdded(entity, ...components);
    }

    public onEntityAdded(entity: Entity, ...components: any[]) {}

    public removeEntity(entity: Entity) {
        if (!this.members.has(entity)) return;
        const entry = this.members.get(entity);
        this.onEntityRemoved(entity, ...entry.components);
        this.members.delete(entity);
    }

    public onEntityRemoved(entity: Entity, ...components: any[]) {}

    public updateSystem(dt: number, timestamp: number) {
        this.dt = dt;
        this.timestamp = timestamp;
        if (!this.preUpdate()) {
            return
        };
        this.updateAllEntities();
        this.postUpdate();
    }

    public preUpdate():boolean {
        return true;
    }

    public updateAllEntities() {
        for(let i of this.members.keys()) {
            this.members.get(i).boundUpdate();
        }
    }

    public postUpdate() {}

    public updateEntity(entity: Entity, ...components: any[]) {}
}
