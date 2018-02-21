import { TypedArray2D } from "../ds/TypedArray2D";
import { Bytes2D } from "../ds/Bytes2D";

export interface TMXMap {
    backgroundcolor: string;
    height: number;
    infinite: boolean;
    layers: TMXLayer[];
    nextobjectid: number;
    orientation: string;
    properties: TMXProperty[];
    renderorder: string;
    tiledversion: string;
    tileheight: number;
    tilesets: TMXTileSet[];
    tilewidth: number;
    type: string;
    version: number;
    width: number;
}

export interface TMXLayer {
    data: string;
    draworder: string;
    height: number;
    layers: TMXLayer[];
    name: string;
    objects: object;
    opacity: number;
    properties: TMXProperty;
    type: string;
    visible: boolean;
    width: number;
    x: number;
    y: number;
}

export interface TMXProperty {}

export interface TMXTileSet {
    columns: number;
    firstgid: number;
    grid: object;
    image: string;
    imagewidth: number;
    imageheight: number;
    margin: number;
    name: string;
    properties: TMXProperty[];
    spacing: number;
    terrains: TMXTerrain[];
    tilecount: number;
    tileheight: number;
    tileoffset: object;
    tiles: TMXTile[];
    tilewidth: number;
    type: string;
}

export interface TMXTile {
    id: number;
    properties: TMXProperty[];
    terrain: TMXTerrain[];
}

export interface TMXTerrain {
    name: string;
    tile: number;
}

const decodeBase64 = function(input) {
    return window.atob(input.replace(/[^A-Za-z0-9\+\/\=]/g, ""));
};

const encode = function(input) {
    // make sure our input string has the right format
    return window.btoa(input.replace(/\r\n/g, "\n"));
};

const decodeBase64AsArray = function(input, bytes = 4) {
    var dec = decodeBase64(input),
        i,
        j,
        len;
    var ar = new Uint32Array(dec.length / bytes);

    for (i = 0, len = dec.length / bytes; i < len; i++) {
        ar[i] = 0;
        for (j = bytes - 1; j >= 0; --j) {
            ar[i] += dec.charCodeAt(i * bytes + j) << (j << 3);
        }
    }
    return ar;
};

export function TMXdecodeLayer(layer: TMXLayer): any {
    const d = decodeBase64AsArray(layer.data);
    return new Bytes2D(layer.width, layer.height, 16, 4, d.buffer);
}

export function GetLayer(map: TMXMap, name: string): TMXLayer | null {
    const layer = map.layers.filter(layer => layer.name === name);
    return layer.length === 1 ? layer[0] : null;
}

export function GetTileSet(map: TMXMap, name: string): TMXTileSet | null {
    const tileSet = map.tilesets.filter(tileSet => tileSet.name === name);
    return tileSet.length === 1 ? tileSet[0] : null;
}

export function LayerToCoordTexture(layer: Bytes2D): TypedArray2D {
    //Assumes all tiles are from same set...function
    var tileSet: TMXTileSet = null;
    var textureData = new TypedArray2D(layer.width, layer.height);

    for (var xp = 0; xp < layer.width; xp++) {
        for (var yp = 0; yp < layer.height; yp++) {
            var source =
                (layer.get(xp, yp, 3) << 24) |
                (layer.get(xp, yp, 2) << 16) |
                (layer.get(xp, yp, 1) << 8) |
                layer.get(xp, yp, 0);
            if (source > 0) {
                var superSet = Math.floor(source / 1024);
                var superY = Math.floor(superSet / 8);
                var superX = superSet % 8;

                var relativeID = source - superSet * 1024;
                relativeID--; //Not sure why ATM
                var y = Math.floor(relativeID / 32);
                var x = relativeID - 32 * y;
                var v: number = (superY << 24) | (superX << 16) | (y << 8) | x;
                textureData.set(xp, yp, v);
            } else {
                textureData.set(xp, yp, 0xffffffff);
            }
        }
    }
    return textureData;
}

export function LayerToCollisionData(layer: Bytes2D, guidOffset: number, tileSize: number): Bytes2D {
    //Assumes all tiles are from same set...function
    var collisionData = new Bytes2D(layer.width, layer.height, tileSize, 1);

    for (var xp = 0; xp < layer.width; xp++) {
        for (var yp = 0; yp < layer.height; yp++) {
            var source = layer.get(xp, yp, 0);

            if (source > 0) {
                var relativeID = source - guidOffset; //tileSet.firstGID;
                collisionData.set(xp, yp, 0, 1 << relativeID); //Implicit +1
            } else {
                collisionData.set(xp, yp, 0, 0);
            }
        }
    }
    for (var y = 0; y < 30; y++) {
        let row = "";
        for (var x = 0; x < 30; x++) {
            row += collisionData.get(x, y, 0) ? "X" : "0";
        }
        console.log(row);
    }
    return collisionData;
}
