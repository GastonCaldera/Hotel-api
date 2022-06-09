const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationsSchema = new Schema({
    numberOfBeds: Number,
    numberOfPeople: Number,
    roomType: String,
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

const ReservationsModel = mongoose.model("reservations", reservationsSchema);
module.exports = { ReservationsModel };