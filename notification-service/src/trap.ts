type UserId = number & { readonly __brand: "UserId" };
type OrderId = number & { readonly __brand: "OrderId" };

function getUser(id: UserId) { /* ... */ }

// const orderId: OrderId = 42;
// getUser(orderId);
// не зкомпілюється, якщо розкоментити