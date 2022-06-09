const moment = require('moment')
const { RoomsModel } = require('../models/rooms')

const roomsController = {
    create: async (req, res) => {
        try {
            const body = req.body
            const createRoom = await RoomsModel.create({
                ...body,
                status: "active",
                createAt: moment(),
            })
            return res.json({ "s": true, "m": "room created successfully", "d": createRoom })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
    update: async (req, res) => {
        try {
            const body = req.body
            const updateRoom = await RoomsModel.findOneAndUpdate(
                {
                    room: body.room
                },
                {
                    ...body
                },
                {
                    new: true
                })

            return res.json({ "s": true, "m": "room updated successfully", "d": updateRoom })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
    delete: async (req, res) => {
        try {
            const body = req.body
            await RoomsModel.findByIdAndRemove(
                {
                    _id: body.id
                })
            return res.json({ "s": true, "m": "room delete successfully", "d": '' })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
    list: async (req, res) => {
        try {
            const body = req.body
            const rooms = await RoomsModel.find().limit(body.limit).skip(body.skip)
            return res.json({ "s": true, "m": "rooms listed successfully", "d": rooms })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
}

module.exports = roomsController