var express = require('express');
var router = express.Router();
var models = require('../models');
const { tokenValidate, checkInput } = require('../services/services');


/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        const posts = await models.Post.findAll({ include: models.User })
        res.status(200).json({ status: 'success', data: posts })
    } catch (error) {
        res.status(500).json({ status: 'failed', message: error.message })
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const id = req.params.id
        const post = await models.Post.findOne({ where: { id }, include: models.User })
        if (!post) throw Error.message = { code: 404, message: "Post not found" }
        res.status(200).json({ status: 'success', data: post })
    } catch (error) {
        res.status(error.code || 500).json({ status: 'failed', message: error.message })
    }
});

router.post('/', tokenValidate, async function (req, res, next) {
    try {
        const { content } = req.body
        checkInput({ content }, req.originalUrl)
        const post = await models.Post.create({ content, authorId: req.user.id }, { returning: true, plain: true })
        res.status(201).json({ status: 'success', data: post })
    } catch (error) {
        res.status(error.code || 500).json({ status: 'failed', message: error.message })
    }
})

router.put('/:id', tokenValidate, async function (req, res, next) {
    try {
        const { content } = req.body
        const id = req.params.id
        checkInput({ content }, req.originalUrl)
        const post = await models.Post.findOne({ where: { id } })
        if (!post) throw Error.message = { code: 404, message: "Post not found" }
        await post.checkAuthorId(req.user.id).update({ content, updatedAt: Date.now() })
        res.status(201).json({ status: 'success', data: post })
    } catch (error) {
        res.status(error.code || 500).json({ status: 'failed', message: error.message })
    }
})

router.delete('/:id', tokenValidate, async function (req, res, next) {
    try {
        const id = req.params.id
        const post = await models.Post.findOne({ where: { id } })
        if (!post) throw Error.message = { code: 404, message: "Post not found" }
        await post.checkAuthorId(req.user.id).destroy()
        res.status(200).json({ status: 'success', data: post })
    } catch (error) {
        res.status(error.code || 500).json({ status: 'failed', message: error.message })
    }
})

module.exports = router;
