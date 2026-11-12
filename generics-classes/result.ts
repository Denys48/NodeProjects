interface Result<T> {
    success: boolean;
    data: T;
    timestamp: Date;
}

const result1: Result<string> = {
    success: true,
    data: "John",
    timestamp: new Date()
}

const result2: Result<number[]> = {
    success: true,
    data: [1, 2, 3],
    timestamp: new Date()
}