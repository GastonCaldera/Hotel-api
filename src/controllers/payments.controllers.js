const { PaymentsModel } = require('../models/payments')

const paymentsController = {
    list: async (req, res) => {
        try {
            const body = req.body
            const payments = await PaymentsModel.find().limit(body.limit).skip(body.skip)
            return res.json({ "s": true, "m": "payments listed successfully", "d": payments })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
}

module.exports = paymentsController