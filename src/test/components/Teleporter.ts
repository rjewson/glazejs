import { Vector2 } from "../../glaze/geom/Vector2";

export class Teleporter {

    public teleportPosition:Vector2;

    constructor(teleportPosition:Vector2) {
        this.teleportPosition = teleportPosition;
    }

}