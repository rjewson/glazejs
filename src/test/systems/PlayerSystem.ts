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
import { Extents } from "../../glaze/core/components/Extents";
import { RandomFloat } from "../../glaze/util/Random";
import { StandardBullet } from "../factories/projectile/StandardBullet";
import { BeeFactory } from "../factories/character/BeeFactory";
import { Holder } from "../../glaze/core/components/Holder";
import { TestFilters } from "../config/Filters";
import { Moveable } from "../../glaze/core/components/Moveable";
import { Active } from "../../glaze/core/components/Active";
import { Ballistics } from "../../glaze/util/Ballastics";
import { PlasmaBall } from "../factories/projectile/PlasmaBall";
import { Hierachy } from "../../glaze/core/components/Hierachy";
import { Attachment } from "../../glaze/core/components/Attachment";
import { Vector2 } from "../../glaze/geom/Vector2";
import { Light } from "../../glaze/graphics/components/Light";
import { Key } from "../../glaze/util/Keycodes";
import { Stack } from "../../glaze/ds/Stack";
import { textureAsParticles } from "../../glaze/util/ParticleUtils";
import { TextureManager } from "../../glaze/graphics/texture/TextureManager";

export class PlayerSystem extends System {
    private particleEngine: IParticleEngine;
    private textureManager: TextureManager;
    private input: DigitalInput;

    private playerLight: Light;
    private playerHolder: Entity;
    private holder: Holder;

    private characterController: CharacterController;

    private currentWeapon: number = 0;

    private teleporterLocations: Stack<Vector2>;

    private mousePosition: Vector2;
    private throwPower: number;

    constructor(input: DigitalInput, particleEngine: IParticleEngine, textureManager: TextureManager) {
        super([Position, Player, PhysicsCollision, PhysicsBody, GraphicsAnimation, Extents]);
        this.input = input;
        this.particleEngine = particleEngine;
        this.textureManager = textureManager;
        this.teleporterLocations = new Stack(5);
        this.mousePosition = new Vector2();
        this.throwPower = 0;
    }

    onEntityAdded(
        entity: Entity,
        position: Position,
        player: Player,
        physicsCollision: PhysicsCollision,
        physicsBody: PhysicsBody,
        graphicsAnimation: GraphicsAnimation,
        extents: Extents
    ) {
        if (this.members.size > 1) {
            throw new Error("Only one player allowed");
        }
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
        (this.playerLight = new Light(256, 1, 1, 0, 255, 255, 255, 1)),
            // this.engine.addComponentsToEntity(entity, [this.playerLight]);
            (this.holder = new Holder(entity));

        this.engine.addComponentsToEntity(entity, [this.playerLight]);
        // TODO
        // inventory = new Inventory(4);

        this.playerHolder = this.engine.createEntity();
        this.engine.addComponentsToEntity(this.playerHolder, [
            new Position(0, 0),
            new Attachment(new Vector2(0, 0)),
            extents,
            this.holder,
            new PhysicsCollision(true, new Filter(1, 0, TestFilters.PLAYER_GROUP), [], false, physicsBody.body),
            new Moveable(),
            new Active()
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
        extents: Extents
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

        this.input.ViewCorrectedMousePosition(this.mousePosition);
        // const fire = this.input.JustPressed(200);

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
        if (this.input.JustPressed(Key.P)) {
            this.snapshot(position);
        }
        // TODO
        this.holder.activate = this.input.JustPressed(Key.H);
        // console.log(this.input.PressedDuration(200));

        if (this.holder.heldItem) {
            if (this.input.Pressed(200)) {
                this.throwPower++;
                this.throwPower = Math.min(this.throwPower, 1000);
                var vel = this.mousePosition.clone();
                vel.minusEquals(position.coords);
                vel.normalize();
                vel.multEquals(1000);
                this.particleEngine.EmitParticle(
                    position.coords.x,
                    position.coords.y,
                    vel.x,
                    vel.y,
                    0,
                    0,
                    this.throwPower,
                    1,
                    false,
                    true,
                    null,
                    4,
                    255,
                    255,
                    255,
                    255
                );
            } else if (this.throwPower > 0) {
                //Throw Item 'K'
                const item = Holder.drop(this.engine, this.holder);
                if (item != null) {
                    Ballistics.calcProjectileVelocity(
                        this.engine.getComponentForEntity(item, PhysicsBody).body,
                        this.mousePosition.clone(),
                        this.throwPower * 6 //700,
                    );
                }
                this.throwPower = 0;
            }
        } else {
            // this.throwPower = 0;
            if (this.input.Clicked(201)) {
                if (this.currentWeapon == 0) {
                    StandardBullet.create(
                        this.engine,
                        position.clone(),
                        physicsCollision.proxy.filter.clone(),
                        this.mousePosition.clone()
                    );
                }
                if (this.currentWeapon == 1)
                    PlasmaBall.create(
                        this.engine,
                        position.clone(),
                        physicsCollision.proxy.filter.clone(),
                        this.mousePosition.clone()
                    );
            }
        }
        // TODO
        if (this.input.JustPressed(Key.J)) {
            //Drop Item 'J'
            // var item = this.holder.drop();
            Holder.drop(this.engine, this.holder);
        } else if (this.input.JustPressed(Key.K)) {
            // //Throw Item 'K'
            // const item = Holder.drop(this.engine, this.holder);
            // if (item != null) {
            //     Ballistics.calcProjectileVelocity(
            //         this.engine.getComponentForEntity(item, PhysicsBody).body,
            //         this.mousePosition.clone(),
            //         700,
            //     );
            // }
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

        //'e' aim
        // if (this.input.Pressed(Key.E)) {

        // }

        if (this.characterController.burn > 0) {
            const ttl = 280;
            var offsetx = position.coords.x - 8 * position.direction.x;
            var velocity = 300 + RandomFloat(-150, 150) + physicsBody.body.velocity.y;
            var count = Math.floor((this.characterController.burn + 500) / 1000);
            if (count > 0)
                this.particleEngine.EmitParticle(
                    offsetx,
                    position.coords.y + 8,
                    RandomFloat(-10, 10) + physicsBody.body.velocity.x,
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
                    0
                );
            for (var i = 0; i < count; i++) {
                this.particleEngine.EmitParticle(
                    offsetx,
                    position.coords.y + 8,
                    RandomFloat(-50, 50) + physicsBody.body.velocity.x,
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
                    255
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

        const inputAngle = this.mousePosition.clone();
        inputAngle.minusEquals(position.coords);
        inputAngle.normalize();
        this.playerLight.angle = inputAngle.heading();

        if (this.input.JustPressed(Key.R)) {
            this.teleporterLocations.push(position.coords.clone());
        }
        if (this.input.JustPressed(Key.T)) {
            const p = this.teleporterLocations.pop();
            if (p) {
                physicsBody.body.position.copy(p);
            }
        }
    }
    private snapshot(position:Position) {
        const t = this.textureManager.textures.get("player3/frame10.png");
        textureAsParticles(this.particleEngine, position.coords, position.direction, t);
    }
}
