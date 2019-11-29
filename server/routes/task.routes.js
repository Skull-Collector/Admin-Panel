module.exports = (app) => {
    const tasks = require('../controllers/task.controller');

    // Create a new task
    app.post('/task', tasks.create);

    // Retrieve all tasks
    app.get('/alltasks', tasks.findAll);

    // Retrieve a single task with taskId
    app.get('/tasks/:taskId', tasks.findOne);

    // find task by status
    app.get('/taskbystatus/:taskStatus', tasks.findByStatus);


    // Update a task with taskId
    app.put('/tasks/:taskId', tasks.update);

    // Delete a task with taskId
    app.delete('/tasks/:taskId', tasks.delete);

}