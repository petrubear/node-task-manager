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

    /*
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
     */

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
});

