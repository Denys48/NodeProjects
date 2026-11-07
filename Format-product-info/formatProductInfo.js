"use strict";
const formatProductInfo = (product) => {
    return `Товар: ${product.name}, Ціна: ${product.price}грн, В наявності: ${product.inStock ? 'Так' : 'Ні'}`;
};
