function printId<T extends {id: number}> (someObject: T): T{
    console.log(someObject.id);
    return someObject;
}

const user = printId({ id: 1, email: "a@test.com" });
user.email;   // має працювати, тип не втрачено

// printId({ name: "Alice" });   // має бути помилка: немає id
// printId({ id: "abc" });       // має бути помилка: id не число