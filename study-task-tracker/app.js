const {addTask, getTasks, completeTask, deleteTask} = require('./modules/taskService');
const formatTask = require('./modules/taskFormatter');
const {initStorage} = require('./modules/fileStorage');
const eventEmitter = require('./modules/eventLogger');
const logSystemInfo= require('./modules/systemInfo');

const main = async () => {
    await initStorage();

    eventEmitter.emit('appStarted');

    logSystemInfo();

    const task1 = await addTask('Learn Node.js modules');
    const task2 = await addTask('Practice fs module');
    const task3 = await addTask('Practice crypto module');

    await completeTask(task1.id);
    await deleteTask(task2.id);

    const tasks = await getTasks();

    tasks.forEach((task) => {
        console.log(formatTask(task));
    });
};

main().catch((error) => {
    console.error('Application error:', error);
});