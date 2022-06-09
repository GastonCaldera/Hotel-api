const { ReservationsModel } = require('../models/reservations')
const { PaymentsModel } = require('../models/payments')
const moment = require('moment')

const reservationsController = {
    create: async (req, res) => {
        try {
            const body = req.body
            const createResevation = await ReservationsModel.create({
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
            const payResevation = await ReservationsModel.findOneAndUpdate(
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

            await PaymentsModel.create({
                ...body,
                reservationId: body.id,
                createAt: moment(),
            })
            return res.json({ "s": true, "m": "reservation paid successfully", "d": payResevation })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
    cancel: async (req, res) => {
        try {
            const body = req.body
            const cancelResevation = await ReservationsModel.findOneAndUpdate(
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
            const reservations = await ReservationsModel.find().limit(body.limit).skip(body.skip)
            return res.json({ "s": true, "m": "reservations listed successfully", "d": reservations })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
}

module.exports = reservationsController