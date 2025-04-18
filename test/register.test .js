const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const app = require('../app');
const models = require('../models');

chai.should();
chai.use(chaiHTTP);

describe('Register', function () {
    afterEach(() => {
        sinon.restore()
    });

    const userInput = {
        name: 'test',
        email: 'test@example.com',
        password: 'password123'
    };

    it('Should successfully register on /register POST', function (done) {
        const createdUser = models.User.build({ id: 1, ...userInput })

        sinon.stub(models.User, 'findOne').resolves(null);
        sinon.stub(models.User, 'create').resolves(createdUser);

        chai.request(app)
            .post('/register')
            .send(userInput)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('id');
                res.body.data.id.should.be.a('number');
                res.body.data.id.should.equal(createdUser.id);
                res.body.data.should.have.property('name');
                res.body.data.name.should.be.a('string');
                res.body.data.name.should.equal(createdUser.name);
                res.body.data.should.have.property('email');
                res.body.data.email.should.be.a('string');
                res.body.data.email.should.equal(createdUser.email);
                done();
            })
    })

    it('Should failed to register if email already in use on /register POST', function (done) {
        const existingUser = {
            id: 1,
            name: 'test',
            email: 'existing@example.com',
            password: '12345'
        };

        sinon.stub(models.User, 'findOne').resolves(existingUser);

        chai.request(app)
            .post('/register')
            .send(userInput)
            .end((err, res) => {
                res.should.have.status(409);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('failed');
                res.body.should.have.property('message');
                res.body.message.should.equal('Email already in use');
                done();
            })
    })

    it('Should failed to register if name, email or password is missing on /register POST', function (done) {
        chai.request(app)
            .post('/register')
            .send({ email: '', password: '' })
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('failed');
                res.body.should.have.property('message');
                res.body.message.should.equal('Missing required fields!');
                done();
            })
    })

    it('Should failed to register if internal server error on /register POST', function (done) {
        sinon.stub(models.User, 'findOne').resolves(null);
        sinon.stub(models.User, 'create').throws(new Error('DB error'));

        chai.request(app)
            .post('/register')
            .send(userInput)
            .end((err, res) => {
                res.should.have.status(500);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('failed');
                res.body.should.have.property('message');
                res.body.message.should.equal('DB error');
                done();
            })
    })
})