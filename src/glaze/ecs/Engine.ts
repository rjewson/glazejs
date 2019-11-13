import { ComponentType, Component, ComponentIDName } from "./Component";
import { Entity } from "./Entity";
import { Pool } from "../util/Pool";
import { System } from "./System";
import { Phase } from "./Phase";
import { BitVector } from "../ds/BitVector";

export class Engine {
    // Map constructor.name -> array of instances of that type
    public components: Map<string, Component[]>;
    public componentTypes: Map<string, number>;

    public phases: Phase[];
    public systems: System[];
    public c4e: Map<Entity, GetC4E<Component>>;
    public entityPool: Pool<Entity>;

    private nextId: number;

    constructor() {
        this.components = new Map();
        this.componentTypes = new Map();
        this.phases = new Array();
        this.systems = new Array();
        this.c4e = new Map();
        this.entityPool = new Pool(i => i);
        this.nextId = 0;
    }

    public addCapacityToEngine(entityCount: number) {
        this.entityPool.addCapacity(entityCount);
        this.components.forEach((_, name: string) =>
            this.components.set(name, [...this.components.get(name), ...emptyNullArray(this.entityPool.capacity)])
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

    public getComponentForEntity<T>(entity: Entity, componentType: ComponentType<T>): T {
        const name = componentType.name;
        // return this.components.get(name)[entity] as T;
        if (this.components.has(name)) return this.components.get(name)[entity] as T;
        return null;
    }

    public addComponentsToEntity(entity: Entity, componentsToAdd: Component[]) {
        // This code is required to add component types
        // that might not have been seen by already registered systems
        componentsToAdd.forEach(component => {
            const name = this.createComponentEntryFromInstance(component);
            this.components.get(name)[entity] = component;
        });
        this.matchEntity(entity);
    }

    public removeComponentsFromEntityByType(entity: Entity, componentTypesToRemove: ComponentType<Component>[]) {
        componentTypesToRemove.forEach(componentType => {
            const name = componentType.name;
            if (this.components.has(name)) this.components.get(name)[entity] = null;
        });
        this.matchEntity(entity);
    }

    public addPhase(phase: Phase) {
        phase.engine = this;
        this.phases.push(phase);
    }

    public addPhaseSystemToEngine(system: System) {
        this.systems.push(system);
        const systemMask = new BitVector(4);
        system.componentTypes.forEach((component: ComponentType<Component>) => {
            const name = this.createComponentEntryFromType(component);
            systemMask.set(this.componentTypes.get(name), true);
        });
        system.onAddedToEngine(this, systemMask);
    }

    public update(dt: number, timestamp: number) {
        for (const phase of this.phases) {
            phase.updatePhase(dt, timestamp);
        }
    }

    public query(query: ComponentType<Component>[]): Entity[] {
        const result = [];
        for (var i = 0; i < this.entityPool.capacity; i++) {
            if (query.every(component => this.components.get(component.name)[i] !== null)) {
                result.push(i);
            }
        }
        return result;
    }

    private createComponentEntryFromType(componentType: ComponentType<Component>): string {
        const name = componentType.name;
        if (!this.components.has(name)) {
            const id = this.nextId++;
            this.components.set(name, emptyNullArray(this.entityPool.capacity));
            this.componentTypes.set(name, id);
            componentType.prototype[ComponentIDName] = id;
        }
        return name;
    }

    private createComponentEntryFromInstance(component: Component): string {
        const name = component.constructor.name;
        if (!this.components.has(name)) {
            const id = this.nextId++;
            this.components.set(name, emptyNullArray(this.entityPool.capacity));
            this.componentTypes.set(name, id);
            component.constructor.prototype[ComponentIDName] = id;
        }
        return name;
    }

    private matchEntity(entity: Entity) {
        this.systems.forEach(system =>
            system.componentTypes.reduce(
                (sum, componentType) => (this.components.get(componentType.name)[entity] ? sum - 1 : sum),
                system.componentTypes.length
            ) === 0
                ? system.addEntity(entity, this.entityComponentsForSystem(entity, system))
                : system.removeEntity(entity)
        );
    }

    private entityComponentsForSystem(entity: Entity, system: System) {
        return system.componentTypes.map(component => this.components.get(component.name)[entity]);
    }

    private addEntitiesToComponentList(componentName: string) {
        this.components.set(componentName, emptyNullArray(this.entityPool.capacity));
    }

    private clearAllComponentsForEntity(entity: Entity) {
        this.components.forEach((component: Component[]) => (component[entity] = null));
    }

    public snapshot(): Component {
        return {
            activeEntities: this.entityPool.assigned,
            totalEntitiesCreated: this.entityPool.totalAllocations
        };
    }
}

// const setIdOnComponent = (component: IComponent<ComponentInstance>, id: number) => (component._id_ = id);
const emptyArray = () => [];
const emptyNullArray = count => Array(count).fill(null);

export interface GetC4E<T> {
    (component: ComponentType<T>): T;
}

export const createGetComponentForEntity = <T>(engine: Engine, entity: Entity): GetC4E<T> => 
    <T>(component: ComponentType<T>): T =>
        engine.getComponentForEntity(entity, component);
