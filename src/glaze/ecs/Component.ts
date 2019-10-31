export interface Component {};

export const ComponentIDName = "_id_";

export interface ComponentType<T extends Component> {
    new (...p: any[]): T;
    readonly name: string;
    readonly _id_?: string;
}
