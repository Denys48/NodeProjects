const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send('Головна сторінка.');
})

app.get('/about', (req, res) => {
    res.send('Сторінка "Про нас".');
});

app.get('/error', (req, res) => {
    res.status(500).send('Помилка сервера.');
});

app.get('/time', (req, res) => {
    res.send('Поточний час: ' + new Date().toLocaleString('uk-UA'));
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Користувач з ID: ${userId}`);
});

app.get('/user/:id/orders', (req, res) => {
    const userId = req.params.id;
    const status = req.query.status;
    if(!status) {
        return res.status(400).send('Не вказано статус замовлення');
    }

    res.send(`Замовлення користувача ${userId} зі статусом: ${status}`);
});

app.get('/search', (req, res) => {
    const query = req.query.q;
    if(!query) {
        return res.status(400).send('Не вказано пошуковий запит');
    }
    res.send(`Ви шукали: ${query}`);
});

app.use((req, res) => {
    res.status(404).send('Сторінку не знайдено');
});

app.listen(3000, () => {
    console.log('Сервер запущено: http://localhost:3000');
});