// CRUD

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.log('unable to connect to mongodb');
    }

    const db = client.db(databaseName);

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
});

