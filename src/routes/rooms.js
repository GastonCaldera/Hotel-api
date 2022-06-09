const express = require("express");
const router = express.Router();
const roomsController = require('../controllers/rooms.controllers')
const roomMiddlewares = require('../middlewares/roomMiddlewares')

router.put("/create", roomMiddlewares.create, roomsController.create)
router.post("/update", roomMiddlewares.update, roomsController.update)
router.post("/delete", roomMiddlewares.delete, roomsController.delete)
router.post("/list", roomMiddlewares.list, roomsController.list)

module.exports = router;