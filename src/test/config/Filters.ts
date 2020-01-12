export class TestFilters {
    //Categories
    static PLAYER_CAT: number = 0x1 << 2;
    static PROJECTILE_CAT: number = 0x1 << 3;
    static PROJECTILE_COLLIDABLE_CAT: number = 0x1 << 4;
    static SOLID_CAT: number = 0x1 << 5;
    static HOLDABLE_CAT: number = 0x1 << 6;
    static ph1_CAT: number = 0x1 << 7;
    static ph2_CAT: number = 0x1 << 8;
    static ph3_CAT: number = 0x1 << 9;
    static ph4_CAT: number = 0x1 << 10;
    static ph5_CAT: number = 0x1 << 11;

    //Groups
    static PLAYER_GROUP: number = -1;
    static ENEMY_GROUP: number = -2;
    static TURRET_GROUP: number = -3;
    static BIRD_GROUP: number = -3;
    static CHICKEN_GROUP: number = -4;
    static BEE_GROUP: number = -5;


    static SOLID_OBJECT_GROUP: number = 1; //e.g. Doors
}
