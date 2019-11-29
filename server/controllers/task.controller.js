const Task = require('../models/task.model');

// Create and Save a new task
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Task title can not be empty"
        });
    }

    // Create a task
    const task = new Task({
        title : req.body.title,
        message : req.body.message,
        status : req.body.status,
        startAt : req.body.startAt,
        endAt : req.body.endAt      
    });

  // Save task in the database
    task.save()
    .then(data => {
        res.send(data);
        console.log('new task has Created:',task)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the task."
        });
    });
};

// Retrieve and return all tasks from the database.
exports.findAll = (req, res) => {
    Task.find()
    .then(tasks => {
        res.send(tasks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tasks."
        });
    });
};

exports.findByStatus = (req, res) => {
    Task.find()
    .then(tasks => {
        const reqTasks = tasks.filter(task=> task.status == req.params.taskStatus);
        res.send(reqTasks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tasks."
        });
    });
};

// Find a single task with a taskId
exports.findOne = (req, res) => {
    Task.findById(req.params.taskId)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });            
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving task with id " + req.params.taskId
        });
    });
};

// Update a task identified by the taskId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "taskname content can not be empty"
        });
    }

    // Find task and update it with the request body
    Task.findByIdAndUpdate(req.params.taskId, {

        title : req.body.title,
        message : req.body.message,
        status : req.body.status,
        startAt : req.body.startAt ,
        endAt : req.body.endAt    
    }, {new: true})
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Error updating task with id " + req.params.taskId
        });
    });
};

// Delete a task with the specified taskId in the request
exports.delete = (req, res) => {
    Task.findByIdAndDelete(req.params.taskId)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });
        }
        console.log(req.params.taskId);
        res.send({message: "task deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Could not delete task with id " + req.params.taskId
        });
    });
};