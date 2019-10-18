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
import { Light } from "../../../glaze/graphics/components/Light";
import { Viewable } from "../../../glaze/core/components/Viewable";
import { Filter } from "../../../glaze/physics/collision/Filter";
import { Chicken } from "../../components/Chicken";

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
        chickenBody.setMass(0.1);
        chickenBody.setBounces(7);
        chickenBody.maxScalarVelocity = 1000;

        engine.addComponentsToEntity(chicken, [
            new Chicken(),
            position,
            new Extents(12, 12),
            new Graphics("chicken"),
            new GraphicsAnimation("chicken", "walk"),
            new PhysicsCollision(false, new Filter(), []),
            new PhysicsBody(chickenBody, true),
            new Moveable(),
            new Active(),
            // new Light(64, 1, 1, 1, 255, 255, 255),
            new Viewable(),
            // new Controllable(150),
            // new ParticleEmitter([new Explosion(4,100)])
        ]);
        return chicken;
    }
}
