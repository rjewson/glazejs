import { TMXObject } from "../TMXMap";
import { TMXObjectPosition, TMXObjectExtents, TMXObjectGetCSVParams } from "../TMXComponentUtils";
import { PhysicsCollision } from "../../physics/components/PhysicsCollision";
import { Fixed } from "../../core/components/Fixed";
import { Active } from "../../core/components/Active";
import { Water } from "../../core/components/Water";
import { Entity } from "../../ecs/Entity";
import { Engine } from "../../ecs/Engine";



export class WaterFactory {

    static mapping: string = "Water";

    static createTMXEntity(engine:Engine, object: TMXObject): Entity {
        const entity = engine.createEntity();
        var components = [];
        components.push(TMXObjectPosition(object));
        components.push(TMXObjectExtents(object));
        components.push(new PhysicsCollision(true, null, []));
        components.push(new Fixed());
        components.push(new Active());
        components.push(new Water());
        // var forceDataArray: Array<ForceData> = [];
        // for (var i = 0; i < 10; i++) {
        //     var raw = object.properties["config" + i] as string;
        //     if (raw != null) {
        //         const config = raw.split(",").map(parseFloat);
        //         forceDataArray.push(
        //             new ForceData(
        //                 config[0],
        //                 config[1] * ForceFactory.FORCE_SCALE,
        //                 config[2] * ForceFactory.FORCE_SCALE,
        //                 config[3],
        //                 config[4],
        //             ),
        //         );
        //     }
        // }

        // components.push(new EnvironmentForce(forceDataArray));
        // components.push(new Wind(1/1000));
        // const force = engine.createEntity();
        // engine.addComponentsToEntity(force,components)
        engine.addComponentsToEntity(entity, components);
        return entity;
    }
}
