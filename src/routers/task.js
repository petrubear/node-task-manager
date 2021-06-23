const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

// region Tasks
router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body, // ... copia las propiedades de req.body al nuevo objeto
        owner: req.user._id,
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    const newTask = req.body;

    const updates = Object.keys(newTask);
    const allowedUpdates = ['completed', 'description'];

    const isValidUpdate = updates.every((item) => {
        return allowedUpdates.includes(item);
    });

    if (!isValidUpdate) {
        return res.status(400).send({error: 'Invalid field updates'});
    }

    try {
        const task = await Task.findById(id);

        updates.forEach((update) => {
            task[update] = newTask[update];
        });

        await task.save();
        /*
        const task = await Task.findByIdAndUpdate(id, newTask, {
            new: true,
            runValidators: true,
        });
         */

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});
// endregion

module.exports = router;
