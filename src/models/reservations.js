const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationsSchema = new Schema({
    roomNumber: String,
    status: String,
    createAt: Date,
    startAt: Date,
    endAt: Date,
    isPay: Boolean,
    payAt: Date,
    paymentId: String,
    paymentStatus: String,
    paymentType: String
});

const reservationsModel = mongoose.model("reservations", reservationsSchema);
module.exports = { reservationsModel };