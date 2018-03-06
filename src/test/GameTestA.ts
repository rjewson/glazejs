import { GlazeEngine } from "../glaze/GlazeEngine";
import { GraphicsRenderSystem } from "../glaze/graphics/systems/GraphicsRenderSystem";
import { AABB2 } from "../glaze/geom/AABB2";
import { Position } from "../glaze/core/components/Position";
import { Graphics } from "../glaze/graphics/components/Graphics";
import { Vector2 } from "../glaze/geom/Vector2";
import { SpriteRenderer } from "../glaze/graphics/render/sprite/SpriteRenderer";
import {
    TMXMap,
    TMXLayer,
    TMXdecodeLayer,
    GetLayer,
    LayerToCoordTexture,
    LayerToCollisionData,
    GetTileSet,
} from "../glaze/tmx/TMXMap";
import { TileMapRenderer } from "../glaze/graphics/render/tile/TileMapRenderer";
import { GraphicsAnimation } from "../glaze/graphics/components/GraphicsAnimation";
import { AnimationSystem } from "../glaze/graphics/systems/AnimationSystem";
import { TileMapCollision } from "../glaze/physics/collision/broadphase/TileMapCollision";
import { BruteforceBroadphase } from "../glaze/physics/collision/broadphase/BruteforceBroadphase";
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
import { Controllable } from "../glaze/core/components/Controllable";
import { ControllerSystem } from "../glaze/core/systems/ControllerSystem";
import { TileGraphicsRenderSystem } from "../glaze/graphics/systems/TileGraphicsRenderSystem";
import { TileGraphics } from "../glaze/graphics/components/TileGraphics";
import { Fixed } from "../glaze/core/components/Fixed";
import { BlockParticleEngine2 } from "../glaze/particle/engines/BlockParticleEngine2";
import { ParticleSystem } from "../glaze/particle/systems/ParticleSystem";
import { ParticleEmitter } from "../glaze/particle/components/ParticleEmitter";
import { Explosion } from "../glaze/particle/emitter/Explosion";
import { FixedViewManagementSystem } from "../glaze/space/systems/FixedViewManagementSystem";
import { AgeSystem } from "../glaze/core/systems/AgeSystem";
import { Health } from "../glaze/core/components/Health";
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
import { BirdNest } from "./components/BirdNest";
import { BirdNestSystem } from "./systems/BirdNestSystem";
import { CombatUtils } from "../glaze/util/CombatUtils";
import { BirdSystem } from "./systems/BirdSystem";
import { WaterSystem } from "../glaze/core/systems/WaterSystem";
import { WindSystem } from "../glaze/core/systems/WindSystem";
import { WaterFactory } from "../glaze/tmx/factories/WaterFactory";
import { DoorFactory } from "./factories/item/DoorFactory";
import { StateSystem } from "../glaze/core/systems/StateSystem";
import { MessageBus } from "../glaze/util/MessageBus";
import { StateUpdater } from "../glaze/core/components/StateUpdater";
import { StateUpdateSystem } from "../glaze/core/systems/StateUpdateSystem";
import { listenDebugButtons } from "../glaze/tools/HTMLDevTools";
import { DynamicTreeBroadphase } from "../glaze/physics/collision/broadphase/DynamicTreeBroadphase";
import { ChickenSystem } from "./systems/ChickenSystem";

interface GlazeMapLayerConfig {}

interface GlazeGameConfig {
    tileSize: number;
    map: string;
    spriteConfig: string;
    spriteTexture: string;
    spriteFrames: string;
    tilesTexture: string;
    mapLayers: GlazeMapLayerConfig[];
}

const MAP_DATA: string = "data/16map.json";
const TEXTURE_CONFIG: string = "data/sprites.json";
const TEXTURE_DATA: string = "data/sprites.png";
const FRAMES_CONFIG: string = "data/frames.json";

const PARTICLE_TEXTURE_CONFIG: string = "data/particles.json";
const PARTICLE_TEXTURE_DATA: string = "data/particles.png";
const PARTICLE_FRAMES_CONFIG: string = "data/particleFrames.json";
const TILE_FRAMES_CONFIG: string = "data/tileFrames.json";

// const COL_SPRITE_SHEET:string = "data/superSet.png";
// const TILE_SPRITE_SHEET_1:string = "data/superSet.png";
// const TILE_SPRITE_SHEET_2:string = "data/superSet.png";
// const TILE_SPRITE_SHEET_B:string = "data/superSet.png";

const TILE_SPRITE_SHEET: string = "data/superSet.png";

const TILE_SIZE = 16;

