import { TMXObject } from "./TMXMap";
import { Engine } from "../ecs/Engine";

export interface IEntityFactory {
	mapping():string;
	createEntity(object:TMXObject):any[];
}