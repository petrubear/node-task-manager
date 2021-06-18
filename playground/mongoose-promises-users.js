require('../src/db/mongoose');
const User = require('../src/models/user');

const userId = '60ca2f1fee4b02151376121d';

User.findByIdAndUpdate(userId, {age: 1}).then((user) => {
    console.log(user);
    return User.countDocuments({age: 1});
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});

// using async await

const updateAgeAndCount = async (id, age) => {
    await User.findByIdAndUpdate(id, {age: age});
    return await User.countDocuments({age: age});
};

updateAgeAndCount(userId, 5).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});


