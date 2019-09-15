export interface ComponentType {
    new (...p: any[]): any;
    name?: string;
}

export type ComponentInstance = object;

export const ComponentIDName = "_id_"