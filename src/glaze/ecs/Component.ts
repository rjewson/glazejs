export interface IComponentFactory {
    new (...p: any[]): any;
    name?: string;
}