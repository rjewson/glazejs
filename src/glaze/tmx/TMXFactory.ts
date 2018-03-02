import { TMXLayer } from "./TMXMap";
import { Engine } from "../ecs/Engine";

export function createTMXLayerEntities(engine: Engine, layer: TMXLayer, factories:  Map<string,any>) {
    layer.objects.forEach(object => {
        const factory = factories.get(object.type);
        if (factory) {
            factory(engine, object);
        }
    });
}
