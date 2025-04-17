var express = require('express');
var { checkInput, generateToken } = require('../services/services')
var models = require('../models');
var router = express.Router();

router.post('/login', async function (req, res, next) {
  try {
    const input = req.body
    checkInput(input, req.originalUrl)
    const token = await generateToken(input)
    res.status(200).json({ status: 'success', token })
  } catch (error) {
    res.status(error.code || 500).json({ status: 'failed', message: error.message })
  }

});

router.post('/register', async function (req, res, next) {
  try {
    const input = req.body
    checkInput(input, req.originalUrl)
    const user = await models.User.create(input, { returning: true, plain: true })
    res.status(201).json({ status: 'success', data: user.sendUserData() })
  } catch (error) {
    res.status(error.code || 500).json({ status: 'failed', message: error.message })
  }
});

module.exports = router;
