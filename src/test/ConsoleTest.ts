import { System } from "../glaze/ecs/System";
import { Entity } from "../glaze/ecs/Entity";
import { Engine } from "../glaze/ecs/Engine";

class Position {
    public x;
    public y;
    constructor() {
        this.x = 0;
        this.y = 0;
    }
}

class Graphics {
    public ref;
    constructor(ref) {
        this.ref = ref;
    }
}

class GraphicsSystem extends System {
    constructor() {
        super([Position, Graphics]);
    }

    onEntityAdded(entity: Entity, position: Position, graphics: Graphics) {
        console.log("added ", position);
    }

    updateEntity(entity: Entity, dt: number, position: Position, graphics: Graphics) {
        console.log(entity, dt, a);
    }
}

const engine = new Engine();
engine.addCapacityToEngine(10);
// engine.addSystemToEngine(new GraphicsSystem());

const e = engine.createEntity();
engine.addComponentsToEntity(e, [new Position(), new Graphics(1)]);

console.log(engine);
let a = 2;
engine.update(1,1);
