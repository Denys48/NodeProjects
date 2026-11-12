function getLast<T>(array: T[]): T | undefined {
    return array[array.length - 1];
}

const n = getLast([1, 2, 3]);    // має бути number | undefined
const s = getLast(["a", "b"]);   // має бути string | undefined
const e = getLast([]);           // undefined