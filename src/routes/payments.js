const express = require("express");
const router = express.Router();
const paymentsController = require('../controllers/payments.controllers')
const paymentsMiddlewares = require('../middlewares/paymentsMiddlewares')

router.post("/list", paymentsMiddlewares.list, paymentsController.list)

module.exports = router;