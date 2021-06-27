const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Ip Man',
    email: 'ip@sman.com',
    password: 'DonPass01234',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET),
    }],
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

test('should get user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('should not get user profile', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('should delete user profile', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('should not delete user profile', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});
