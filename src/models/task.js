const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        required: false,
        default: false,
    },
});

/*
const task = new Task({
    description: '   Rodar el coche   ',
});

task.save().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log('Error: ', error);
});
 */

module.exports = Task;
