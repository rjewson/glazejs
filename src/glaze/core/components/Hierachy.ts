import { Entity } from "../../ecs/Entity";
import { Engine } from "../../ecs/Engine";

export class Hierachy {
    public parent: Entity;
    public children: Entity[];
    public level: number;

    constructor() {
        this.parent = -1;
        this.children = [];
        this.level = 0;
    }

    static addChild(engine: Engine, parent: Entity, child: Entity) {
        debugger;
        let parentHierachy = engine.getComponentForEntity(parent, Hierachy);
        if (!parentHierachy) {
            parentHierachy = new Hierachy();
            engine.addComponentsToEntity(parent, [parentHierachy]);
        }
        if (parentHierachy.children.indexOf(child) != -1) {
            return;
        }
        let childHierachy = engine.getComponentForEntity(child, Hierachy);
        if (childHierachy) {
            if (childHierachy.parent) {
                Hierachy.removeChild(engine, childHierachy.parent, child);
            }
        } else {
            childHierachy = new Hierachy();
            engine.addComponentsToEntity(child, [childHierachy]);
        }
        childHierachy.parent = parent;
        childHierachy.level = parentHierachy.level + 1;
        parentHierachy.children.push(child);

        if (childHierachy.children.length > 0) {
            Hierachy.updateChildLevel(engine, childHierachy);
        }
    }

    static removeChild(engine: Engine, parent: Entity, child: Entity) {
        const parentHierachy = engine.getComponentForEntity(parent, Hierachy);
        if (parentHierachy) {
            const i = parentHierachy.children.indexOf(child);
            if (i > 0) {
                const childHierachy = engine.getComponentForEntity(child, Hierachy);
                if (childHierachy) {
                    childHierachy.parent = null;
                    childHierachy.level = 0;
                    parentHierachy.children.splice(i, 1);
                }
            }
        }
    }

    static updateChildLevel(engine: Engine, hierachy: Hierachy) {
        for (let child of hierachy.children) {
            const childHierachy = engine.getComponentForEntity(child, Hierachy);
            childHierachy.level = hierachy.level + 1;
            if (childHierachy.children.length > 0) {
                Hierachy.updateChildLevel(engine, childHierachy);
            }
        }
    }
}
