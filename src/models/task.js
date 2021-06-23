const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

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
