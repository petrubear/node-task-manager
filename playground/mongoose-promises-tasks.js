require('../src/db/mongoose');
const Task = require('../src/models/task');

const taskId = '60ca341b6f2442168112b491';

Task.findByIdAndDelete(taskId).then((task) => {
    console.log(task);
    return Task.countDocuments({completed: false});
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});


// async await

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id);
    return await Task.countDocuments({completed: false});
};

deleteTaskAndCount(taskId).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});
