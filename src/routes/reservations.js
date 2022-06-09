const express = require("express");
const router = express.Router();
const reservationsController = require('../controllers/reservations.controllers')
const resevationMiddlewares = require('../middlewares/resevationMiddlewares.js')

router.put("/create", resevationMiddlewares.create, reservationsController.create)
router.post("/pay", resevationMiddlewares.pay, reservationsController.pay)
router.post("/cancel", resevationMiddlewares.cancel, reservationsController.cancel)
router.post("/list", resevationMiddlewares.list, reservationsController.list)

module.exports = router;