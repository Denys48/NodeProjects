"use strict";
const createTree = (depth) => {
    if (!Number.isInteger(depth) || depth < 1) {
        throw new Error('Depth must be a positive integer');
    }
    if (depth > 1) {
        return { value: depth, child: createTree(depth - 1) };
    }
    return { value: depth, child: null };
};
