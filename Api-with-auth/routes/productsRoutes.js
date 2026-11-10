const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productsController');
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', authMiddleware, roleMiddleware("admin"), createProduct);
router.put('/:id', authMiddleware, roleMiddleware("admin"), updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware("admin"), deleteProduct);

module.exports = router;