import { IBroadphase } from "../collision/broadphase/IBroadphase";
import { PhysicsCollision } from "../components/PhysicsCollision";
import { PhysicsBody } from "../components/PhysicsBody";
import { Moveable } from "../../core/components/Moveable";
import { Entity } from "../../ecs/Entity";
import { System } from "../../ecs/System";
import { ContactManager } from "../collision/contact/types";
import { SetContactManager } from "../collision/Intersect";


export class PhysicsCollisionSystem extends System {
    public broadphase: IBroadphase;
    public contactMangager: ContactManager;

    constructor(broadphase: IBroadphase, contactManager: ContactManager) {
        super([PhysicsCollision, PhysicsBody, Moveable]);
        this.broadphase = broadphase;
        this.contactMangager = contactManager;
        SetContactManager(this.contactMangager);
    }

    onEntityAdded(entity: Entity, physicsCollision: PhysicsCollision, physicsBody: PhysicsBody, moveable: Moveable) {
        //All this really does is add the body to the proxy and run the physics
        physicsCollision.proxy.setBody(physicsBody.body);
    }

    updateAllEntities() {
        this.broadphase.collide();
        this.contactMangager.ProcessContacts();
    }
}
