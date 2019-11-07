import { System } from "../../glaze/ecs/System";
import { IParticleEngine } from "../../glaze/particle/engines/IParticleEngine";
import { DigitalInput } from "../../glaze/util/DigitalInput";
import { Entity } from "../../glaze/ecs/Entity";
import { PhysicsBody } from "../../glaze/physics/components/PhysicsBody";
import { Position } from "../../glaze/core/components/Position";
import { GraphicsAnimation } from "../../glaze/graphics/components/GraphicsAnimation";
import { CharacterController } from "../../glaze/util/CharacterController";
import { Filter } from "../../glaze/physics/collision/Filter";
import { Player } from "../components/Player";
import { PhysicsCollision } from "../../glaze/physics/components/PhysicsCollision";
import { Explosion } from "../../glaze/particle/emitter/Explosion";
import { Extents } from "../../glaze/core/components/Extents";
import { RandomFloat } from "../../glaze/util/Random";
import { StandardBullet } from "../factories/projectile/StandardBullet";
import { BeeFactory } from "../factories/character/BeeFactory";
import { Holder } from "../../glaze/core/components/Holder";
import { TestFilters } from "../config/Filters";
import { Moveable } from "../../glaze/core/components/Moveable";
import { Active } from "../../glaze/core/components/Active";
import { Held } from "../../glaze/core/components/Held";
import { Ballistics } from "../../glaze/util/Ballastics";
import { PlasmaBall } from "../factories/projectile/PlasmaBall";
import { Hierachy } from "../../glaze/core/components/Hierachy";
import { Attachment } from "../../glaze/core/components/Attachment";
import { Vector2 } from "../../glaze/geom/Vector2";
import { Light } from "../../glaze/graphics/components/Light";
import { Key } from "../../glaze/util/Keycodes";
/*
backspace   8
tab 9
enter   13
shift   16
ctrl    17
alt 18
pause/break 19
caps lock   20
escape  27
page up 33
page down   34
end 35
home    36
left arrow  37
up arrow    38
right arrow 39
down arrow  40
insert  45
delete  46

0   48
1   49
2   50
3   51
4   52
5   53
6   54
7   55
8   56
9   57

a   65
b   66
c   67
d   68
e   Key.E
f   70
g   71
h   Key.H
i   73
j   Jey.Jey
k   75
l   76
m   77
n   78
o   79
p   80
q   81
r   82
s   83
t   84
u   85
v   86
w   87
x   88
y   89
z   90
*/
export class PlayerSystem extends System {
    public particleEngine: IParticleEngine;
    public input: DigitalInput;

    player: Entity;
    position: Position;
    physicsBody: PhysicsBody;

    playerLight: Light;
    playerHolder: Entity;
    holder: Holder;
    //  inventory:Inventory;

    animation: GraphicsAnimation;

    characterController: CharacterController;

    playerFilter: Filter;

    currentWeapon: number = 0;

    constructor(input: DigitalInput, particleEngine: IParticleEngine) {
        super([Position, Player, PhysicsCollision, PhysicsBody, GraphicsAnimation, Extents]);
        this.input = input;
        this.particleEngine = particleEngine;
    }

    onEntityAdded(
        entity: Entity,
        position: Position,
        player: Player,
        physicsCollision: PhysicsCollision,
        physicsBody: PhysicsBody,
        graphicsAnimation: GraphicsAnimation,
        extents: Extents,
    ) {
        // physicsBody.body.setMass(880);
        physicsBody.body.usesStairs = true;
        // physicsBody.body.isBullet = true;

        this.characterController = new CharacterController(this.input, physicsBody.body, 800);

        // TODO
        // playerLight = engine.createEntity(
        //     [
        //     position,
        //     new Light(256,1,1,0,255,255,255),
        //     new Viewable(),
        //     new Moveable(),
        //     new Active()
        //     ],"player light");
        // TODO
        this.playerLight = new Light(256, 1, 1, 0, 255, 0, 0),
        // this.engine.addComponentsToEntity(entity, [this.playerLight]);
        this.holder = new Holder(entity);
        // TODO
        // inventory = new Inventory(4);

        this.playerHolder = this.engine.createEntity();
        this.engine.addComponentsToEntity(this.playerHolder, [
            new Position(0,0),
            new Attachment(new Vector2(0,0)),
            extents,
            this.holder,
            new PhysicsCollision(true, new Filter(1, 0, TestFilters.PLAYER_GROUP), [], false, physicsBody.body),
            new Moveable(),
            new Active(),
        ]);
        Hierachy.addChild(this.engine, entity, this.playerHolder);
        // player.addChildEntity(playerLight);

        // playerFilter = entity.getComponent(PhysicsCollision).proxy.filter;

        // animation = entity.getComponent(SpriteAnimation);
    }

