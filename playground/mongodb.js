// CRUD

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.log('unable to connect to mongodb');
    }

    const db = client.db(databaseName);

    // INSERT
    // insert single
    db.collection('users').insertOne({
        name: 'Edison',
        age: 39,
    }, (error, result) => {
        if (error) {
            return console.log('unable to insert user');
        }

        console.log(result.ops);
    });
    // insert many
    db.collection('users').insertMany([
        {
            name: 'Valeria',
            age: 20,
        },
        {
            name: 'Lorena',
            age: 50,
        },
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents');
        }
        console.log(result.ops);
    });

    db.collection('tasks').insertMany([
        {
            description: 'ir al dentista',
            completed: false,
        },
        {
            description: 'inflar llantas',
            completed: true,
        },
        {
            description: 'calentar la moto',
            completed: false,
        },
    ], (error, result) => {
        if (error) {
            return console.log('unable to insert tasks');
        }

        console.log(result.ops);
    });

    // FIND
    db.collection('users').findOne({name: 'Valeria'}, (error, user) => {
        if (error) {
            return console.log('unable to fetch user');
        }

        console.log(user);
    });


    db.collection('users').findOne({_id: new ObjectID('60c8c102aa5c0e0824a48737')}, (error, user) => {
        if (error) {
            return console.log('unable to fetch user');
        }

        console.log(user);
    });

    db.collection('users').find({age: 39}).toArray((error, users) => {
        console.log(users);
    });

    db.collection('users').find({age: 39}).count((error, count) => {
        console.log(count);
    });


    // challenge
    db.collection('tasks').findOne({_id: new ObjectID('60c8c316987a8c08ad4d7660')}, (error, task) => {
        if (error) {
            return console.log(error);
        }

        console.log(task);
    });

    db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
        if (error) {
            return console.log(error);
        }

        console.log(tasks);
    });

    // UPDATE
    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID('60c8c102aa5c0e0824a48735'),
    }, {
        $set: {
            name: 'Mike',
        },
        $inc: {
            age: 1,
        },
    });

    updatePromise.then((result) => {
        // console.log(result.modifiedCount);
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });

    db.collection('tasks').updateMany(
        {
            completed: false,
        }, {
            $set: {
                completed: true,
            },
        },
    ).then((result) => {
        console.log(result.modifiedCount + ' documents affected');
    }).catch((error) => {
        console.log('error: ', error);
    });

    // DELETE
    db.collection('users').deleteMany({
        age: 39,
    }).then((result) => {
        console.log(result.deletedCount + ' rows afected');
    }).catch((error) => {
        console.log('Error: ', error);
    });

    db.collection('tasks').deleteOne({
        description: 'calentar la moto',
    }).then((result) => {
        console.log(result.deletedCount + ' rows afected');
    }).catch((error) => {
        console.log('Error: ', error);
    });
});

