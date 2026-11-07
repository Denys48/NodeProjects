interface Product {
    name: string;
    price: number;
    inStock: boolean;
}

const formatProductInfo = (product:Product):string => {
    return `Товар: ${product.name}, Ціна: ${product.price}грн, В наявності: ${product.inStock ? 'Так' : 'Ні'}`;
}