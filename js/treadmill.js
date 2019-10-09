const mongoose = require("mongoose");
const Treadmill = mongoose.model("Treadmill", { 
    name: Number,
    player: String,
    time: Number });

module.exports = Treadmill;