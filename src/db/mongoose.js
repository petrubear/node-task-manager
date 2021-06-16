const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});


const User = mongoose.model('User', {
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
});


const me = new User({
    name: 'Edison',
    age: 39,
});

me.save().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log('Error: ', error);
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
    },
});

const task = new Task({
    description: 'Calentar la moto',
    completed: false,
});

task.save().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log('Error: ', error);
});
