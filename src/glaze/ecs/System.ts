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
    private membersAsArray: EntityEntry[];

    protected dt: number;

    constructor(components: IComponentFactory[]) {
        this.members = new Map();
        this.membersAsArray = new Array();
        this.components = components.map(factory => factory.name);
    }

    public addEntity(entity: Entity, components: any[]) {
        const boundUpdate = this.updateEntity.bind(this, entity, ...components);
        const entry = { components, boundUpdate };
        this.members.set(entity, entry);
        this.membersAsArray.push(entry);
        this.onEntityAdded(entity, ...components);
    }

    public onEntityAdded(entity: Entity, ...components: any[]) {}

    public removeEntity(entity: Entity) {
        if (!this.members.has(entity)) return;
        const entry = this.members.get(entity);
        this.onEntityRemoved(entity, ...entry.components);
        this.members.delete(entity);
        this.membersAsArray.splice(this.membersAsArray.indexOf(entry), 1);
    }

    public onEntityRemoved(entity: Entity, ...components: any[]) {}

    public updateSystem(dt: number) {
        this.dt = dt;
        this.preUpdate();
        this.updateAllEntities();
        this.postUpdate();
    }

    public preUpdate() {}

    public updateAllEntities() {
        const len = this.membersAsArray.length;
        for (let i=0; i<len; i++) {
            this.membersAsArray[i].boundUpdate();
        }
    }

    public postUpdate() {}

    public updateEntity(entity: Entity, ...components: any[]) {}
}
