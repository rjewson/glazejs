import { Engine } from "../../../glaze/ecs/Engine";
import { Entity } from "../../../glaze/ecs/Entity";
import { Filter } from "../../../glaze/physics/collision/Filter";
import { TestFilters } from "../../config/Filters";
import { Body } from "../../../glaze/physics/Body";
import { Material } from "../../../glaze/physics/Material";
import { Extents } from "../../../glaze/core/components/Extents";
import { Graphics } from "../../../glaze/graphics/components/Graphics";
import { GraphicsAnimation } from "../../../glaze/graphics/components/GraphicsAnimation";
import { PhysicsBody } from "../../../glaze/physics/components/PhysicsBody";
import { PhysicsCollision } from "../../../glaze/physics/components/PhysicsCollision";
import { Moveable } from "../../../glaze/core/components/Moveable";
import { Active } from "../../../glaze/core/components/Active";
import { Player } from "../../components/Player";
import { Position } from "../../../glaze/core/components/Position";


export class PlayerFactory {
    static create(engine: Engine, position: Position): Entity {
        var playerFilter = new Filter();
        playerFilter.categoryBits = TestFilters.PLAYER_CAT;
        playerFilter.maskBits |= TestFilters.PROJECTILE_CAT;
        playerFilter.groupIndex = TestFilters.PLAYER_GROUP; 

        var body = new Body(new Material(1,0.3,0.1));
        body.maxScalarVelocity = 0; 
        body.maxVelocity.setTo(1600,1000);

        var player = engine.createEntity();
        engine.addComponentsToEntity(player, [
            new Player(),
            position,
            new Extents(7,20), 
            new Graphics("player"),        
            new GraphicsAnimation("player","idle"),
            new PhysicsBody(body,true), 
            new PhysicsCollision(false,playerFilter,[]),
            new Moveable(),
            new Active(),
        ]);

        return player;
    }
}
