var jwt = require('jsonwebtoken');
var models = require('../models');
const secret = '82a01119-cadf-42c0-8f39-ca3a17f94127'

async function generateToken({ email, password }) {
    const user = await models.User.scope(null).findOne({ where: { email } })
    if (!user || !user.checkPassword(password)) throw Error.message = { code: 401, message: 'email or password is wrong!' }
    const token = jwt.sign(user.sendUserData(), secret, { expiresIn: '7d' });
    return token
}

async function tokenValidate(req, res, next) {
    try {
        const token = req.header('Authorization').slice(7)
        req.user = jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(401).json({ status: 'failed', message: 'access denied' })
    }

}

function checkInput({ name, email, password, content }, url) {
    if (url.includes('/login') && (!email || !password)) throw Error.message = { code: 400, message: 'Missing required fields' }
    if (url.includes('/register') && (!name || !email || !password)) throw Error.message = { code: 400, message: 'Missing required fields' }
    if (url.includes('/post') && !content) throw Error.message = { code: 400, message: 'Missing required fields' }
};

function checkAuthorId(req, res, next) {
    try {

    } catch (error) {

    }
}

module.exports = { generateToken, tokenValidate, checkInput }
