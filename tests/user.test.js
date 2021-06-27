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
    const response = await request(app)
        .post('/users')
        .send({
            name: 'edison',
            email: 'email@sample.com',
            password: 'MyPass01234',
        }).expect(201);

    // Assert that the database changed
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertions about response body
    expect(response.body.user.name).toBe('edison');
    expect(response.body).toMatchObject({
        user: {
            name: 'edison',
            email: 'email@sample.com',
        },
        token: user.tokens[0].token,
    });
    expect(user.password).not.toBe('MyPass01234');
});

test('should log in user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password,
        }).expect(200);

    const user = await User.findById({_id: response.body.user._id});
    expect(response.body.token).toBe(user.tokens[1].token);
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

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('should not delete user profile', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test('should upload avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.avatar).toStrictEqual(expect.any(Buffer));
});

test('should update user name', async () => {
    const newName = 'Valeska';
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: newName,
        }).expect(200);

    const user = await User.findById(userOneId);
    expect(user.name).toBe(newName);
});

test('should not update user location', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Calceta',
        }).expect(400);
});
