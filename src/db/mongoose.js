const mongoose = require('mongoose');

const connectionURL = process.env.MONGODB_URL;

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(() => {
    console.log('mongoose connection OK');
}).catch((error) => {
    console.log(error);
});
