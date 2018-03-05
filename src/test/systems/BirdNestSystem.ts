import { System } from "../../glaze/ecs/System";
import { Position } from "../../glaze/core/components/Position";
import { BirdNest } from "../components/BirdNest";
import { Viewable } from "../../glaze/core/components/Viewable";
import { Active } from "../../glaze/core/components/Active";
import { Entity } from "../../glaze/ecs/Entity";
import { Extents } from "../../glaze/core/components/Extents";
import { PhysicsCollision } from "../../glaze/physics/components/PhysicsCollision";
import { Fixed } from "../../glaze/core/components/Fixed";
import { BFProxy } from "../../glaze/physics/collision/BFProxy";
import { Contact } from "../../glaze/physics/collision/Contact";
import { BirdFactory } from "../factories/character/BirdFactory";
import { EntityFilterOptions, CombatUtils } from "../../glaze/util/CombatUtils";
import { State } from "../../glaze/core/components/State";

export class BirdNestSystem extends System {
    constructor() {
        super([Position, BirdNest, Viewable, Active]);
    }

    onEntityAdded(entity: Entity, position: Position, birdNest: BirdNest, viewable: Viewable, active: Active) {
        birdNest.trigger = this.engine.createEntity();
        this.engine.addComponentsToEntity(birdNest.trigger, [
            position,
            new Extents(birdNest.radius / 2, birdNest.radius / 2),
            new PhysicsCollision(true, null, [this.triggerCallback]),
            new Fixed(),
            new Active(),
        ]);
        // entity.addChildEntity(nest.trigger);
    }

    updateEntity(entity: Entity, position: Position, birdNest: BirdNest, viewable: Viewable, active: Active) {
        if (birdNest.intervalDelay.tick(this.dt)) {
            var target = this.evaluateTargets(entity);
            if (target >= 0) {
                this.releaseBird(entity, target);
            }
        }

        if (birdNest.triggered) {
            birdNest.triggered = false;
        } else {
        }
    }

    public triggerCallback(a: BFProxy, b: BFProxy, contact: Contact) {
        // a.entity.parent.getComponent(BirdNest).triggered = true;
        // console.log("trigger");
    }

    public evaluateTargets(entity: Entity): Entity {
        const position = this.engine.getComponentForEntity(entity, Position);
        var entities = CombatUtils.SearchSortAndFilter(position.coords, 200, entity, EntityFilterOptions.ALL).entities;
        return entities.length > 0 ? entities[0].entity : -1;
    }

    public releaseBird(entity: Entity, target: Entity) {
        var nest = this.engine.getComponentForEntity(entity, BirdNest);
        if (nest.group.hasCapacity()) {
            const position = this.engine.getComponentForEntity(entity, Position);
            var bird = BirdFactory.create(this.engine, position.clone(), position, entity);
            const state = this.engine.getComponentForEntity(bird,State)
            nest.group.addMember(entity,state);
            // nest.birds.push(bird);
        }
    }
}
