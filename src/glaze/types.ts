import { Engine } from "./ecs/Engine";
import { Entity } from "./ecs/Entity";

export type RenderCanvas = HTMLCanvasElement | OffscreenCanvas;

export type EntityCb = (engine: Engine, entity: Entity) => void;
