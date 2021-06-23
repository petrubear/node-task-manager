require('../src/db/mongoose');
const Task = require('../src/models/task');
const User = require('../src/models/user');


const main = async () => {
    const task = await Task.findById('60d27f93d5631a0f19716e9a');
    console.log(task.owner);

    await task.populate('owner').execPopulate();
    console.log(task.owner);

    const user = await User.findById('60d1464cb433ee165d48a40f');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
};

main();
