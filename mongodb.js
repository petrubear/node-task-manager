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

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('unable to connect to mongodb');
    }

    const db = client.db(databaseName);

    // insert single
    /*
    db.collection('users').insertOne({
        name: 'Edison',
        age: 39,
    }, (error, result) => {
        if (error) {
            return console.log('unable to insert user');
        }

        console.log(result.ops);
    });
     */
    // insert many
    /*
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
     */
});

