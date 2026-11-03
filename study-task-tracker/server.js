const http = require('http');
const { getTasks, addTask } = require('./modules/taskService');

const server = http.createServer(async (req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    try {
    if (pathname === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to the Study Task Tracker API</h1>');

    } else if (pathname === '/tasks' && req.method === 'GET') {
        let tasks = await getTasks();

        const status = parsedUrl.searchParams.get('status');

        if (status === 'completed') {
            tasks = tasks.filter(task => task.completed);
        } else if (status === 'active') {
            tasks = tasks.filter(task => !task.completed);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));

    } else if (pathname.startsWith('/tasks/') && req.method === 'GET') {
        const taskId = pathname.split('/')[2];
        const tasks = await getTasks();
        const task = tasks.find(task => task.id === taskId);

        if (!task) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Task not found' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(task));

    } else if (pathname === '/tasks' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
        try {
            const taskData = JSON.parse(body);

            if (typeof taskData.title !== 'string' || !taskData.title) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Task title is required" }));
                return;
            }

            const task = await addTask(taskData.title);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(task));
            
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid task data' }));
        }
    });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
    }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error', details: error.message }));
    }
});

server.listen(3000, () => {
  console.log('Сервер працює на порту 3000');
});