require('./db/mongoose');

const express = require('express');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

// parsea automaticamente json a objetos
app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.status(201);
        res.send(user);
    }).catch((error) => {
        res.status(400);
        res.send(error);
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => {
        res.status(201);
        res.send(task);
    }).catch((error) => {
        res.status(400);
        res.send(error);
    });
});

app.listen(port, () => {
    console.log('Listening on', port);
});
