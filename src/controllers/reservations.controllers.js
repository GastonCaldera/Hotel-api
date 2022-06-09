const { reservationsModel } = require('../models/reservations')
const moment = require('moment')

const reservationsController = {
    create: async (req, res) => {
        try {
            const body = req.body
            const createResevation = await reservationsModel.create({
                ...body,
                createAt: moment(),
                isPay: false,
                paymentStatus: 'pending',
                status: 'pending'
            })
            return res.json({ "s": true, "m": "reservation created successfully", "d": createResevation })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
    pay: async (req, res) => {
        try {
            const body = req.body
            const cancelResevation = await reservationsModel.findOneAndUpdate(
                {
                    _id: body.id
                },
                {
                    paymentId: body.paymentId,
                    paymentType: body.paymentType,
                    isPay: true,
                    payAt: moment(),
                    paymentStatus: 'paid',
                    status: 'paid'
                },
                {
                    new: true
                })
            return res.json({ "s": true, "m": "reservation paid successfully", "d": cancelResevation })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
    cancel: async (req, res) => {
        try {
            const body = req.body
            const cancelResevation = await reservationsModel.findOneAndUpdate(
                {
                    _id: body.id
                },
                {
                    status: 'eliminated'
                },
                {
                    new: true
                })
            return res.json({ "s": true, "m": "reservation cancelled successfully", "d": cancelResevation })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
    list: async (req, res) => {
        try {
            const body = req.body
            const reservations = await reservationsModel.find().limit(body.limit).skip(body.skip)
            return res.json({ "s": true, "m": "reservations listed successfully", "d": reservations })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
}

module.exports = reservationsController