const { RoomsModel } = require('../models/rooms')
const { reservationsModel } = require('../models/reservations')
const moment = require('moment')

const resevationMiddlewares = {
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
            if (room === null) {
                return res.status(400).json({ "s": false, "m": `room ${body.room} not found`, "d": "" })
            }
            
            // Check dates
            if (!body.hasOwnProperty("startAt")) {
                return res.status(400).json({ "s": false, "m": "must insert a startAt", "d": "" })
            }
            else if (typeof body?.startAt !== 'string') {
                return res.status(400).json({ "s": false, "m": "startAt have to be a string", "d": "" })
            }
            else if (!moment(body?.startAt, 'YYYY-MM-DD').isValid()) {
                return res.status(400).json({ "s": false, "m": "you need to insert a valit startAt date (YYYY-MM-DD)", "d": "" })
            }
            else if (!body.hasOwnProperty("endAt")) {
                return res.status(400).json({ "s": false, "m": "must insert a endAt", "d": "" })
            }
            else if (typeof body?.endAt !== 'string') {
                return res.status(400).json({ "s": false, "m": "endAt have to be a string", "d": "" })
            }
            else if (!moment(body?.endAt, 'YYYY-MM-DD').isValid()) {
                return res.status(400).json({ "s": false, "m": "you need to insert a valit endAt date (YYYY-MM-DD)", "d": "" })
            }
            else if (moment(body?.startAt).isSameOrAfter(moment(body?.endAt))){
                return res.status(400).json({ "s": false, "m": "start date cannot start after end date", "d": "" })
            }
            const reservations = await reservationsModel.findOne({
                room: body.room,
                status: { $ne: 'eliminated' },
                $or: [
                    {
                        startAt: {
                            $gte: body?.startAt,
                            $lte: body?.endAt
                        }
                    },
                    {
                        endAt: {
                            $gte: body?.startAt,
                            $lte: body?.endAt
                        }
                    }
                ]
            }).exec()
            if (reservations !== null) {
                return res.status(400).json({ "s": false, "m": "there is already a reservation with those dates", "d": "" })
            }

            next();
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
    pay: async (req, res, next) => {
        try {
            const body = req.body
            
            // Check Keys
            if (!body.hasOwnProperty("id")) {
                return res.status(400).json({ "s": false, "m": "must insert a id", "d": "" })
            }
            else if (typeof body?.id !== 'string') {
                return res.status(400).json({ "s": false, "m": "id have to be a string", "d": "" })
            }
            else if (!body.hasOwnProperty("country")) {
                return res.status(400).json({ "s": false, "m": "must insert a country", "d": "" })
            }
            else if (typeof body?.country !== 'string') {
                return res.status(400).json({ "s": false, "m": "country have to be a string", "d": "" })
            }
            else if (!body.hasOwnProperty("street")) {
                return res.status(400).json({ "s": false, "m": "must insert a street", "d": "" })
            }
            else if (typeof body?.street !== 'string') {
                return res.status(400).json({ "s": false, "m": "street have to be a string", "d": "" })
            }
            else if (!body.hasOwnProperty("postalCode")) {
                return res.status(400).json({ "s": false, "m": "must insert a postalCode", "d": "" })
            }
            else if (typeof body?.postalCode !== 'string') {
                return res.status(400).json({ "s": false, "m": "postalCode have to be a string", "d": "" })
            }
            else if (!body.hasOwnProperty("state")) {
                return res.status(400).json({ "s": false, "m": "must insert a state", "d": "" })
            }
            else if (typeof body?.state !== 'string') {
                return res.status(400).json({ "s": false, "m": "state have to be a string", "d": "" })
            }
            else if (!body.hasOwnProperty("paymentType")) {
                return res.status(400).json({ "s": false, "m": "must insert a paymentType", "d": "" })
            }
            else if (typeof body?.paymentType !== 'string') {
                return res.status(400).json({ "s": false, "m": "paymentType have to be a string", "d": "" })
            }
            else if (!body.hasOwnProperty("paymentId")) {
                return res.status(400).json({ "s": false, "m": "must insert a paymentId", "d": "" })
            }
            else if (typeof body?.paymentId !== 'string') {
                return res.status(400).json({ "s": false, "m": "paymentId have to be a string", "d": "" })
            }

            // Check resevation
            const reservations = await reservationsModel.findOne({ _id: body.id }).exec()
            if (reservations === null) {
                return res.status(400).json({ "s": false, "m": "there is no reservation with that ID", "d": "" })
            }
            else if (reservations.status === 'eliminated') {
                return res.status(400).json({ "s": false, "m": "Reservation is already cancelled", "d": "" })
            }
            else if (reservations.status === 'paid') {
                return res.status(400).json({ "s": false, "m": "Reservation is already paid", "d": "" })
            }

            next();
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
    cancel: async (req, res, next) => {
        try {
            const body = req.body
            if (!body.hasOwnProperty("id")) {
                return res.status(400).json({ "s": false, "m": "must insert a id", "d": "" })
            }
            const reservations = await reservationsModel.findOne({ _id: body.id }).exec()
            if (reservations === null) {
                return res.status(400).json({ "s": false, "m": "there is no reservation with that ID", "d": "" })
            }
            else if (reservations.status === 'eliminated') {
                return res.status(400).json({ "s": false, "m": "Reservation is already cancelled", "d": "" })
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

module.exports = resevationMiddlewares