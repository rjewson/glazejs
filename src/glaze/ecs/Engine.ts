import { IComponentFactory } from "./Component";
import { Entity } from "./Entity";
import { Pool } from "../util/Pool";
import { System } from "./System";
import { Phase } from "./Phase";

export class Engine {
    public components: Map<string, any[]>;
    public phases: Phase[];
    public systems: System[];
    public c4e: Map<Entity, GetC4E>;
    public entityPool: Pool<Entity>;

    constructor() {
        this.components = new Map();
        this.phases = new Array();
        this.systems = new Array();
        this.c4e = new Map();
        this.entityPool = new Pool(i => i);
    }

    public addCapacityToEngine(entityCount: number) {
        this.entityPool.addCapacity(entityCount);
        this.components.forEach((_, name: string) =>
            this.components.set(name, [...this.components.get(name), ...emptyNullArray(this.entityPool.capacity)]),
        );
    }

    public createEntity(): Entity {
        const entity = this.entityPool.reserve();
        this.c4e.set(entity, createGetComponentForEntity(this, entity));
        return entity;
    }

    public destroyEntity(entity: Entity): void {
        this.systems.forEach(system => system.removeEntity(entity));
        this.clearAllComponentsForEntity(entity);
        this.entityPool.free(entity);
        this.c4e.delete(entity);
    }

    public getComponentForEntity(entity: Entity, component: IComponentFactory) {
        const name = component.name;
        if (this.components.has(name)) return this.components.get(name)[entity];
        return null;
    }

    public addComponentsToEntity(entity: Entity, componentsToAdd: any[]) {
        componentsToAdd.forEach(component => {
            const name = component.constructor.name;
            if (!this.components.has(name)) {
                this.createComponentEntry(name);
            }
            this.components.get(name)[entity] = component;
        });
        this.matchEntity(entity);
    }

    public removeComponentsFromEntity(entity: Entity, componentsToRemove: IComponentFactory[]) {
        componentsToRemove.forEach(component => {
            const name = component.name;
            if (this.components.has(name)) this.components.get(name)[entity] = null;
        });
        this.matchEntity(entity);
    }

    public addPhase(phase: Phase) {
        phase.engine = this;
        this.phases.push(phase);
    }

    public addPhaseSystemToEngine(system: System) {
        system.engine = this;
        this.systems.push(system);
        system.components.forEach((name: string) => this.createComponentEntry(name));
    }

    public update(dt: number, timestamp: number) {
        this.phases.forEach(phase => phase.updatePhase(dt, timestamp));
    }

    public query(query: IComponentFactory[]): Entity[] {
        const result = [];
        for (let i = 0; i < this.entityPool.capacity; i++) {
            if (query.every(component => this.components.get(component.name)[i] !== null)) {
                result.push(i);
            }
        }
        return result;
    }

    private createComponentEntry(name: string) {
        this.components.set(name, emptyNullArray(this.entityPool.capacity));
    }

    private matchEntity(entity: Entity) {
        this.systems.forEach(
            system =>
                system.components.reduce(
                    (sum, name) => (this.components.get(name)[entity] ? sum - 1 : sum),
                    system.components.length,
                ) === 0
                    ? system.addEntity(entity, this.entityComponentsForSystem(entity, system))
                    : system.removeEntity(entity),
        );
    }

    private entityComponentsForSystem(entity: Entity, system: System) {
        return system.components.map(name => this.components.get(name)[entity]);
    }

    private addEntitiesToComponentList(componentName: string) {
        this.components.set(componentName, emptyNullArray(this.entityPool.capacity));
    }

    private clearAllComponentsForEntity(entity: Entity) {
        this.components.forEach((entities: Entity[]) => (entities[entity] = null));
    }

    public snapshot(): any {
        return {
            activeEntities: this.entityPool.assigned,
            totalEntitiesCreated: this.entityPool.totalAllocations,
        };
    }
}

// const setIdOnComponent = (component: IComponent<any>, id: number) => (component._id_ = id);
const emptyArray = () => [];
const emptyNullArray = count => Array(count).fill(null);

export interface GetC4E {
    (component: IComponentFactory): any;
}

export const createGetComponentForEntity = (engine: Engine, entity: Entity): GetC4E => (component: IComponentFactory) =>
    engine.getComponentForEntity(entity, component);
