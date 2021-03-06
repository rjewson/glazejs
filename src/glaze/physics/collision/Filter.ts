export class Filter {
    //Two positive and equal group indexs always collide
    //Two negative and equal group indexs never collide
    //Two zero group indexs are passed through
    public groupIndex: number = 0;

    //What category this filter is in (e.g. it could be a player, or enemy)
    //This is the membership
    public categoryBits: number = 0x0001;

    //What other categories it can collide with
    public maskBits: number = 0xffffffff;

    //e.g.
    //player.filter.categoryBits = 0x0002    b00000010
    //player.filter.maskBits     = 0x0004    b00000100
    //
    //enemy.filter.categoryBits  = 0x0004    b00000100
    //enemy.filter.maskBits      = 0x0002    b00000010
    //
    //Here, players an enemies will collide
    //overever players wont collide with player or monsters with mosters

    // Groups
    // if either fixture has a groupIndex of zero, use the category/mask rules as above
    // if both groupIndex values are non-zero but different, use the category/mask rules as above
    // if both groupIndex values are the same and positive, collide
    // if both groupIndex values are the same and negative, don't collide

    constructor(categoryBits: number = 0x1, maskBits: number = 0xffffffff, groupIndex: number = 0x0) {
        this.categoryBits = categoryBits;
        this.maskBits = maskBits;
        this.groupIndex = groupIndex;
    }

    static CHECK(filterA: Filter, filterB: Filter): boolean {
        if (filterA == null || filterB == null) return true;
        if (filterA.groupIndex == filterB.groupIndex && filterA.groupIndex != 0) return filterA.groupIndex > 0;
        return (filterA.maskBits & filterB.categoryBits) != 0 && (filterA.categoryBits & filterB.maskBits) != 0;
    }

    // if ((filterA.groupIndex > 0 && filterB.groupIndex > 0 && filterA.groupIndex == filterB.groupIndex)) {
    //     return false;
    // }
    // else {
    //     if ((filterA.maskBits & filterB.categoryBits) == 0) return false;
    //     if ((filterA.categoryBits & filterB.maskBits) == 0) return false;
    // }
    // return true;

    public clone(): Filter {
        return new Filter(this.categoryBits, this.maskBits, this.groupIndex);
    }
}
