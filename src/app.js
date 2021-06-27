require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

// parsea automaticamente json a objetos
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
