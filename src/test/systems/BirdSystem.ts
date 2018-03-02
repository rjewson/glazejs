import { System } from "../../glaze/ecs/System";
import { IBroadphase } from "../../glaze/physics/collision/broadphase/IBroadphase";
import { Bird } from "../components/Bird";
import { PhysicsCollision } from "../../glaze/physics/components/PhysicsCollision";
import { Health } from "../../glaze/core/components/Health";
import { Steering } from "../../glaze/ai/steering/components/Steering";
import { Entity } from "../../glaze/ecs/Entity";
import { BroadphaseAreaQuery } from "../../glaze/util/BroadphaseAreaQuery";
import { LWFSME } from "../../glaze/ai/fsm/StackFSM";
import { CombatUtils, EntityFilterOptions } from "../../glaze/util/CombatUtils";
import { Arrival } from "../../glaze/ai/steering/behaviors/Arrival";
import { Wander } from "../../glaze/ai/steering/behaviors/Wander";
import { Position } from "../../glaze/core/components/Position";

export class BirdSystem extends System {
    bfAreaQuery: BroadphaseAreaQuery;

    constructor(bfAreaQuery: BroadphaseAreaQuery) {
        super([Bird, PhysicsCollision, Health, Steering]);
        this.bfAreaQuery = bfAreaQuery;
        this.baseState = this.baseState.bind(this);
        this.seekState = this.seekState.bind(this);
    }

    onEntityAdded(entity: Entity, bird: Bird, physicsCollision: PhysicsCollision, health: Health, steering: Steering) {
        bird.ai.pushState(this.baseState);
    }

    updateEntity(entity: Entity, bird: Bird, physicsCollision: PhysicsCollision, health: Health, steering: Steering) {
        bird.ai.update(entity,this.dt);
    }

    baseState(entity: Entity, fsm: LWFSME, delta: number) {
        const bird = this.engine.getComponentForEntity(entity, Bird);
        if (bird.delay.tick(delta)) {
            fsm.pushState(this.seekState);
        }
    }

    seekState(entity: Entity, fsm: LWFSME, delta: number) {
        const position = this.engine.getComponentForEntity(entity, Position);

        //Find enemies within 300 units
        var entities = CombatUtils.SearchSortAndFilter(position.coords, 300, entity, EntityFilterOptions.ALL).entities;
        //Found something
        if (entities.length > 0) {
            var bird = this.engine.getComponentForEntity(entity, Bird);
            bird.target = entities[0].entity;

            var steering = this.engine.getComponentForEntity(entity, Steering);
            var arrival: Arrival = steering.getBehaviour(Arrival);
            arrival.target = this.engine.getComponentForEntity(bird.target, Position).coords;
            arrival.arrivalZone = 1;

            var wander: Wander = steering.getBehaviour(Wander);
            wander.active = false;

            fsm.popState();
            fsm.pushState(this.chaseState);
            return;
        }
        fsm.popState();
    }

    chaseState(entity: Entity, fsm: LWFSME, delta: number) {}

    //     var bird = entity.getComponent(Bird);
    //     //Need to check?
    //     if (bird.chaseCheck.tick(delta))
    //         return;
    //     //Yes, ok check if we can still see the target
    //     if (glaze.util.CombatUtils.canSee(entity.getComponent(Position).coords,bird.target.getComponent(Position).coords,300))
    //         return;

    //     var bird = entity.getComponent(Bird);
    //     bird.target = null;
    //     var steering = entity.getComponent(Steering);

    //     var wander:Wander = cast steering.getBehaviour(Wander);
    //     wander.active = true;
    //     var arrival:Arrival = cast steering.getBehaviour(Arrival);
    //     arrival.target = bird.nest.getComponent(Position).coords;
    //     arrival.arrivalZone = 128;

    //     fsm.popState();

    // }
}
