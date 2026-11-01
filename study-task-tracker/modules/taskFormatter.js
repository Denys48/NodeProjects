const formatTask = (task) => {
    return `${task.title} - ${task.completed ? 'completed' : 'in progress'}`;
};

module.exports = formatTask;