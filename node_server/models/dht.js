var  mongoose = require("mongoose");

//SCHEMA SETUP
var dhtSchema = new mongoose.Schema({
    U: String,
    T: String,
    date: Date,
    time: String,
 });

module.exports = mongoose.model("Dht", dhtSchema);
