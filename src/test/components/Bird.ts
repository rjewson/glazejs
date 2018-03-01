import { Entity } from "../../glaze/ecs/Entity";
import { IntervalDelay } from "../../glaze/util/IntervalDelay";

export class Bird {
    public nest: Entity;

    // public  ai:LightStackStateMachine<Entity>;
    // public  ai2:Behavior;
    // public  ctx:BehaviorContext;

    public delay: IntervalDelay;
    public chaseCheck: IntervalDelay;

    public target: Entity;

    constructor(nest: Entity) {
        this.nest = nest;
        // this.ai = new LightStackStateMachine<Entity>();
        this.delay = new IntervalDelay(1000);
        this.chaseCheck = new IntervalDelay(500);
    }
}
