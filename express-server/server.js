const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use((req, res, next) =>{
    console.log(`${req.method} ${req.url} - ${new Date().toLocaleString('uk-UA')}`);
    next();
});

app.get('/', (req, res) =>{
    res.send('Головна сторінка.');
});

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

app.get('/crash', (req, res) => {
  throw new Error('Тестова помилка');
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        name: 'Ваше ім\'я',
        role: 'Студент курсу Node.js',
        hobbies: ['хобі 1', 'хобі 2', 'хобі 3', 'хобі 4'],
        isOnline: true,
    });
});

app.get('/students', (req, res) => {
    const students = [
        { name: 'Оля', level: 'junior' },
        { name: 'Максим', level: 'middle' },
        { name: 'Ірина', level: 'senior' }
    ];
    res.render('students', { students });
});

app.post('/feedback', express.json(), (req, res) => {
    const { name, message } = req.body;
    if(!name){
        return res.status(400).send('Поле name є обов\'язковим');
    }
    res.send(`Дякуємо, ${name}! Ваш відгук отримано.`);
});

app.use(express.static('public'));

app.use((req, res) => {
    res.status(404).render('not-found', { url: req.url });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Щось пішло не так!');
});

app.listen(3000, () => {
    console.log('Сервер запущено: http://localhost:3000');
});