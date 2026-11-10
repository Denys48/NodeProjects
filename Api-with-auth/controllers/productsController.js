const Product = require('../models/productModel');

const getProducts = async (req, res) => {
    const limit = req.query.limit === undefined ? 10 : Number(req.query.limit);
    const page = req.query.page === undefined ? 1 : Number(req.query.page);
    const filter = {};

    if (Number.isInteger(limit) === false || Number.isInteger(page) === false || limit <= 0 || page <= 0) {
        return res.status(400).json({ message: "Invalid query parameters" });
    }

    
    if (req.query.category) {
        filter.category = req.query.category;
    }

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    if (page > totalPages && (totalProducts > 0 || page > 1)) {
        return res.status(400).json({ message: "Page number exceeds total pages" });
    }

    const products = await Product.find(filter).skip((page - 1) * limit).limit(limit);

    res.status(200).json({
        data: products,
        totalProducts,
        totalPages,
        currentPage: page
    });
};

const createProduct = async (req, res) => {
    const { title, description, price, stock, category } = req.body;
    const newProduct = new Product({ title, description, price, stock, category });
    await newProduct.save();
    res.status(201).json(newProduct);
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
};

const updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' , runValidators: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
};

module.exports = { getProducts, createProduct, getProductById, updateProduct, deleteProduct };