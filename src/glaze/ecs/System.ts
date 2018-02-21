import { IComponentFactory } from "./Component";
import { Entity } from "./Entity";
import { Engine } from "./Engine";

export class System {
    public engine:Engine;
    public components: string[];
    public members: Map<Entity, any[]>;

    constructor(components: IComponentFactory[]) {
        this.members = new Map();
        this.components = components.map(factory => factory.name);
    }

    public addEntity(entity: Entity, components: any[]) {
        this.members.set(entity, components);
        this.onEntityAdded(entity, ...components);
    }

    public onEntityAdded(entity: Entity, ...components: any[]) {}

    public removeEntity(entity: Entity) {
        if (!this.members.has(entity)) return;
        this.onEntityRemoved(entity, ...this.members.get(entity));
        this.members.delete(entity);
    }

    public onEntityRemoved(entity: Entity, ...components: any[]) {}

    public updateSystem(dt: number) {
        this.preUpdate(dt);
        this.updateAllEntities(dt);
        this.postUpdate(dt);
    }

    public preUpdate(dt: number) {}

    public updateAllEntities(dt: number) {
        this.members.forEach((components, entity) => {
            this.updateEntity(entity, dt, ...components);
        });
    }

    public postUpdate(dt: number) {}

    public updateEntity(entity: Entity, dt: number, ...components: any[]) {}
}
