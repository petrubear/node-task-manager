require('./db/mongoose');

const express = require('express');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

// parsea automaticamente json a objetos
app.use(express.json());

// region Users
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get('/users/:id', async (req, res) => {
    // console.log(req.params);
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send(e);
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});
// endregion

// region Tasks
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});
// endregion

app.listen(port, () => {
    console.log('Listening on', port);
});
