const { randomUUID } = require('crypto');
const { readTasks, saveTasks } = require('./fileStorage');

const addTask = async (title) => {
    const tasks = await readTasks();
    const task = {
        id: randomUUID(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    await saveTasks(tasks);
    console.log(`Task added: ${task.title}`);
    return task;
};

const getTasks = async () => await readTasks();

const completeTask = async (id) => {
    const tasks = await readTasks();
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        return null;
    }
    task.completed = true;
    await saveTasks(tasks);
    console.log(`Task completed: ${task.title}`);
    return task;
};

const deleteTask = async (id) => {
    const tasks = await readTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index == -1) {
        return null;
    }
    const deletedTask = tasks.splice(index, 1)[0];
    await saveTasks(tasks);
    console.log(`Task deleted: ${deletedTask.title}`);
    return deletedTask;
};

module.exports = {
    addTask,
    getTasks,
    completeTask,
    deleteTask,
};