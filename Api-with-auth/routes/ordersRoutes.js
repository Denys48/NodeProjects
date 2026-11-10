const express = require('express');
const {createOrder, getOrders, getOrderById, updateOrderStatus} = require('../controllers/ordersController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);

router.patch('/:id/status', roleMiddleware('admin'), updateOrderStatus);

module.exports = router;