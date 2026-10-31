const { randomUUID } = require('crypto');
const tasks = [];

const addTask = (title) => {
    const task = {
        id: randomUUID(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    console.log(`Task added: ${task.title}`);
    return task;
};

const getTasks = () => tasks;

const completeTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        return null;
    }
    task.completed = true;
    console.log(`Task completed: ${task.title}`);
    return task;
};

const deleteTask = (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index == -1) {
        return null;
    }
    const deletedTask = tasks.splice(index, 1)[0];
    console.log(`Task deleted: ${deletedTask.title}`);
    return deletedTask;
};

module.exports = {
    addTask,
    getTasks,
    completeTask,
    deleteTask,
};