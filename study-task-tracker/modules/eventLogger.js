const EventEmitter = require('node:events');
const fs = require('node:fs');
const path = require('node:path');

const logFilePath = path.join(__dirname, '..', 'data', 'events.log');

const logEvent = (eventType, message) => {
    const logEntry = `${new Date().toISOString()} | ${eventType} | ${message}\n`;
    fs.appendFileSync(logFilePath, logEntry, 'utf8');
};

const eventEmitter = new EventEmitter();

eventEmitter.on('taskCreated', (task) => {
    logEvent('taskCreated', `Task ${task.title} was created`);
});

eventEmitter.on('taskCompleted', (task) => {
    logEvent('taskCompleted', `Task ${task.title} was completed`);
});

eventEmitter.on('taskDeleted', (task) => {
    logEvent('taskDeleted', `Task ${task.title} was deleted`);
});

eventEmitter.on('appStarted', () => {
    logEvent('appStarted', 'Application started');
});

module.exports = eventEmitter;
