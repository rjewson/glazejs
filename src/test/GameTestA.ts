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

        const tmxMap: TMXMap = JSON.parse(this.assets.assets.get(MAP_DATA)) as TMXMap;

        var cameraRange = new AABB2(0, TILE_SIZE * tmxMap.width, TILE_SIZE * tmxMap.height, 0);
        cameraRange.expand(-TILE_SIZE * 2);

        this.renderSystem = new GraphicsRenderSystem(this.canvas, cameraRange);
        this.renderSystem.textureManager.AddTexture(TEXTURE_DATA, this.assets.assets.get(TEXTURE_DATA));
        this.renderSystem.textureManager.AddTexture(TILE_SPRITE_SHEET, this.assets.assets.get(TILE_SPRITE_SHEET));

        this.renderSystem.textureManager.ParseTexturePackerJSON(this.assets.assets.get(TEXTURE_CONFIG), TEXTURE_DATA);
        this.renderSystem.frameListManager.ParseFrameListJSON(this.assets.assets.get(FRAMES_CONFIG));

        this.renderSystem.cameraTarget = new Vector2(400, 400);

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

        const broadphase = new BruteforceBroadphase(tileMapCollision);
        this.engine.addSystemToEngine(new PhysicsUpdateSystem());
        this.engine.addSystemToEngine(new PhysicsStaticSystem(broadphase));
        this.engine.addSystemToEngine(new PhysicsMoveableSystem(broadphase));
        this.engine.addSystemToEngine(new PhysicsCollisionSystem(broadphase));
        this.engine.addSystemToEngine(new PhysicsMassSystem());
        this.engine.addSystemToEngine(new PhysicsPositionSystem());

        this.engine.addSystemToEngine(new ControllerSystem(this.input));

        this.engine.addSystemToEngine(new ParticleSystem(blockParticleEngine));

        let x = 0;
        let y = 0;
        for (var count = 0; count < 100; count++) {
            const chicken = this.engine.createEntity();
            x += 20;
            if (x > 700) {
                x = 0;
                y += 20;
            }

            var chickenBody = new Body(Material.NORMAL);
            chickenBody.setBounces(3);
            chickenBody.maxScalarVelocity = 1000;

            this.engine.addComponentsToEntity(chicken, [
                new Position(100 + x, 100 + y),
                new Extents(12, 12),
                new Graphics("chicken"),
                new GraphicsAnimation("chicken", "walk"),
                new PhysicsCollision(false, new Filter(), []),
                new PhysicsBody(chickenBody, true),
                new Moveable(),
                new Active(),
                new Controllable(100),
                new ParticleEmitter([new Explosion(10,100)])
            ]);
        }

        const doorSwitch = this.engine.createEntity();
        this.engine.addComponentsToEntity(doorSwitch, [
            this.mapPosition(10.5, 18.5),
            new Extents(8, 8),
            new PhysicsCollision(false, null, []),
            new Fixed(),
            new Active(),
            new TileGraphics("switchOff"),
        ]);

        this.loop.start();
    }

    mapPosition(xTiles: number, yTiles: number): Position {
        return new Position(xTiles * TILE_SIZE, yTiles * TILE_SIZE);
    }

    preUpdate() {
        this.input.Update(-this.renderSystem.camera.position.x, -this.renderSystem.camera.position.y);
    }
}
