import { TMXLayer } from "./TMXMap";
import { Engine } from "../ecs/Engine";
import { IEntityFactory } from "./IEntityFactory";

export function createTMXLayerEntities(engine: Engine, layer: TMXLayer, factories: IEntityFactory[]) {
    const factoryMap: Map<string, IEntityFactory> = new Map();
    factories.forEach(factory => factoryMap.set(factory.mapping(), factory));
    layer.objects.forEach(object => {
        const factory = factoryMap.get(object.name);
        if (factory) {
            const entity = engine.createEntity();
            engine.addComponentsToEntity(entity, factory.createEntity(object));
        }
    });
}
