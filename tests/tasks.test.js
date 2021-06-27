const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const {
    userOne,
    setUpDatabase,
    taskThree,
} = require('./fixtures/db');

beforeEach(async () => {
    await setUpDatabase();
});

afterEach(async () => {
});

afterAll(async () => {
    // await closeDatabase();
});

test('should create task or user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Task from tests',
        }).expect(201);

    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toBe(false);
});

test('should fetch tasks for user one', async () => {
    const response = await request(app)
        .get('/tasks/')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send().expect(200);
    expect(response.body.length).toBe(2);
});


test('should not delete task from another user', async () => {
    await request(app)
        .delete('/tasks/' + taskThree._id)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send().expect(404);

    const task = await Task.findById(taskThree._id);
    expect(task).not.toBeNull();
});
