const { RoomsModel } = require('../models/rooms')
const moment = require('moment')

const ROOM_TYPES = ['normal', 'premium']

const roomMiddlewares = {
    create: async (req, res, next) => {
        try {
            const body = req.body

            // Check room
            if (!body.hasOwnProperty("room")) {
                return res.status(400).json({ "s": false, "m": "must insert a room", "d": "" })
            }
            else if (typeof body?.room !== 'string') {
                return res.status(400).json({ "s": false, "m": "room have to be a string", "d": "" })
            }
            const room = await RoomsModel.findOne({ room: body.room }).exec()
            if (room !== null) {
                return res.status(400).json({ "s": false, "m": `room ${body.room} already exists`, "d": "" })
            }

            // Check Keys
            if (!body.hasOwnProperty("roomType")) {
                return res.status(400).json({ "s": false, "m": "must insert a roomType", "d": "" })
            }
            else if (typeof body?.roomType !== 'string') {
                return res.status(400).json({ "s": false, "m": "roomType have to be a string", "d": "" })
            }
            else if (!ROOM_TYPES.includes(body?.roomType)) {
                return res.status(400).json({ "s": false, "m": "roomType must be between only normal or premium", "d": "" })
            }

            next();
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
    update: async (req, res, next) => {
        try {
            const body = req.body

            // Check room
            if (!body.hasOwnProperty("room")) {
                return res.status(400).json({ "s": false, "m": "must insert a room", "d": "" })
            }
            else if (typeof body?.room !== 'string') {
                return res.status(400).json({ "s": false, "m": "room have to be a string", "d": "" })
            }
            const room = await RoomsModel.findOne({ room: body.room }).exec()
            if (room === null) {
                return res.status(400).json({ "s": false, "m": `room ${body.room} not found`, "d": "" })
            }

            next();
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
    delete: async (req, res, next) => {
        try {
            const body = req.body
            // Check room
            if (!body.hasOwnProperty("id")) {
                return res.status(400).json({ "s": false, "m": "must insert a id", "d": "" })
            }
            else if (typeof body?.id !== 'string') {
                return res.status(400).json({ "s": false, "m": "id have to be a string", "d": "" })
            }
            const room = await RoomsModel.findOne({ _id: body.id }).exec()
            if (room === null) {
                return res.status(400).json({ "s": false, "m": `room not found`, "d": "" })
            }

            next();
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
    list: async (req, res, next) => {
        try {
            const body = req.body
            if (!body.hasOwnProperty("limit")) {
                return res.status(400).json({ "s": false, "m": "must insert a limit", "d": "" })
            }
            else if (typeof body?.limit !== 'number') {
                return res.status(400).json({ "s": false, "m": "limit have to be a number", "d": "" })
            }
            else if (!body.hasOwnProperty("skip")) {
                return res.status(400).json({ "s": false, "m": "skip have to be a number", "d": "" })
            }
            else if (typeof body?.skip !== 'number') {
                return res.status(400).json({ "s": false, "m": "skip have to be a number", "d": "" })
            }
            next();
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
}

module.exports = roomMiddlewares