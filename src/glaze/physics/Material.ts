export class Material {
    static NORMAL: Material = new Material(1, 0.3, 0.1);
    static LIGHTMETAL: Material = new Material(1.4, 0.3, 0.1);
    static ROCK: Material = new Material(2.0, 0.2, 0.1);
    static RUBBER:Material = new Material(1,1,0.1);

    public density: number;
    public elasticity: number;
    public friction: number;

    constructor(density: number = 1, elasticity: number = 0.3, friction: number = 0.1) {
        this.density = density;
        this.elasticity = elasticity;
        this.friction = friction;
    }
}
