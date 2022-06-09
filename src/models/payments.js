const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentsSchema = new Schema({
    reservationId: String,
    country: String,
    street: String,
    postalCode: String,
    state: String,
    paymentType: String,
    paymentId: String,
    createAt: Date
});

const PaymentsModel = mongoose.model("payments", paymentsSchema);
module.exports = { PaymentsModel };