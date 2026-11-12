interface ApiResponse<T>{
    status: "success" | "error";
    data: T
}

interface User {
    id: number;
    email: string;
}

interface Post {
    id: number;
    title: string;
}

const userResponse: ApiResponse<User> = {
    status: "success",
    data: {id: 4, email: "useremail@gmail.com"},
}

const postResponse: ApiResponse<Post[]> = {
    status: "success",
    data: [{id: 5, title: "Jojo's bizzare adventure"}, {id:6, title: "The Hobbit"}],
}
