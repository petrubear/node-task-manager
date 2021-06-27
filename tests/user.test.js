const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
    name: 'Ip Man',
    email: 'ip@sman.com',
    password: 'DonPass01234',
};

beforeEach(async () => {
    await User.deleteMany({});
    await new User(userOne).save();
});

afterEach(() => {
});

afterAll(async () => {
    await mongoose.connection.close();
});

test('Should signUp a new User', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'edison',
            email: 'email@sample.com',
            password: 'MyPass01234',
        }).expect(201);
});

test('should log in user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password,
        }).expect(200);
});

test('should not log in non existent user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: 'randomPass',
        }).expect(400);
});
