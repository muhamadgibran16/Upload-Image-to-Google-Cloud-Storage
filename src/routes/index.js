const express = require('express')
const router = express.Router()
const { processFiles } = require('../middleware/users')
const controller = require('../controller/index')

router.put('/public', processFiles, controller.PublicURL)
router.put('/private', processFiles, controller.PrivateURL)

module.exports = router  