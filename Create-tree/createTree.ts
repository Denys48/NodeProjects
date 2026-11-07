interface TreePart {
    value: number;
    child: TreePart | null;
}

const createTree = (depth: number):TreePart =>{
    if (!Number.isInteger(depth) || depth < 1) {
        throw new Error('Depth must be a positive integer');
    }
    if (depth>1) {
        return {value: depth, child: createTree(depth - 1)};
    }

    return {value: depth, child: null};  
}