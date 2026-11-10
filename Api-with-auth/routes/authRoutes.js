const express = require('express');
const {login, register, getCurrentUser, refresh, logout} = require('../controllers/authController');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
