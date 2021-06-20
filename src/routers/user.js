const express = require('express');
const User = require('../models/user');

const router = new express.Router();

// region Users
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
    const id = req.params.id;
    const newUser = req.body;

    const updates = Object.keys(newUser);
    const allowedUpdates = ['name', 'email', 'password', 'age'];

    const isValidUpdate = updates.every((item) => {
        return allowedUpdates.includes(item);
    });

    if (!isValidUpdate) {
        return res.status(400).send({error: 'Invalid field updates'});
    }

    try {
        const user = await User.findById(id);
        updates.forEach((update) => {
            user[update] = newUser[update];
        });

        await user.save();

        // esta forma no permite ejecutar el middelware save
        /*
        const user = await User.findByIdAndUpdate(id, newUser, {
            new: true,
            runValidators: true,
        });
         */

        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});
// endregion

module.exports = router;
