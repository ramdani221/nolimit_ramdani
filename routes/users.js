var express = require('express');
var router = express.Router();
var models = require('../models')
var { checkInput, tokenValidate } = require('../services/services')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const users = await models.User.findAll()
    res.status(200).json({ data: users })
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to send Users data' })
  }
});

router.put('/:id', async function (req, res, next) {
  const input = req.body
  const id = req.params.id
  try {
    checkInput(input)
    const user = await models.User.findOne({ where: { id } })
    await user.update(input)
    res.status(201).json({ data: user.sendUserData() })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message || error })
  }
})

router.delete('/:id', async function (req, res, next) {
  try {
    const id = req.params.id
    const user = await models.User.findOne({ where: { id } })
    await user.destroy()
    res.status(200).json({ status: success, data: user })
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error.message || 'Failed to delete User' })
  }
})

module.exports = router;
