function swap<A, B> (firstElement: A, secondElement: B): [B, A]{
    return [secondElement, firstElement];
}

const r = swap("Аліна", 26);   // має бути [number, string]

//Argument of type 'number' is not assignable to parameter of type 'string'.
//Це якщо з одним параметром типу