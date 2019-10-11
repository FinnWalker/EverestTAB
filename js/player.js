const mongoose = require("mongoose");
/*
const Player = mongoose.model("Player", {
  id: String,
  steps: Number,
  most_steps: Number,
  current_steps: Number,
  eligible: Boolean,
  terms: Boolean,
  first_name: String,
  last_name: String,
  player_name: String,
  date_of_birth: String,
  mobile: String,
  email: String,
  customer: Boolean,
  marketing: Boolean
});
*/
const Player = mongoose.model("Player", {
  id: String,
  steps: Number,
  eligible: Boolean,
  terms: Boolean,
  first_name: String,
  last_name: String,
  player_name: String,
  date_of_birth: String,
  mobile: String,
  email: String,
  customer: Boolean,
  marketing: Boolean
});

module.exports = Player;
