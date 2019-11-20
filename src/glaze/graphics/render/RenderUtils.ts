export function createQuadIndiciesBuffer(count: number): Uint16Array {
    const indices = new Uint16Array(count * 6);

    for (var i = 0; i < count; i++) {
        const index2 = i * 6;
        const index3 = i * 4;
        indices[index2 + 0] = index3 + 0;
        indices[index2 + 1] = index3 + 1;
        indices[index2 + 2] = index3 + 2;
        indices[index2 + 3] = index3 + 0;
        indices[index2 + 4] = index3 + 2;
        indices[index2 + 5] = index3 + 3;
    }
    return indices;
}

export const quadVerts = new Float32Array([
    // 1
    // V BL
    -1,
    -1,
    // T TM
    0,
    1,
    // V BR
    1,
    -1,
    // T TR
    1,
    1,
    // V TR
    1,
    1,
    // T MR
    1,
    0,

    // 2
    // BR
    -1,
    -1,

    0,
    1,

    // TR
    1,
    1,

    1,
    0,

    -1,
    1,

    0,
    0
]);
