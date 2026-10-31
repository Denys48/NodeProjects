const {addTask, getTasks, completeTask, deleteTask} = require('./modules/taskService');
const formatTask = require('./modules/taskFormatter');

const task1 = addTask('Learn Node.js modules');
const task2 = addTask('Practice fs module');
const task3 = addTask('Practice crypto module');

getTasks().forEach(formatTask);

completeTask(task1.id);

deleteTask(task3.id);

getTasks().forEach(formatTask);