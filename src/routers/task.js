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

// GET /tasks?completed=true|false
// GET /task?limit=10&skip=0
// GET /tasks?sortBy=createdAt_asc
router.get('/tasks', auth, async (req, res) => {
    try {
        // const owner = req.user._id;
        // const tasks = await Task.find({owner: owner});
        // res.send(tasks);

        const match = {};
        const sort = {};

        if (req.query.completed) {
            match.completed = req.query.completed === 'true';
        }

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort,
            },
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const ownerId = req.user._id;
        const task = await Task.findOne({
            _id: id,
            owner: ownerId,
        });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
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
        const id = req.params.id;
        const owner = req.user._id;
        const task = await Task.findOne({_id: id, owner: owner});

        if (!task) {
            return res.status(404).send();
        }

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
        res.send(task);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const owner = req.user._id;
        const task = await Task.findOneAndDelete({_id: id, owner: owner});

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
