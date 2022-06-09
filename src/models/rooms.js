const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
    room: String,
    roomType: String,
    status: String,
    createAt: Date
});

const RoomsModel = mongoose.model("rooms", roomSchema);
module.exports = { RoomsModel };