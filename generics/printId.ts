function printId<T extends {id: number}> (someObject: T): T{
    console.log(someObject.id);
    return someObject;
}

const user = printId({ id: 1, email: "a@test.com" });
user.email;   // має працювати, тип не втрачено

// printId({ name: "Alice" });   // має бути помилка: немає id
//Object literal may only specify known properties, and 'name' does not exist in type '{ id: number; }'.

// printId({ id: "abc" });       // має бути помилка: id не число
//Type 'string' is not assignable to type 'number'.