require('../src/db/mongoose');
const Task = require('../src/models/task');

const taskId = '60ca34e4b58b8616c6313483';

Task.findByIdAndDelete(taskId).then((task) => {
    console.log(task);
    return Task.countDocuments({completed: false});
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});


