export interface Component {}

export const ComponentIDName = "_id_";

export interface ComponentType<T extends Component> {
    readonly name: string;
    readonly [ComponentIDName]?: string;
    new (...p: any[]): T;
}
