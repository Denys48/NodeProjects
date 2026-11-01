const fs = require('node:fs/promises');
const path = require('node:path');

const dataDir = path.join(__dirname, '..', 'data');
const filePath = path.join(dataDir, 'tasks.json');

const initStorage = async () => {
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }

    try {
        await fs.access(filePath);
    } catch {
        await fs.writeFile(filePath, JSON.stringify([], null, 2), 'utf8');
    }
};

const readTasks = async () => {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
};

const saveTasks = async (tasks) => {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8');
};

module.exports = {
    initStorage,
    readTasks,
    saveTasks,
};