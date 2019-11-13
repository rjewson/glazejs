import { GlazeEngine } from "../glaze/GlazeEngine";
import { GraphicsRenderSystem } from "../glaze/graphics/systems/GraphicsRenderSystem";
import { AABB2 } from "../glaze/geom/AABB2";
import { Position } from "../glaze/core/components/Position";
import { Graphics } from "../glaze/graphics/components/Graphics";
import { SpriteRenderer } from "../glaze/graphics/render/sprite/SpriteRenderer";
import {
    TMXdecodeLayer,
    GetLayer,
    LayerToCoordTexture,
    LayerToCollisionData,
    GetTileSet,
    TMXMap
} from "../glaze/tmx/TMXMap";
import { TileMapRenderer } from "../glaze/graphics/render/tile/TileMapRenderer";
import { GraphicsAnimation } from "../glaze/graphics/components/GraphicsAnimation";
import { AnimationSystem } from "../glaze/graphics/systems/AnimationSystem";
import { TileMapCollision } from "../glaze/physics/collision/broadphase/TileMapCollision";
import { PhysicsStaticSystem } from "../glaze/physics/systems/PhysicsStaticSystem";
import { PhysicsMoveableSystem } from "../glaze/physics/systems/PhysicsMoveableSystem";
import { PhysicsCollisionSystem } from "../glaze/physics/systems/PhysicsCollisionSystem";
import { PhysicsMassSystem } from "../glaze/physics/systems/PhysicsMassSystem";
import { PhysicsPositionSystem } from "../glaze/physics/systems/PhysicsPositionSystem";
import { Extents } from "../glaze/core/components/Extents";
import { PhysicsCollision } from "../glaze/physics/components/PhysicsCollision";
import { Filter } from "../glaze/physics/collision/Filter";
import { Material } from "../glaze/physics/Material";
import { Body } from "../glaze/physics/Body";
import { PhysicsBody } from "../glaze/physics/components/PhysicsBody";
import { Moveable } from "../glaze/core/components/Moveable";
import { Active } from "../glaze/core/components/Active";
import { PhysicsUpdateSystem } from "../glaze/physics/systems/PhysicsUpdateSystem";
import { ControllerSystem } from "../glaze/core/systems/ControllerSystem";
import { TileGraphicsRenderSystem } from "../glaze/graphics/systems/TileGraphicsRenderSystem";
import { TileGraphics } from "../glaze/graphics/components/TileGraphics";
import { Fixed } from "../glaze/core/components/Fixed";
import { BlockParticleEngine2 } from "../glaze/particle/engines/BlockParticleEngine2";
import { ParticleSystem } from "../glaze/particle/systems/ParticleSystem";
import { FixedViewManagementSystem } from "../glaze/space/systems/FixedViewManagementSystem";
import { AgeSystem } from "../glaze/core/systems/AgeSystem";
import { HealthSystem } from "../glaze/core/systems/HealthSystem";
import { CollsionCountSystem } from "../glaze/core/systems/CollisionCountSystem";
import { TestFilters } from "./config/Filters";
import { StandardBullet } from "./factories/projectile/StandardBullet";
import { DestroySystem } from "../glaze/core/systems/DestroySystem";
import { PlayerFactory } from "./factories/character/PlayerFactory";
import { PlayerSystem } from "./systems/PlayerSystem";
import { EnvironmentForceSystem } from "../glaze/physics/systems/EnvironmentForceSystem";
import { createTMXLayerEntities } from "../glaze/tmx/TMXFactory";
import { ForceFactory } from "../glaze/tmx/factories/ForceFactory";
import { PointLightingSystem } from "../glaze/graphics/systems/PointLightingSystem";
import { Light } from "../glaze/graphics/components/Light";
import { Viewable } from "../glaze/core/components/Viewable";
import { SteeringSystem } from "../glaze/ai/steering/systems/SteeringSystem";
import { BeeHive } from "./components/BeeHive";
import { BeeHiveSystem } from "./systems/BeeHiveSystem";
import { BirdNestSystem } from "./systems/BirdNestSystem";
import { CombatUtils } from "../glaze/util/CombatUtils";
import { BirdSystem } from "./systems/BirdSystem";
import { WaterSystem } from "../glaze/core/systems/WaterSystem";
import { WindSystem } from "../glaze/core/systems/WindSystem";
import { WaterFactory } from "../glaze/tmx/factories/WaterFactory";
import { DoorFactory } from "./factories/item/DoorFactory";
import { StateSystem } from "../glaze/core/systems/StateSystem";
import { MessageBus } from "../glaze/util/MessageBus";
import { StateUpdateSystem } from "../glaze/core/systems/StateUpdateSystem";
import { listenDebugButtons } from "../glaze/tools/HTMLDevTools";
import { DynamicTreeBroadphase } from "../glaze/physics/collision/broadphase/DynamicTreeBroadphase";
import { ChickenSystem } from "./systems/ChickenSystem";
import { DebugRenderSystem } from "../glaze/graphics/systems/DebugRendererSystem";
import { DebugGraphics } from "../glaze/graphics/components/DebugGraphics";
import { CanvasDebugRenderer } from "../glaze/graphics/render/debug/DebugRenderer";
import { GunTurret } from "./components/GunTurret";
import { GunTurretSystem } from "./systems/GunTurretSystem";
import { throttle } from "../glaze/util/FnUtils";
import { Camera } from "../glaze/graphics/displaylist/Camera";
import { Holdable } from "../glaze/core/components/Holdable";
import { HolderSystem } from "../glaze/core/systems/HolderSystem";
import { HoldableSystem } from "../glaze/core/systems/HoldableSystem";
import { HeldSystem } from "../glaze/core/systems/HeldSystem";
import { Phase } from "../glaze/ecs/Phase";
import { TeleporterFactory } from "./factories/item/TeleporterFactory";
import { TeleporterSystem } from "./systems/TeleporterSystem";
import { WaterHolder } from "../glaze/core/components/WaterHolder";
import { AttachmentSystem } from "../glaze/core/systems/AttachmentSystem";
import { MetaData } from "../glaze/core/components/MetaData";
import { GZE } from "../glaze/GZE";
import { PostContactManager } from "../glaze/physics/collision/contact/PostContactManager";
import { Vector2 } from "../glaze/geom/Vector2";

