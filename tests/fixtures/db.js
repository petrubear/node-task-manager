const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Ip Man',
    email: 'ip@sman.com',
    password: 'DonPass01234',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET),
    }],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Bruce Lee',
    email: 'bruce@lee.com',
    password: 'OtroPass01234',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET),
    }],
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Default Task From tests',
    completed: false,
    owner: userOneId,
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Default Second Task From tests',
    completed: true,
    owner: userOneId,
};

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Default Third Task From tests',
    completed: false,
    owner: userTwoId,
};

const setUpDatabase = async () => {
    await User.deleteMany({});
    await Task.deleteMany({});
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
};

const closeDatabase = async () => {
    await mongoose.connection.close();
};

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setUpDatabase,
    closeDatabase,
};
