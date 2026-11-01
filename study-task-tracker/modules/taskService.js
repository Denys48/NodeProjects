const { randomUUID, createHash } = require('node:crypto');
const { readTasks, saveTasks } = require('./fileStorage');
const eventEmitter = require('./eventLogger');

const addTask = async (title) => {
    const tasks = await readTasks();

    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const hash = createHash('sha256')
        .update(`${id}-${title}-${createdAt}`)
        .digest('hex');

    const task = {
        id,
        title,
        completed: false,
        createdAt,
        hash,
    };
    tasks.push(task);
    await saveTasks(tasks);
    eventEmitter.emit('taskCreated', task);
    return task;
};

const getTasks = () => readTasks();

const completeTask = async (id) => {
    const tasks = await readTasks();
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        return null;
    }
    task.completed = true;
    await saveTasks(tasks);
    eventEmitter.emit('taskCompleted', task);
    return task;
};

const deleteTask = async (id) => {
    const tasks = await readTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
        return null;
    }
    const deletedTask = tasks.splice(index, 1)[0];
    await saveTasks(tasks);
    eventEmitter.emit('taskDeleted', deletedTask);
    return deletedTask;
};

module.exports = {
    addTask,
    getTasks,
    completeTask,
    deleteTask,
};