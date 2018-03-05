import { Engine } from "../ecs/Engine";
import { Entity } from "../ecs/Entity";

export const engineToHTML = (engine: Engine, start: number, count: number) => {
    const keys = [...engine.components.keys()].sort();
    return [
        `<table class="table table-header-rotated">`,
        header(keys),
        `<tbody>`,
        getEntityRange(start, count, keys, engine.components),
        `</tbody>`,
    ].join("");
};

const header = (keys: string[]) => {
    return [
        `<thead>`,
        `<tr>`,
        `<th></th>`,
        keys.map(key => `<th class="rotate"><div><span>${key}</span></div></th>`).join(""),
        `</tr>`,
        `</thead>`,
    ].join("");
};

const getEntityRange = (start: number, count: number, keys: string[], components: Map<string, any[]>) => {
    const result = [];
    for (let entity = start; entity < start + count; entity++) {
        result.push(entityRow(entity, keys, components));
    }
    return result.join("");
};

const entityRow = (entity: Entity, keys: string[], components: Map<string, any[]>) => {
    return [
        `<tr>`,
        `<th class="row-header">${entity}</th>`,
        keys.map(key => (components.get(key)[entity] === null ? "<td></td>" : "<td>X</td>")).join(""),
        `</tr>`,
    ].join("");
};
