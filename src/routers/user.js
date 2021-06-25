const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');

const router = new express.Router();

// region Users
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
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
        const user = req.user;
        updates.forEach((update) => {
            user[update] = newUser[update];
        });

        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});


router.delete('/users/me', auth, async (req, res) => {
    try {
        /*
        const id = req.user._id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send();
        }
         */
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
});


const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match('\\.(jpg|jpeg|png)$')) {
            return callback(new Error('file must be jpg|jpeg|png'));
        }

        callback(undefined, true);
    },
});
router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send();
});
// endregion

// region old methods
/*
router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});
*/


/*
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
*/
/*
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

        //const user = await User.findByIdAndUpdate(id, newUser, {
        //    new: true,
        //    runValidators: true,
        //});


if (!user) {
    return res.status(404).send();
}
res.send(user);
} catch (e) {
    res.status(400).send(e);
}
});
 */
// endregion

module.exports = router;
