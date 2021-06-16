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

