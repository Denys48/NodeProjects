function filterAndTransform<T>(
    arr: T[],
    predicate: (item: T) => boolean,
    transform: (item: T) => string
): string[] {
    return arr.filter(predicate).map(transform);
}

// Після виправлення це має працювати:
const result = filterAndTransform(
    [1, 2, 3, 4],
    n => n % 2 === 0,
    n => `Число: ${n}`
);
// result: string[]