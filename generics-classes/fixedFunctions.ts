// А
function logValue(value: unknown): void {
    console.log(value);
}

// Б
function parseJson<T>(json: string, isValid: (data: unknown) => data is T): T {
    const data: unknown = JSON.parse(json);
    if (isValid(data)){
        return data;
    }
    throw new Error("JSON data is invalid");
}

function isValidUser (data: unknown): data is User {
    return (
        typeof data === "object" && data !== null &&
        "id" in data && typeof data.id === "number" &&
        "email" in data && typeof data.email === "string"
    );
}

const user = parseJson<User>('{"id": 1}', isValidUser);