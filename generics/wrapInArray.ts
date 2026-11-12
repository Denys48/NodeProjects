function wrapInArray<T> (value: T): [T] {
    return [value];
}

const a = wrapInArray(5);         // number[]
const b = wrapInArray("hello");   // string[]

// Типи будуть не number[] і string[], а [number] і [string], 
// бо на мою думку це краще відповідає умові завдання де просять масив саме з одного елемента