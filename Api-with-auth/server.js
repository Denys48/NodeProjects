const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const productsRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

mongoose.connect(config.mongoURI)
    .then(() =>{
        console.log("Підключено до MongoDB");
        app.listen(config.port, ()=>{
            console.log(`Сервер запущено на порті ${config.port}`);
        })
    })
    .catch(err =>{
        console.error("Помилка підключення до MongoDB", err);
    });
