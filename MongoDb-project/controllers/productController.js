const Product = require('../models/productModel');

let productsCache = {
    data: null,
    timestamp: null
};

const getProducts = async (req, res) => {
    const waitingTime = 30000;
    const now = Date.now();

    const limit = req.query.limit === undefined ? 5 : Number(req.query.limit);
    const page = req.query.page === undefined ? 1 : Number(req.query.page);
    if (Number.isInteger(limit) === false || Number.isInteger(page) === false || limit <= 0 || page <= 0) {
        return res.status(400).json({ message: "Invalid query parameters" });
    }

    if (productsCache.data && now - productsCache.timestamp < waitingTime && productsCache.page === page && productsCache.limit === limit) {
        console.log('Data from cache');
        return res.status(200).json(productsCache.data);
    }

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);
    if (page > totalPages && (totalProducts > 0 || page > 1)) {
        return res.status(400).json({ message: "Page number exceeds total pages" });
    }

    const products = await Product.find().skip((page - 1) * limit).limit(limit);
    console.log('Data from database');
    productsCache = {
        data: {
            products,
            totalProducts,
            totalPages,
            currentPage: page
        },
        timestamp: Date.now(),
        page: page,
        limit: limit
    };

    res.status(200).json({
        data: products,
        totalProducts,
        totalPages,
        currentPage: page
    });
};

const createProduct = async (req, res) => {
    const { name, price, category, stock } = req.body;
    const newProduct = new Product({ name, price, category, stock });
    await newProduct.save();
    productsCache = {
        data: null,
        timestamp: null,
        page: null,
        limit: null
    };
    res.status(201).json(newProduct);
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
};

const updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    productsCache = {
        data: null,
        timestamp: null,
        page: null,
        limit: null
    };
    res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    productsCache = {
        data: null,
        timestamp: null,
        page: null,
        limit: null
    };
    res.json({ message: "Product deleted" });
};

module.exports = { getProducts, createProduct, getProductById, updateProduct, deleteProduct };