export class GameTestA extends GlazeEngine {
    private renderSystem: GraphicsRenderSystem;
    private tmxMap: TMXMap;
    constructor() {
        const canvas: HTMLCanvasElement = document.getElementById("view") as HTMLCanvasElement;
        super(canvas);
        this.loadAssets([TEXTURE_CONFIG, TEXTURE_DATA, FRAMES_CONFIG, MAP_DATA, TILE_SPRITE_SHEET, TILE_FRAMES_CONFIG]);
    }

    initalize() {
        this.engine.addCapacityToEngine(1000);

        this.engine.addSystemToEngine(new DestroySystem());

        const tmxMap: TMXMap = JSON.parse(this.assets.assets.get(MAP_DATA)) as TMXMap;

        var cameraRange = new AABB2(0, TILE_SIZE * tmxMap.width, TILE_SIZE * tmxMap.height, 0);
        cameraRange.expand(-TILE_SIZE * 2);

        this.renderSystem = new GraphicsRenderSystem(this.canvas, new Vector2(1280, 720), cameraRange);
        this.renderSystem.textureManager.AddTexture(TEXTURE_DATA, this.assets.assets.get(TEXTURE_DATA));
        this.renderSystem.textureManager.AddTexture(TILE_SPRITE_SHEET, this.assets.assets.get(TILE_SPRITE_SHEET));

        this.renderSystem.textureManager.ParseTexturePackerJSON(this.assets.assets.get(TEXTURE_CONFIG), TEXTURE_DATA);
        this.renderSystem.frameListManager.ParseFrameListJSON(this.assets.assets.get(FRAMES_CONFIG));

        const background = LayerToCoordTexture(TMXdecodeLayer(GetLayer(tmxMap, "Background")));
        const foreground1 = LayerToCoordTexture(TMXdecodeLayer(GetLayer(tmxMap, "Foreground1")));
        const foreground2 = LayerToCoordTexture(TMXdecodeLayer(GetLayer(tmxMap, "Foreground2")));

        const collisionData = LayerToCollisionData(
            TMXdecodeLayer(GetLayer(tmxMap, "Collision")),
            GetTileSet(tmxMap, "Collision").firstgid,
            TILE_SIZE,
        );

        var tileMapRenderer = new TileMapRenderer(16 / 2, 2);

        tileMapRenderer.SetTileRenderLayer("bg", ["Background", "Foreground1"]);
        tileMapRenderer.SetTileRenderLayer("fg", ["Foreground2"]);

        this.renderSystem.renderer.AddRenderer(tileMapRenderer);

        tileMapRenderer.SetTileLayerFromData(
            foreground2,
            this.renderSystem.textureManager.baseTextures.get(TILE_SPRITE_SHEET),
            "Foreground2",
            1,
            1,
        );
        tileMapRenderer.SetTileLayerFromData(
            foreground1,
            this.renderSystem.textureManager.baseTextures.get(TILE_SPRITE_SHEET),
            "Foreground1",
            1,
            1,
        );
        tileMapRenderer.SetTileLayerFromData(
            background,
            this.renderSystem.textureManager.baseTextures.get(TILE_SPRITE_SHEET),
            "Background",
            1,
            1,
        );

        const spriteRender = new SpriteRenderer();
        spriteRender.AddStage(this.renderSystem.stage);
        this.renderSystem.renderer.AddRenderer(spriteRender);

        this.renderSystem.itemContainer.addChild(tileMapRenderer.renderLayersMap.get("bg").sprite);
        this.renderSystem.camera.addChild(tileMapRenderer.renderLayersMap.get("fg").sprite);

        this.engine.addSystemToEngine(this.renderSystem);
        this.engine.addSystemToEngine(new AnimationSystem(this.renderSystem.frameListManager));

        const tileMapCollision = new TileMapCollision(collisionData);

        this.engine.addSystemToEngine(
            new TileGraphicsRenderSystem(this.assets.assets.get(TILE_FRAMES_CONFIG), tileMapRenderer, tileMapCollision),
        );

        const blockParticleEngine = new BlockParticleEngine2(4000, 1000 / 60, collisionData);
        this.renderSystem.renderer.AddRenderer(blockParticleEngine.renderer);

        this.engine.addSystemToEngine(new PlayerSystem(this.input, blockParticleEngine));

        // const lightSystem = new PointLightingSystem(tileMapCollision);
        // this.renderSystem.renderer.AddRenderer(lightSystem.renderer);
        // this.engine.addSystemToEngine(lightSystem);

        const broadphase = new BruteforceBroadphase(tileMapCollision);
        // const broadphase = new DynamicTreeBroadphase(tileMapCollision);


        CombatUtils.setup(this.engine, broadphase);

        this.engine.addSystemToEngine(new SteeringSystem());

        this.engine.addSystemToEngine(new PhysicsUpdateSystem());
        this.engine.addSystemToEngine(new PhysicsStaticSystem(broadphase));
        this.engine.addSystemToEngine(new PhysicsMoveableSystem(broadphase));
        this.engine.addSystemToEngine(new PhysicsCollisionSystem(broadphase));
        this.engine.addSystemToEngine(new PhysicsMassSystem());
        this.engine.addSystemToEngine(new PhysicsPositionSystem());

        this.engine.addSystemToEngine(new ControllerSystem(this.input));

        this.engine.addSystemToEngine(new ParticleSystem(blockParticleEngine));

        // TODO Temp
        this.engine.addSystemToEngine(new FixedViewManagementSystem(this.renderSystem.camera));

        this.engine.addSystemToEngine(new AgeSystem());
        this.engine.addSystemToEngine(new HealthSystem());
        this.engine.addSystemToEngine(new CollsionCountSystem());
        this.engine.addSystemToEngine(new EnvironmentForceSystem());

        this.engine.addSystemToEngine(new BeeHiveSystem());
        this.engine.addSystemToEngine(new BirdNestSystem());
        this.engine.addSystemToEngine(new BirdSystem(CombatUtils.bfAreaQuery));

        const chickenSystem = new ChickenSystem(blockParticleEngine);
        this.engine.addSystemToEngine(chickenSystem);

        this.engine.addSystemToEngine(new WaterSystem(blockParticleEngine));
        this.engine.addSystemToEngine(new WindSystem(blockParticleEngine,16));

        const messageBus = new MessageBus();
        (window as any).mb = messageBus;
        this.engine.addSystemToEngine(new StateSystem());
        this.engine.addSystemToEngine(new StateUpdateSystem(messageBus));


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
                new Light(64, 1, 1, 1, 255, 255, 255),
                new Viewable(),
                // new Controllable(150),
                // new ParticleEmitter([new Explosion(4,100)])
            ]);
        }

        const factories = new Map<string,any>();
        factories.set(ForceFactory.mapping,ForceFactory.createTMXEntity);
        factories.set(WaterFactory.mapping,WaterFactory.createTMXEntity);
        factories.set(DoorFactory.mapping,DoorFactory.createTMXEntity);

        createTMXLayerEntities(this.engine, GetLayer(tmxMap, "Objects"), factories);

        const pos: Position = this.engine.getComponentForEntity(player, Position);
        this.renderSystem.cameraTarget = pos.coords; // new Vector2(400, 400);

        const doorSwitch = this.engine.createEntity();
        this.engine.addComponentsToEntity(doorSwitch, [
            this.mapPosition(10.5, 18.5),
            new Extents(8, 8),
            new PhysicsCollision(false, null, []),
            new Fixed(),
            new Active(),
            new TileGraphics("switchOff"),
        ]);

        // const beeHive = this.engine.createEntity();
        // this.engine.addComponentsToEntity(beeHive, [
        //     this.mapPosition(20.5, 17),
        //     new Extents(16, 16),
        //     new Graphics("insects", "hive"),
        //     new PhysicsCollision(false, null, []),
        //     new Fixed(),
        //     new Active(),
        //     new BeeHive(5),
        // ]);

        // const birdNest = this.engine.createEntity();
        // this.engine.addComponentsToEntity(birdNest, [
        //     this.mapPosition(34, 30),
        //     new Extents(7, 7),
        //     new Fixed(),
        //     new BirdNest(5),
        //     new Active(),
        // ]);

        // this.fireBullet(new Vector2(50, 50), new Vector2(100, 100));

        const playerPosition = this.mapPosition(33.5, 38.5); //     this.mapPosition(3, 16);
        const playerEntity = PlayerFactory.create(this.engine, playerPosition);
        chickenSystem.scaredOf(playerEntity);

        this.renderSystem.cameraTarget = playerPosition.coords;

        this.loop.start();
        listenDebugButtons(this.engine);
    }

    mapPosition(xTiles: number, yTiles: number): Position {
        return new Position(xTiles * TILE_SIZE, yTiles * TILE_SIZE);
    }

    fireBullet(position: Vector2, target: Vector2) {
        var filter = new Filter();
        filter.groupIndex = TestFilters.TURRET_GROUP;
        var bullet = StandardBullet.create(this.engine, new Position(position.x, position.y), filter, target);
    }

    preUpdate() {
        this.input.Update(-this.renderSystem.camera.position.x, -this.renderSystem.camera.position.y);
    }
}
