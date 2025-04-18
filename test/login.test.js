const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const app = require('../app');
const jwt = require('jsonwebtoken');
const models = require('../models');

chai.should();
chai.use(chaiHTTP);

describe('Login', function () {
    afterEach(() => {
        sinon.restore()
    });

    it('Should successfully login on /login POST', function (done) {
        const fakeUser = models.User.build({
            id: 1,
            name: 'test',
            email: 'test@example.com',
            password: 'hashedpass'
        });


        sinon.stub(models.User, 'findOne').resolves(fakeUser);
        sinon.stub(fakeUser, 'checkPassword').returns(true);
        sinon.stub(jwt, 'sign').returns('faketoken123');


        chai.request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'password123' })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('success');
                res.body.should.have.property('token');
                res.body.token.should.equal('faketoken123');
                done();
            })
    })

    it('Should failed to login if user not found on /login POST', function (done) {
        sinon.stub(models.User, 'findOne').resolves(null);

        chai.request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'password123' })
            .end((err, res) => {
                res.should.have.status(401);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('failed');
                res.body.should.have.property('message');
                res.body.message.should.equal('Email or password is wrong!');
                done();
            })
    })

    it('Should failed to login if password is wrong on /login POST', function (done) {
        const fakeUser = models.User.build({
            id: 1,
            name: 'test',
            email: 'test@example.com',
            password: 'hashedpass'
        });

        sinon.stub(models.User, 'findOne').resolves(fakeUser);
        sinon.stub(fakeUser, 'checkPassword').returns(false);

        chai.request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'password123' })
            .end((err, res) => {
                res.should.have.status(401);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('failed');
                res.body.should.have.property('message');
                res.body.message.should.equal('Email or password is wrong!');
                done();
            })
    })

    it('Should failed to login if email or password is missing on /login POST', function (done) {

        chai.request(app)
            .post('/login')
            .send({ email: '' })
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
    it('Should failed to login if database fails on /login POST', function (done) {
        sinon.stub(models.User, 'findOne').throws(new Error("DB error"));

        chai.request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'password123' })
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