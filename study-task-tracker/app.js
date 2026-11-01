const {addTask, getTasks, completeTask, deleteTask} = require('./modules/taskService');
const formatTask = require('./modules/taskFormatter');
const {initStorage, readTasks, saveTasks} = require('./modules/fileStorage');

const main = async () => {
    await initStorage();

    const task1 = await addTask('Learn Node.js modules');
    const task2 = await addTask('Practice fs module');
    const task3 = await addTask('Practice crypto module');

    const tasks = await getTasks();

    tasks.forEach((task) => {
        console.log(formatTask(task));
    });
};

main().catch((error) => {
    console.error('Application error:', error);
});