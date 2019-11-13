export interface Component {}

export const ComponentIDName = "_id_";

export interface ComponentType<T extends Component> {
    readonly name: string;
    readonly _id_?: string;
    new (...p: any[]): T;
}
