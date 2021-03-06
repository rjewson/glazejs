import { TMXObject } from "../TMXMap";
import { Engine } from "../../ecs/Engine";
import { TMXObjectPosition, TMXObjectExtents } from "../TMXComponentUtils";
import { PhysicsCollision } from "../../physics/components/PhysicsCollision";
import { Fixed } from "../../core/components/Fixed";
import { Active } from "../../core/components/Active";
import { ForceData, EnvironmentForce } from "../../physics/components/EnvironmentForce";
import { Wind } from "../../core/components/Wind";
import { Entity } from "../../ecs/Entity";

export class ForceFactory {
    static FORCE_SCALE: number = 1 / 100;

    static mapping: string = "Force";

    static createTMXEntity(engine:Engine, object: TMXObject): Entity {
        // debugger;
        const entity = engine.createEntity(object.name);
        var components = [];
        components.push(TMXObjectPosition(object));
        components.push(TMXObjectExtents(object));
        components.push(new PhysicsCollision(true, null, []));
        components.push(new Fixed());
        components.push(new Active(true));

        var forceDataArray: Array<ForceData> = [];
        object.properties.forEach((prop) => {
            const config = prop.value.split(",").map(parseFloat);
                forceDataArray.push(
                    new ForceData(
                        config[0],
                        config[1] * ForceFactory.FORCE_SCALE,
                        config[2] * ForceFactory.FORCE_SCALE,
                        config[3],
                        config[4],
                    ),
                );
        });

        components.push(new EnvironmentForce(forceDataArray));
        components.push(new Wind(1/1000));
        engine.addComponentsToEntity(entity, components);
        return entity;
    }
}
