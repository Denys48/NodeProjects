async function withLogging<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    console.log(`Початок: ${operation}`);
    const result = await fn();
    console.log(`Готово: ${operation}`);
    return result;
}

async function fetchUser(): Promise<User> { 
    return { id: 2, email: "rr@gmail.com" };
}
async function fetchPosts(): Promise<Post[]> { 
    return [{id: 5, title: "Jojo's bizzare adventure"}, {id:6, title: "The Hobbit"}];
}


async function test() {
    const user = await withLogging("fetchUser", () => fetchUser());
    // user має бути типу User

    const posts = await withLogging("fetchPosts", () => fetchPosts());
    // posts має бути типу Post[]

}

test();
