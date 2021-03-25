import { SimpleFSMStates } from "../../../glaze/ai/fsm/SimpleFSM";
import { Entity } from "../../../glaze/ecs/Entity";
import { Engine } from "../../../glaze/ecs/Engine";
import { Destroy } from "../../../glaze/core/components/Destroy";
import { Material } from "../../../glaze/physics/Material";
import { Body } from "../../../glaze/physics/Body";
import { Position } from "../../../glaze/core/components/Position";
import { Extents } from "../../../glaze/core/components/Extents";
import { Graphics } from "../../../glaze/graphics/components/Graphics";
import { GraphicsAnimation } from "../../../glaze/graphics/components/GraphicsAnimation";
import { PhysicsCollision } from "../../../glaze/physics/components/PhysicsCollision";
import { PhysicsBody } from "../../../glaze/physics/components/PhysicsBody";
import { Moveable } from "../../../glaze/core/components/Moveable";
import { Active } from "../../../glaze/core/components/Active";
import { Viewable } from "../../../glaze/core/components/Viewable";
import { Filter } from "../../../glaze/physics/collision/Filter";
import { Chicken } from "../../components/Chicken";
import { TestFilters } from "../../config/Filters";
import { Holdable } from "../../../glaze/core/components/Holdable";
import { Flammable } from "../../../glaze/core/components/physical/Flammable";
import { Light } from "../../../glaze/graphics/components/Light";

export class ChickenFactory {
    static states: SimpleFSMStates = {
        destroy: function(engine: Engine, entity: Entity) {
            if (engine.getComponentForEntity(entity, Destroy)) return;
            engine.addComponentsToEntity(entity, [new Destroy(1)]);
        },
    };

    static create(engine: Engine, position: Position): Entity {
        const chicken = engine.createEntity();

        var chickenBody = new Body(Material.RUBBER);
        chickenBody.setMass(20);
        chickenBody.setBounces(7);
        chickenBody.maxScalarVelocity = 1000;

        engine.addComponentsToEntity(chicken, [
            new Chicken(),
            position,
            new Extents(12, 12),
            new Graphics("chicken"),
            new GraphicsAnimation("chicken", "walk"),
            new PhysicsCollision(false, new Filter(0x1, 0xffffffff, TestFilters.CHICKEN_GROUP), []),
            new PhysicsBody(chickenBody, false),
            new Moveable(),
            new Holdable(),
            new Active(),
            new Viewable(),
            new Flammable(100),
            // new Light(64, 1, 1, 1, 255, 255, 255)
        ]);
        return chicken;
    }
}
