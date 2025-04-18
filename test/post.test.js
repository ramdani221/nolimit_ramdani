const chai = require('chai');
const chaiHTTP = require('chai-http');
const sinon = require('sinon');
const app = require('../app');
const process = require('process');
const jwt = require('jsonwebtoken');
const models = require('../models');

chai.should();
chai.use(chaiHTTP);

describe('Get All Posts', function () {
    afterEach(() => {
        sinon.restore()
    });

    const postInput = { content: 'makan', authorId: 1 };

    it('Should successfully get all Posts on /posts GET', function (done) {
        const existingPosts = [
            { id: 1, content: 'makan', authorId: 1, createdAt: "2025-04-16T14:16:25.000Z", updatedAt: "2025-04-16T14:16:25.000Z" },
            { id: 2, content: 'minum', authorId: 2, createdAt: "2025-04-16T14:17:25.000Z", updatedAt: "2025-04-16T14:17:25.000Z" },
        ]
        sinon.stub(models.Post, 'findAll').resolves(existingPosts)

        chai.request(app)
            .get('/posts')
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('success');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array')
                res.body.data[0].should.be.a('object');
                res.body.data[0].should.have.property('id');
                res.body.data[0].id.should.be.a('number');
                res.body.data[0].id.should.equal(existingPosts[0].id)
                res.body.data[0].should.have.property('content');
                res.body.data[0].content.should.be.a('string');
                res.body.data[0].content.should.equal(existingPosts[0].content)
                res.body.data[0].should.have.property('authorId');
                res.body.data[0].authorId.should.be.a('number');
                res.body.data[0].authorId.should.equal(existingPosts[0].authorId);
                res.body.data[0].should.have.property('createdAt');
                res.body.data[0].createdAt.should.be.a('string');
                res.body.data[0].createdAt.should.equal(existingPosts[0].createdAt);
                res.body.data[0].should.have.property('updatedAt');
                res.body.data[0].updatedAt.should.be.a('string');
                res.body.data[0].updatedAt.should.equal(existingPosts[0].updatedAt);
                done();
            })
    })

    it('Should failed to get all posts if database fails on /posts GET', function (done) {
        sinon.stub(models.Post, 'findAll').throws(new Error("DB error"));

        chai.request(app)
            .get('/posts')
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

describe('Get a Post by id', function () {
    const postId = 1;

    afterEach(() => {
        sinon.restore()
    });

    it('Should successfully get a post by id on /posts/:id GET', function (done) {
        const existingPosts = { id: 1, content: 'makan', authorId: 1, createdAt: "2025-04-16T14:16:25.000Z", updatedAt: "2025-04-16T14:16:25.000Z" }
        sinon.stub(models.Post, 'findOne').resolves(existingPosts)

        chai.request(app)
            .get('/posts/' + postId)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('success');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('id');
                res.body.data.id.should.be.a('number');
                res.body.data.id.should.equal(existingPosts.id)
                res.body.data.should.have.property('content');
                res.body.data.content.should.be.a('string');
                res.body.data.content.should.equal(existingPosts.content)
                res.body.data.should.have.property('authorId');
                res.body.data.authorId.should.be.a('number');
                res.body.data.authorId.should.equal(existingPosts.authorId);
                res.body.data.should.have.property('createdAt');
                res.body.data.createdAt.should.be.a('string');
                res.body.data.createdAt.should.equal(existingPosts.createdAt);
                res.body.data.should.have.property('updatedAt');
                res.body.data.updatedAt.should.be.a('string');
                res.body.data.updatedAt.should.equal(existingPosts.updatedAt);
                done();
            })
    })

    it('Should failed to get all posts if database fails on /posts GET', function (done) {
        sinon.stub(models.Post, 'findOne').throws(new Error("DB error"));

        chai.request(app)
            .get('/posts/' + postId)
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

describe('Create Post', function () {
    let token
    before(() => {
        token = jwt.sign({ id: 1, name: 'tester', email: 'test@example.com' }, process.env.SECRET)
    })
    afterEach(() => {
        sinon.restore()
    });

    it('Should successfully create post on /posts POST', function (done) {
        const createdPost = { id: 1, content: 'makan', authorId: 1, createdAt: '2025-04-16T14:16:25.000Z', updatedAt: '2025-04-16T14:16:25.000Z' }

        sinon.stub(models.Post, 'create').resolves(createdPost);

        chai.request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'makan' })
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
                res.body.data.id.should.equal(createdPost.id)
                res.body.data.should.have.property('content');
                res.body.data.content.should.be.a('string');
                res.body.data.content.should.equal(createdPost.content)
                res.body.data.should.have.property('authorId');
                res.body.data.authorId.should.be.a('number');
                res.body.data.authorId.should.equal(createdPost.authorId);
                res.body.data.should.have.property('createdAt');
                res.body.data.createdAt.should.be.a('string');
                res.body.data.createdAt.should.equal(createdPost.createdAt);
                res.body.data.should.have.property('updatedAt');
                res.body.data.updatedAt.should.be.a('string');
                res.body.data.updatedAt.should.equal(createdPost.updatedAt);
                done();
            })
    })

    it('Should failed create post with invalid token or whitout token on /posts POST', function (done) {
        chai.request(app)
            .post('/posts')
            .set('Authorization', `Bearer invalidToken`)
            .send({ content: 'makan' })
            .end((err, res) => {
                res.should.have.status(401);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('failed');
                res.body.should.have.property('message');
                res.body.message.should.equal('Access denied');
                done();
            })
    })

    it('Should failed to create post if content field is missing on /posts POST', function (done) {
        chai.request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({})
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

    it('Should failed to create post if internal server error on /posts POST', function (done) {
        sinon.stub(models.Post, 'create').throws(new Error('DB error'));

        chai.request(app)
            .post('/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'makan' })
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

describe('Update Post', function () {
    const postId = 1
    let token
    before(() => {
        token = jwt.sign({ id: 1, name: 'tester', email: 'test@example.com' }, process.env.SECRET)
    })
    afterEach(() => {
        sinon.restore()
    });

    it('Should successfully update post on /posts/id PUT', function (done) {
        const fakePost = models.Post.build({ id: postId, content: 'makan', authorId: 1, createdAt: "2025-04-16T14:16:25.000Z", updatedAt: "2025-04-16T14:16:25.000Z" })
        sinon.stub(models.Post, 'findOne').resolves(fakePost)
        sinon.stub(fakePost, 'update').resolves({ ...fakePost, content: 'minum', updatedAt: Date.now() })

        chai.request(app)
            .put('/posts/' + postId)
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'makan' })
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
                res.body.data.id.should.equal(fakePost.id)
                res.body.data.should.have.property('content');
                res.body.data.content.should.be.a('string');
                res.body.data.content.should.equal(fakePost.content)
                res.body.data.should.have.property('authorId');
                res.body.data.authorId.should.be.a('number');
                res.body.data.authorId.should.equal(fakePost.authorId);
                res.body.data.should.have.property('createdAt');
                res.body.data.createdAt.should.be.a('string');
                res.body.data.should.have.property('updatedAt');
                res.body.data.updatedAt.should.be.a('string');
                done();
            })
    })

    it('Should failed update post with invalid token or whitout token on /posts PUT', function (done) {
        chai.request(app)
            .put('/posts/' + postId)
            .set('Authorization', `Bearer invalidToken`)
            .send({ content: 'makan' })
            .end((err, res) => {
                res.should.have.status(401);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('failed');
                res.body.should.have.property('message');
                res.body.message.should.equal('Access denied');
                done();
            })
    })

    it('Should failed to update post if content field is missing on /posts PUT', function (done) {
        chai.request(app)
            .put('/posts/' + postId)
            .set('Authorization', `Bearer ${token}`)
            .send({})
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

    it('Should failed to update post if user id does not match with authorId on /posts PUT', function (done) {
        const fakePost = models.Post.build({ id: 2, content: 'makan', authorId: 2, createdAt: "2025-04-16T14:16:25.000Z", updatedAt: "2025-04-16T14:16:25.000Z" })
        sinon.stub(models.Post, 'findOne').resolves(fakePost)

        chai.request(app)
            .put('/posts/' + 2)
            .set('Authorization', `Bearer ${token}`)
            .send({content: 'minum'})
            .end((err, res) => {
                res.should.have.status(403);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('failed');
                res.body.should.have.property('message');
                res.body.message.should.equal('Forbidden - User id doesn\'t match authorId');
                done();
            })
    })

    it('Should failed to update post if post not found /posts/id PUT', function (done) {
        sinon.stub(models.Post, 'findOne').resolves(null)

        chai.request(app)
            .put('/posts/' + postId)
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'minum' })
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('failed');
                res.body.should.have.property('message');
                res.body.message.should.equal('Post not found');
                done();
            })
    })

    it('Should failed to update post if internal server error on /posts PUT', function (done) {
        const fakePost = models.Post.build({ id: postId, content: 'makan', authorId: 1, createdAt: "2025-04-16T14:16:25.000Z", updatedAt: "2025-04-16T14:16:25.000Z" })
        sinon.stub(models.Post, 'findOne').resolves(fakePost)
        sinon.stub(fakePost, 'update').throws(new Error('DB error'));

        chai.request(app)
            .put('/posts/' + postId)
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'makan' })
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

describe('Delete Post', function () {
    const postId = 1
    let token
    before(() => {
        token = jwt.sign({ id: 1, name: 'tester', email: 'test@example.com' }, process.env.SECRET)
    })
    afterEach(() => {
        sinon.restore()
    });

    it('Should successfully delete post on /posts/id DELETE', function (done) {
        const fakePost = models.Post.build({ id: postId, content: 'makan', authorId: 1, createdAt: "2025-04-16T14:16:25.000Z", updatedAt: "2025-04-16T14:16:25.000Z" })
        sinon.stub(models.Post, 'findOne').resolves(fakePost)
        sinon.stub(fakePost, 'destroy').resolves(fakePost)

        chai.request(app)
            .delete('/posts/' + postId)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('success');
                res.body.should.have.property('data');
                res.body.data.should.have.property('id');
                res.body.data.id.should.be.a('number');
                res.body.data.id.should.equal(fakePost.id)
                res.body.data.should.have.property('content');
                res.body.data.content.should.be.a('string');
                res.body.data.content.should.equal(fakePost.content)
                res.body.data.should.have.property('authorId');
                res.body.data.authorId.should.be.a('number');
                res.body.data.authorId.should.equal(fakePost.authorId);
                res.body.data.should.have.property('createdAt');
                res.body.data.createdAt.should.be.a('string');
                res.body.data.should.have.property('updatedAt');
                res.body.data.updatedAt.should.be.a('string');
                done();
            })
    })

    it('Should failed delete post with invalid token or whitout token on /posts DELETE', function (done) {
        chai.request(app)
            .delete('/posts/' + postId)
            .set('Authorization', `Bearer invalidToken`)
            .send({ content: 'makan' })
            .end((err, res) => {
                res.should.have.status(401);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('failed');
                res.body.should.have.property('message');
                res.body.message.should.equal('Access denied');
                done();
            })
    })

    it('Should failed to delete post if user id does not match with authorId on /posts DELETE', function (done) {
        const fakePost = models.Post.build({ id: 2, content: 'makan', authorId: 2, createdAt: "2025-04-16T14:16:25.000Z", updatedAt: "2025-04-16T14:16:25.000Z" })
        sinon.stub(models.Post, 'findOne').resolves(fakePost)

        chai.request(app)
            .delete('/posts/' + 2)
            .set('Authorization', `Bearer ${token}`)
            .send({content: 'minum'})
            .end((err, res) => {
                res.should.have.status(403);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('failed');
                res.body.should.have.property('message');
                res.body.message.should.equal('Forbidden - User id doesn\'t match authorId');
                done();
            })
    })

    it('Should failed to delete post if post not found /posts/id DELETE', function (done) {
        sinon.stub(models.Post, 'findOne').resolves(null)

        chai.request(app)
            .delete('/posts/' + postId)
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'makan' })
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.be.a('string');
                res.body.status.should.equal('failed');
                res.body.should.have.property('message');
                res.body.message.should.equal('Post not found');
                done();
            })
    })

    it('Should failed to delete post if internal server error on /posts/id DELETE', function (done) {
        const fakePost = models.Post.build({ id: postId, content: 'makan', authorId: 1, createdAt: "2025-04-16T14:16:25.000Z", updatedAt: "2025-04-16T14:16:25.000Z" })
        sinon.stub(models.Post, 'findOne').resolves(fakePost)
        sinon.stub(fakePost, 'destroy').throws(new Error('DB error'));

        chai.request(app)
            .delete('/posts/' + postId)
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'makan' })
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