    updateEntity(
        entity: Entity,
        position: Position,
        player: Player,
        physicsCollision: PhysicsCollision,
        physicsBody: PhysicsBody,
        graphicsAnimation: GraphicsAnimation,
        extents: Extents,
    ) {
        this.characterController.update();

        // if (characterController.isWalking) {
        if (physicsBody.body.onGround && Math.abs(physicsBody.body.velocity.x) > 10) {
            graphicsAnimation.play("runright");
        } else if (!physicsBody.body.onGround) {
            graphicsAnimation.play("fly");
        } else {
            graphicsAnimation.play("idle");
        }

        if (this.characterController.left > 0) position.direction.x = -1;
        if (this.characterController.right > 0) position.direction.x = 1;

        physicsBody.body.collideOneWay = !(this.characterController.down > 0);

        var fire = this.input.JustPressed(32);
        var search = this.input.JustPressed(71);
        var hold = this.input.Pressed(Key.J);
        var ray = this.input.Pressed(Key.R);

        // TODO
        // if (this.input.JustPressed(84)) {
        //     var lightActive = playerLight.getComponent(Viewable);
        //     if (lightActive!=null)
        //         playerLight.removeComponent(lightActive);
        //         // playerLight.removeComponent2(Light);
        //     else
        //         playerLight.addComponent(new Viewable());
        // }
        // TODO
        if (this.input.Pressed(Key.U)) {
            BeeFactory.create(this.engine, position.clone());
        }
        // TODO
        this.holder.activate = this.input.JustPressed(Key.H);

        // TODO
        if (this.input.JustPressed(Key.J)) {
            //Drop Item 'J'
            // var item = this.holder.drop();
            Holder.drop(this.engine, this.holder);
        } else if (this.input.JustPressed(Key.K)) {
            //Throw Item 'K'
            const item = Holder.drop(this.engine, this.holder);
            if (item != null) {
                Ballistics.calcProjectileVelocity(
                    this.engine.getComponentForEntity(item, PhysicsBody).body,
                    this.input.ViewCorrectedMousePosition(),
                    700,
                );
            }
        }

        // TODO
        // if (this.input.JustPressed(81)) { //Q
        //     if (holder.heldItem!=null) {
        //         var state = holder.heldItem.getComponent(State);
        //         if (state!=null) {
        //             state.incrementState();
        //         }
        //     }
        // }

        // if (this.input.JustPressed(90)) {
        //     // js.Lib.debug();

        //     inventory.store();
        // }

        // if (this.input.JustPressed(88)) {
        //     inventory.retrieve();
        // }

        if (fire) {
            if (this.currentWeapon == 0) {
                StandardBullet.create(
                    this.engine,
                    position.clone(),
                    physicsCollision.proxy.filter.clone(),
                    this.input.ViewCorrectedMousePosition(),
                );
            }
            if (this.currentWeapon == 1)
                PlasmaBall.create(
                    this.engine,
                    position.clone(),
                    physicsCollision.proxy.filter.clone(),
                    this.input.ViewCorrectedMousePosition(),
                );
        }
        //'e' aim
        if (this.input.Pressed(Key.E)) {
            var vel = this.input.ViewCorrectedMousePosition().clone();
            vel.minusEquals(position.coords);
            vel.normalize();
            vel.multEquals(2000);
            this.particleEngine.EmitParticle(
                position.coords.x,
                position.coords.y,
                vel.x,
                vel.y,
                0,
                0,
                200,
                1,
                false,
                true,
                null,
                4,
                255,
                255,
                255,
                255,
            );
        }

        if (this.characterController.burn > 0) {
            var ttl = 280;
            var offsetx = position.coords.x - 8 * position.direction.x;
            var velocity = 200 + RandomFloat(-150, 150); // + physicsBody.body.velocity.y;
            var count = Math.floor((this.characterController.burn + 500) / 1000);
            if (count > 0)
                this.particleEngine.EmitParticle(
                    offsetx,
                    position.coords.y + 6,
                    RandomFloat(-10, 10),
                    velocity,
                    0,
                    0,
                    40,
                    0.9,
                    false,
                    false,
                    null,
                    4,
                    255,
                    255,
                    0,
                    0,
                );
            for (var i = 0; i < count; i++) {
                this.particleEngine.EmitParticle(
                    offsetx,
                    position.coords.y + 6,
                    RandomFloat(-50, 50),
                    velocity,
                    0,
                    0,
                    ttl,
                    0.9,
                    true,
                    true,
                    null,
                    4,
                    255,
                    255,
                    255,
                    255,
                );
            }
        }

        if (this.input.JustPressed(Key.One)) this.currentWeapon = 0;
        if (this.input.JustPressed(Key.Two)) this.currentWeapon = 1;

        if (this.input.JustPressed(Key.L)) {
            if (this.engine.getComponentForEntity(entity, Light)) {
                this.engine.removeComponentsFromEntityByType(entity, [Light]);
            } else {
                this.engine.addComponentsToEntity(entity, [this.playerLight]);
            }
        }

        const inputAngle = this.input.ViewCorrectedMousePosition().clone();
        inputAngle.minusEquals(position.coords);
        inputAngle.normalize();
        this.playerLight.angle = inputAngle.heading();
    }
}
