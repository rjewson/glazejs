import { GlazeEngine } from "../glaze/GlazeEngine";
import { GraphicsRenderSystem } from "../glaze/graphics/systems/GraphicsRenderSystem";
import { AABB2 } from "../glaze/geom/AABB2";
import { Position } from "../glaze/core/components/Position";
import { Graphics } from "../glaze/graphics/components/Graphics";
import { Vector2 } from "../glaze/geom/Vector2";
import { SpriteRenderer } from "../glaze/graphics/render/sprite/SpriteRenderer";
import { TMXMap, TMXLayer, TMXdecodeLayer, GetLayer, LayerToCoordTexture } from "../glaze/tmx/TMXMap";
import { TileMap } from "../glaze/graphics/render/tile/TileMap";

interface GlazeMapLayerConfig {

}

interface GlazeGameConfig {
    tileSize: number;
    map:string;
    spriteConfig:string;
    spriteTexture:string;
    spriteFrames:string;
    tilesTexture:string;
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
    private renderSystem:GraphicsRenderSystem;
    private tmxMap:TMXMap;
    constructor() {
        const canvas: HTMLCanvasElement = document.getElementById("view") as HTMLCanvasElement;
        super(canvas);
        this.loadAssets([TEXTURE_CONFIG, TEXTURE_DATA, FRAMES_CONFIG, MAP_DATA, TILE_SPRITE_SHEET]);
    }

    initalize() {
        this.engine.addCapacityToEngine(100);
        
        const tmxMap:TMXMap = JSON.parse(this.assets.assets.get(MAP_DATA)) as TMXMap;

        
        var cameraRange = new AABB2( 0 , TILE_SIZE*tmxMap.width , TILE_SIZE*tmxMap.height , 0 );
        cameraRange.expand(-TILE_SIZE*2);

        this.renderSystem = new GraphicsRenderSystem(this.canvas, cameraRange)
        this.renderSystem.textureManager.AddTexture(TEXTURE_DATA, this.assets.assets.get(TEXTURE_DATA) );     
        this.renderSystem.textureManager.AddTexture(TILE_SPRITE_SHEET, this.assets.assets.get(TILE_SPRITE_SHEET) );         
    
        this.renderSystem.textureManager.ParseTexturePackerJSON( this.assets.assets.get(TEXTURE_CONFIG) , TEXTURE_DATA );
        this.renderSystem.frameListManager.ParseFrameListJSON(this.assets.assets.get(FRAMES_CONFIG));

        this.renderSystem.cameraTarget = new Vector2(400,400);

        const background = LayerToCoordTexture(TMXdecodeLayer(GetLayer(tmxMap,"Background")));
        const foreground1 =  LayerToCoordTexture(TMXdecodeLayer(GetLayer(tmxMap,"Foreground1")));
        const foreground2 =  LayerToCoordTexture(TMXdecodeLayer(GetLayer(tmxMap,"Foreground2")));

        var tileMap = new TileMap(16/2,2);
        tileMap.SetTileRenderLayer([2,1]);
        tileMap.SetTileRenderLayer([0]);
        this.renderSystem.renderer.AddRenderer(tileMap);
        
        tileMap.SetTileLayerFromData(foreground2,this.renderSystem.textureManager.baseTextures.get(TILE_SPRITE_SHEET),"f2",1,1); 
        tileMap.SetTileLayerFromData(foreground1,this.renderSystem.textureManager.baseTextures.get(TILE_SPRITE_SHEET),"f1",1,1);
        tileMap.SetTileLayerFromData(background,this.renderSystem.textureManager.baseTextures.get(TILE_SPRITE_SHEET),"bg",1,1);

        const spriteRender = new SpriteRenderer();
        spriteRender.AddStage(this.renderSystem.stage);
        this.renderSystem.renderer.AddRenderer(spriteRender);

        this.renderSystem.itemContainer.addChild(tileMap.renderLayers[0].sprite);
        // renderSystem.itemContainer.addChild(tileMap.renderLayers[1].sprite);
        this.renderSystem.camera.addChild(tileMap.renderLayers[1].sprite);   

        this.engine.addSystemToEngine(this.renderSystem);

        const chicken = this.engine.createEntity();
        this.engine.addComponentsToEntity(chicken,[new Position(400,400),new Graphics("chicken")]);

        this.loop.start();

    }

    preUpdate() {   
        this.input.Update(-this.renderSystem.camera.position.x,-this.renderSystem.camera.position.y);
    }
}
