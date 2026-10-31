const formatTask = (task) => {
    console.log(`${task.title} - ${task.completed ? 'completed' : 'in progress'}`);
};

module.exports = formatTask;