interface GlazeMapLayerConfig {}


const MAP_DATA: string = "data/16map.json";
const TEXTURE_CONFIG: string = "data/sprites.json";
const TEXTURE_DATA: string = "data/sprites.png";
const FRAMES_CONFIG: string = "data/frames.json";

const TILE_FRAMES_CONFIG: string = "data/tileFrames.json";

// const COL_SPRITE_SHEET:string = "data/superSet.png";
// const TILE_SPRITE_SHEET_1:string = "data/superSet.png";
// const TILE_SPRITE_SHEET_2:string = "data/superSet.png";
// const TILE_SPRITE_SHEET_B:string = "data/superSet.png";

const TILE_SPRITE_SHEET: string = "data/superSet.png";

export class GameTestA extends GlazeEngine {
    private renderSystem: GraphicsRenderSystem;
    private fixedViewManagementSystem: FixedViewManagementSystem;
    constructor() {
        const canvas: HTMLCanvasElement = document.getElementById("view") as HTMLCanvasElement;

        super(canvas);
        this.loadAssets([TEXTURE_CONFIG, TEXTURE_DATA, FRAMES_CONFIG, MAP_DATA, TILE_SPRITE_SHEET, TILE_FRAMES_CONFIG]);
    }

    initalize() {
        this.engine.addCapacityToEngine(1000);

        const tmxMap: TMXMap = JSON.parse(this.assets.assets.get(MAP_DATA));// as TMXMap;
        const cameraRange = new AABB2(0, GZE.tileSize * tmxMap.width, GZE.tileSize * tmxMap.height, 0);
        cameraRange.expand(-GZE.tileSize); // Remove outer tiles

        const camera = new Camera();
        camera.worldExtentsAABB = cameraRange;

        const debugCanvas: HTMLCanvasElement = document.getElementById("viewDebug") as HTMLCanvasElement;
        GZE.debuggingRender = new CanvasDebugRenderer(debugCanvas, camera, GZE.resolution);

        const collisionData = LayerToCollisionData(
            TMXdecodeLayer(GetLayer(tmxMap, "Collision")),
            GetTileSet(tmxMap, "Collision").firstgid,
            GZE.tileSize
        );

        const tileMapCollision = new TileMapCollision(collisionData);
        const blockParticleEngine = new BlockParticleEngine2(4000, 1000 / 60, collisionData);

        // const broadphase = new BruteforceBroadphase(tileMapCollision);
        const broadphase = new DynamicTreeBroadphase(tileMapCollision);

        CombatUtils.setup(this.engine, broadphase);

        const messageBus = new MessageBus();
        // Just a hack for dev
        (window as any).mb = messageBus;

        const corePhase = new Phase();
        this.engine.addPhase(corePhase);

        // Non dynamic
        corePhase.addSystem(new PhysicsMassSystem());
        corePhase.addSystem(new PhysicsStaticSystem(broadphase));
        corePhase.addSystem(new PhysicsMoveableSystem(broadphase));

        // Dynamic
        corePhase.addSystem(new PhysicsUpdateSystem());
        corePhase.addSystem(new PhysicsCollisionSystem(broadphase, new PostContactManager()));
        corePhase.addSystem(new PhysicsPositionSystem());
        corePhase.addSystem(new AttachmentSystem());
        corePhase.addSystem(new HeldSystem());

        corePhase.addSystem(new PlayerSystem(this.input, blockParticleEngine));
        corePhase.addSystem(new SteeringSystem(tileMapCollision));

        corePhase.addSystem(new ControllerSystem(this.input));

        corePhase.addSystem(new ParticleSystem(blockParticleEngine));

        // TODO Temp
        this.fixedViewManagementSystem = new FixedViewManagementSystem(camera);
        corePhase.addSystem(this.fixedViewManagementSystem);

        corePhase.addSystem(new AgeSystem());
        corePhase.addSystem(new HealthSystem());
        corePhase.addSystem(new CollsionCountSystem());
        corePhase.addSystem(new EnvironmentForceSystem());

        corePhase.addSystem(new BeeHiveSystem());
        corePhase.addSystem(new BirdNestSystem());
        corePhase.addSystem(new BirdSystem(CombatUtils.bfAreaQuery));

        const chickenSystem = new ChickenSystem(blockParticleEngine);
        corePhase.addSystem(chickenSystem);
        corePhase.addSystem(new GunTurretSystem());

        corePhase.addSystem(new WaterSystem(blockParticleEngine));
        corePhase.addSystem(new WindSystem(blockParticleEngine, 16));

        corePhase.addSystem(new StateSystem());
        corePhase.addSystem(new StateUpdateSystem(messageBus));

        corePhase.addSystem(new HolderSystem(TestFilters.HOLDABLE_CAT));
        corePhase.addSystem(new HoldableSystem(TestFilters.HOLDABLE_CAT));

        corePhase.addSystem(new TeleporterSystem());

        corePhase.addSystem(new DestroySystem());
        // corePhase.addSystem(new WorkerSystem());
        // BEGIN RENDER SYSTEM

        const renderPhase = new Phase();
        this.engine.addPhase(renderPhase);
        this.renderSystem = new GraphicsRenderSystem(this.canvas, camera, GZE.resolution);
        this.renderSystem.textureManager.AddTexture(TEXTURE_DATA, this.assets.assets.get(TEXTURE_DATA));
        this.renderSystem.textureManager.AddTexture(TILE_SPRITE_SHEET, this.assets.assets.get(TILE_SPRITE_SHEET));

        this.renderSystem.textureManager.ParseTexturePackerJSON(this.assets.assets.get(TEXTURE_CONFIG), TEXTURE_DATA);
        this.renderSystem.frameListManager.ParseFrameListJSON(this.assets.assets.get(FRAMES_CONFIG));

        // TODO Move this up, later & dort out deps.
        renderPhase.addSystem(new AnimationSystem(this.renderSystem.frameListManager));

        const background = LayerToCoordTexture(TMXdecodeLayer(GetLayer(tmxMap, "Background")));
        const foreground1 = LayerToCoordTexture(TMXdecodeLayer(GetLayer(tmxMap, "Foreground1")));
        const foreground2 = LayerToCoordTexture(TMXdecodeLayer(GetLayer(tmxMap, "Foreground2")));

        var tileMapRenderer = new TileMapRenderer(16 / 2, 2);

        tileMapRenderer.SetTileRenderLayer("bg", ["Background", "Foreground1"]);
        tileMapRenderer.SetTileRenderLayer("fg", ["Foreground2"]);

        this.renderSystem.renderer.AddRenderer(tileMapRenderer);

        tileMapRenderer.SetTileLayerFromData(
            foreground2,
            this.renderSystem.textureManager.baseTextures.get(TILE_SPRITE_SHEET),
            "Foreground2",
            1,
            1
        );
        const mainlayer = tileMapRenderer.SetTileLayerFromData(
            foreground1,
            this.renderSystem.textureManager.baseTextures.get(TILE_SPRITE_SHEET),
            "Foreground1",
            1,
            1
        );
        tileMapRenderer.SetTileLayerFromData(
            background,
            this.renderSystem.textureManager.baseTextures.get(TILE_SPRITE_SHEET),
            "Background",
            1,
            1
        );

        // NEW GPU LIGHTS
        const lightSystem = new PointLightingSystem(tileMapCollision, mainlayer);
        this.renderSystem.renderer.AddRenderer(lightSystem.renderer);
        renderPhase.addSystem(lightSystem);

        renderPhase.addSystem(
            new TileGraphicsRenderSystem(this.assets.assets.get(TILE_FRAMES_CONFIG), tileMapRenderer, tileMapCollision)
        );

        const spriteRender = new SpriteRenderer();
        spriteRender.AddStage(this.renderSystem.stage);
        this.renderSystem.renderer.AddRenderer(spriteRender);

        this.renderSystem.itemContainer.addChild(tileMapRenderer.renderLayersMap.get("bg").sprite);
        this.renderSystem.camera.addChild(tileMapRenderer.renderLayersMap.get("fg").sprite);
        
        this.renderSystem.camera.addChild(lightSystem.renderer.sprite);

        renderPhase.addSystem(this.renderSystem);

        const debugRenderSystem = new DebugRenderSystem();
        renderPhase.addSystem(debugRenderSystem);

        this.renderSystem.renderer.AddRenderer(blockParticleEngine.renderer);

        // GPU calculated lights
        // const lightSystem = new PointLightingSystem(tileMapCollision);
        // this.renderSystem.renderer.AddRenderer(lightSystem.renderer);
        // renderPhase.addSystem(lightSystem);

        // JS calculated ights
        // const lightSystem = new FloodLightingSystem(tileMapCollision.data);
        // this.renderSystem.renderer.AddRenderer(lightSystem.renderer);
        // renderPhase.addSystem(lightSystem);

        // JS recursive lights slooooow
        // const lightSystem = new RecursiveLightingSystem(tileMapCollision.data);
        // or less slow
        // const lightSystem = new BFSLightingSystem(tileMapCollision.data);

        // const lightSystem = new WaterRenderSystem(tileMapCollision.data);
        // const lightSystem = new CALightingSystem(tileMapCollision.data);
        // this.renderSystem.renderer.AddRenderer(lightSystem.renderer);
        // renderPhase.addSystem(lightSystem);
        // END SETUP RENDER SYSTEM

        const playerPosition = this.mapPosition(33.5, 38.5); //     this.mapPosition(3, 16);
        const playerEntity = PlayerFactory.create(this.engine, playerPosition);
        chickenSystem.scaredOf(playerEntity);
        this.renderSystem.cameraTarget = playerPosition.coords;

        let x = 0;
        let y = 0;
        let player = null;
        for (var count = 0; count < 1; count++) {
            const chicken = this.engine.createEntity();
            if (player == null) {
                player = chicken;
            }
            x += 20;
            if (x > 700) {
                x = 0;
                y += 20;
            }

            var chickenBody = new Body(Material.NORMAL);
            chickenBody.setBounces(3);
            chickenBody.maxScalarVelocity = 1000;

            this.engine.addComponentsToEntity(chicken, [
                new Position(100 + x, 200 + y),
                new Extents(12, 12),
                new Graphics("chicken"),
                new GraphicsAnimation("chicken", "walk"),
                new PhysicsCollision(false, new Filter(), []),
                new PhysicsBody(chickenBody, true),
                new Moveable(),
                new Active(),
                //new Light(64, 1, 1, 1, 255, 255, 255),
                new Viewable(),
                new DebugGraphics()
                // new Controllable(150),
                // new ParticleEmitter([new Explosion(4,100)])
            ]);
        }

        const factories = new Map<string, any>();
        factories.set(ForceFactory.mapping, ForceFactory.createTMXEntity);
        factories.set(WaterFactory.mapping, WaterFactory.createTMXEntity);
        factories.set(DoorFactory.mapping, DoorFactory.createTMXEntity);

        createTMXLayerEntities(this.engine, GetLayer(tmxMap, "Objects"), factories);

        // const pos: Position = this.engine.getComponentForEntity(player, Position);
        // this.renderSystem.cameraTarget = pos.coords; // new Vector2(400, 400);

        TeleporterFactory.create(this.engine, this.mapPosition(3, 23), new Extents(16, 32));

        const doorSwitch = this.engine.createEntity();
        this.engine.addComponentsToEntity(doorSwitch, [
            this.mapPosition(10.5, 18.5),
            new Extents(8, 8),
            new PhysicsCollision(false, new Filter(), [
                // ()=>{debugger;},
                throttle(() => {
                    messageBus.trigger("doorA", {});
                }, 1000)
            ]),
            new Fixed(),
            new Active(),
            new TileGraphics("switchOff")
        ]);

        const beeHive = this.engine.createEntity();
        this.engine.addComponentsToEntity(beeHive, [
            new MetaData("BeeHive"),
            this.mapPosition(20.5, 17),
            new Extents(16, 16),
            new Graphics("insects", "hive"),
            new PhysicsCollision(false, null, []),
            new Fixed(),
            new Active(),
            new BeeHive(5)
        ]);

        this.engine.addComponentsToEntity(this.engine.createEntity(), [
            this.mapPosition(164, 182),
            new MetaData("torch1"),
            new Extents(160, 160),
            new Graphics("torch"),        
            new GraphicsAnimation("torch","burn"),
            new Light(160, 1, 1, 1, 255, 255, 255, 0),
            new Fixed(),
        ]);
        this.engine.addComponentsToEntity(this.engine.createEntity(), [
            this.mapPosition(184, 187),
            new MetaData("torch2"),
            new Extents(160, 160),
            new Graphics("torch"),        
            new GraphicsAnimation("torch","burn"),
            new Light(160, 1, 1, 1, 255, 255, 255, 0),
            new Fixed(),
        ]);
        this.engine.addComponentsToEntity(this.engine.createEntity(), [
            this.mapPosition(175, 68),
            new MetaData("torch3"),
            new Extents(160, 160),
            new Graphics("torch"),        
            new GraphicsAnimation("torch","burn"),
            new Light(160, 1, 1, 1, 255, 255, 255, 0),
            new Fixed(),
        ]);
        // const birdNest = this.engine.createEntity();
        // this.engine.addComponentsToEntity(birdNest, [
        //     this.mapPosition(34, 30),
        //     new Extents(7, 7),
        //     new Fixed(),
        //     new BirdNest(5),
        //     new Active()
        // ]);

        const turret = this.engine.createEntity();
        const turretFilter = new Filter();
        turretFilter.groupIndex = TestFilters.TURRET_GROUP;
        this.engine.addComponentsToEntity(turret, [
            this.mapPosition(90, 46.5),
            new TileGraphics("turret"),
            new Extents(12, 12),
            new PhysicsCollision(false, turretFilter, []),
            new Fixed(),
            new GunTurret(1000),
            new Active()
        ]);

        const rock = this.engine.createEntity();
        this.engine.addComponentsToEntity(rock, [
            this.mapPosition(13, 4),
            new Extents(7, 7),
            new Graphics("items", "rock"),
            new PhysicsCollision(false, new Filter(), []),
            new Moveable(),
            new PhysicsBody(new Body(Material.ROCK), true),
            new Holdable(),
            new Active()
        ]);

        // const playerRock = this.engine.createEntity();
        // this.engine.addComponentsToEntity(playerRock, [
        //     new Position(0,0,),
        //     new Extents(7, 7),
        //     new Graphics("items", "rock"),
        //     new Active(),
        //     new Attachment(new Vector2(-10, -10)),
        // ]);

        // Hierachy.addChild(this.engine, playerEntity, playerRock);

        const waterContainer = this.engine.createEntity();
        this.engine.addComponentsToEntity(waterContainer, [
            this.mapPosition(23, 46),
            new Extents(6, 14),
            new Graphics("items", "water_container"),
            new PhysicsCollision(false, new Filter(), []),
            new Moveable(),
            new PhysicsBody(new Body(Material.NORMAL), true),
            new Holdable(),
            new WaterHolder(10),
            new Active()
        ]);

        this.loop.start();
        listenDebugButtons(this.engine);
    }

    mapPosition(xTiles: number, yTiles: number): Position {
        return new Position(xTiles * GZE.tileSize, yTiles * GZE.tileSize);
    }

    fireBullet(position: Vector2, target: Vector2) {
        var filter = new Filter();
        filter.groupIndex = TestFilters.TURRET_GROUP;
        StandardBullet.create(this.engine, new Position(position.x, position.y), filter, target);
    }

    preUpdate() {
        GZE.debugRender.Clear();
        this.input.Update(-this.renderSystem.camera.position.x, -this.renderSystem.camera.position.y);
    }

    postUpdate() {
        if (GZE.debug) {
            // if (this.dynamicTree) this.dynamicTree.debugDraw(GZE.debugRender);
            this.fixedViewManagementSystem.spaceManager.debugDraw();
        }
    }
}
