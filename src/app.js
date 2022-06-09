require('dotenv').config();
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db');

const app = express();

//dataBase
connectDB()

//middlewares
app.use(express.json());
app.use(cors({
    methods:"*",
    origin:"*"
}))

//routes
app.use('/reservations', require("./routes/reservations.js"));
app.use('/rooms', require("./routes/rooms.js"));
app.use('/payments', require("./routes/payments.js"));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

module.exports = app
