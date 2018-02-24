import { IComponentFactory } from "./Component";
import { Entity } from "./Entity";
import { Pool } from "../util/Pool";
import { System } from "./System";

export class Engine {
    private components: Map<string, any[]>;
    private entities: Entity[];
    private systems: System[];
    private entityPool: Pool<Entity>;

    constructor() {
        this.components = new Map();
        this.systems = new Array();
        this.entityPool = new Pool(i => i);
    }

    public addCapacityToEngine(entityCount: number) {
        this.entityPool.addCapacity(entityCount);
        this.components.forEach((_, name: string) =>
            this.components.set(name, [...this.components.get(name), ...emptyNullArray(this.entityPool.capacity)]),
        );
    }

    public createEntity(): Entity {
        return this.entityPool.reserve();
    }

    public destroyEntity(entity: Entity): void {
        this.systems.forEach(system => system.removeEntity(entity));
        this.clearAllComponentsForEntity(entity);
        this.entityPool.free(entity);
    }

    public getComponentForEntity(entity: Entity, component: IComponentFactory) {
        const name = component.name;
        if (this.components.has(name)) return this.components.get(name)[entity];
        return null;
    }

    public addComponentsToEntity(entity: Entity, componentsToAdd: any[]) {
        componentsToAdd.forEach(component => {
            const name = component.constructor.name;
            if (this.components.has(name)) this.components.get(name)[entity] = component;
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

    public addSystemToEngine(system: System) {
        system.engine = this;
        this.systems.push(system);
        system.components.forEach((name: string) =>
            this.components.set(name, emptyNullArray(this.entityPool.capacity)),
        );
    }

    public update(dt: number, timestamp: number) {
        this.systems.forEach(system => system.updateSystem(dt));
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

    public snapshot():any {
        return {
            activeEntities: this.entityPool.assigned,
            totalEntitiesCreated: this.entityPool.totalAllocations
        }
    }

}

// const setIdOnComponent = (component: IComponent<any>, id: number) => (component._id_ = id);
const emptyArray = () => [];
const emptyNullArray = count => Array(count).fill(null);
