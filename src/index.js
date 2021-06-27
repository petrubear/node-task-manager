const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
    console.log('Listening on', port);
});


/*
// multer
const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, callback) {
        // if (!file.originalname.endsWith('.pdf')) {
        if (!file.originalname.match('\\.(doc|docx)$')) {
            return callback(new Error('file must be doc|docx'));
        }

        callback(undefined, true);
    },
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
});
 */
